import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import squel from 'squel';

import { Address, Clock, Period, Provider, ProviderServices, Rating, Service, Stuff, User } from '../models';
import { TokenVerification } from '../schemas';
import SignUpMail from '../jobs/SignUpMail';
import isEmpty from '../../lib/Helpers';
import Queue from '../../lib/Queue';
import { authConfig } from '../../config';

squel.useFlavour('postgres');

const attributes = [
  'id',
  'avatar',
  'birthdate',
  'formation',
  'gender',
  'gps',
  'lastname',
  'name',
  'onesignal',
  'phone_number',
  'phone_number_is_whatsapp',
  'picture_profile',
  'ssn',
];

const userInclude = {
  as: 'user',
  attributes: ['email'],
  model: User,
  where: { status: 'enabled' },
};

const addressInclude = {
  as: 'address',
  attributes: ['city', 'complement', 'country', 'district', 'number', 'postal_code', 'state', 'street'],
  model: Address,
};

const clockInclude = {
  as: 'clocks',
  attributes: ['id', 'name'],
  model: Clock,
  through: { attributes: [] },
  where: { enabled: true },
};

const periodInclude = {
  as: 'periods',
  attributes: ['id', 'name'],
  model: Period,
  through: { attributes: [] },
  where: { enabled: true },
};

const serviceInclude = {
  as: 'services',
  attributes: ['id', 'name'],
  model: Service,
  through: {
    as: 'service_value',
    attributes: ['value'],
    model: ProviderServices,
  },
  where: { enabled: true },
};

const stuffInclude = {
  as: 'stuffs',
  attributes: ['id', 'name'],
  model: Stuff,
  through: { attributes: [] },
  where: { enabled: true },
};

const ratingInclude = {
  as: 'ratings',
  attributes: [],
  model: Rating,
};

class ProviderController {
  async index(req, res) {
    try {
      const { headers } = req;
      const { account_type, id } = headers;

      if (account_type === 'administrator' || account_type === 'customer' || account_type === 'parent') {
        const subQuery = ({ field }) => {
          const query = squel
            .select({ autoQuoteAliasNames: false })
            .field(field)
            .where('"Provider"."id" = "ratings"."provider_id"')
            .from('ratings as', 'rating')
            .toString();

          return `(${query})`;
        };

        const GENERATE_COUNT = subQuery({ field: 'CAST(COUNT(*) AS int)' });
        const GENERATE_SUM = subQuery({ field: 'CAST(COALESCE(AVG("rating"."provider_rating"), 0) as float)' });

        const providers = await Provider.findAll({
          attributes: ['avatar', 'formation', 'id', 'lastname', 'name', 'picture_profile', [GENERATE_COUNT, `treatments`], [GENERATE_SUM, `stars`]],
          include: [{ as: 'user', model: User, where: { status: 'enabled' } }, serviceInclude, stuffInclude, ratingInclude],
        });

        return res.json(providers);
      }

      const subQuery = ({ field }) => {
        const query = squel
          .select({ autoQuoteAliasNames: false })
          .field(field)
          .where('"Provider"."id" = "ratings"."provider_id"')
          .from('ratings as', 'rating')
          .toString();

        return `(${query})`;
      };

      const GENERATE_COUNT = subQuery({ field: 'CAST(COUNT(*) AS int)' });
      const GENERATE_SUM = subQuery({ field: 'CAST(COALESCE(AVG("rating"."provider_rating"), 0) as float)' });

      const provider = await Provider.findByPk(id, {
        attributes: [
          'avatar',
          'birthdate',
          'created_at',
          'description',
          'formation',
          'gender',
          'id',
          'lastname',
          'name',
          'phone_number',
          'picture_profile',
          'ssn',
          [GENERATE_SUM, `stars`],
          [GENERATE_COUNT, `treatments`],
        ],
        include: [userInclude, serviceInclude, stuffInclude, ratingInclude],
      });

      return res.json(provider);
    } catch (error) {
      console.log('--> ProviderController - INDEX', error);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async show(req, res) {
    try {
      const { params } = req;
      const { id } = params;

      const subQuery = ({ field }) => {
        const query = squel
          .select({ autoQuoteAliasNames: false })
          .field(field)
          .where('"Provider"."id" = "ratings"."provider_id"')
          .from('ratings as', 'rating')
          .toString();

        return `(${query})`;
      };

      const GENERATE_COUNT = subQuery({ field: 'CAST(COUNT(*) AS int)' });
      const GENERATE_SUM = subQuery({ field: 'CAST(COALESCE(AVG("rating"."provider_rating"), 0) as float)' });

      const provider = await Provider.findByPk(id, {
        attributes: [
          'avatar',
          'birthdate',
          'description',
          'formation',
          'id',
          'gender',
          'lastname',
          'name',
          'phone_number',
          'phone_number_is_whatsapp',
          'picture_profile',
          [GENERATE_COUNT, `treatments`],
          [GENERATE_SUM, `stars`],
        ],
        include: [clockInclude, periodInclude, serviceInclude, stuffInclude, ratingInclude],
      });

      return res.json(provider);
    } catch (error) {
      console.log('--> ProviderController - SHOW', error);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async store(req, res) {
    try {
      const { provider_clocks, provider_periods, provider_services, provider_stuffs, ...body } = req.body;

      const provider = await Provider.create(body, {
        include: [
          { as: 'address', model: Address },
          { as: 'user', model: User },
        ],
      });

      if (!isEmpty(provider_clocks)) {
        await provider.setClocks(provider_clocks);
      }

      if (!isEmpty(provider_periods)) {
        await provider.setPeriods(provider_periods);
      }

      if (!isEmpty(provider_services)) {
        const srvcs = provider_services.map(service => ({
          ...service,
          provider_id: provider.id,
        }));

        await ProviderServices.bulkCreate(srvcs);
      }

      if (!isEmpty(provider_stuffs)) {
        await provider.setStuffs(provider_stuffs);
      }

      provider.dataValues.token = jwt.sign({ account_type: 'provider', id: provider.id }, authConfig.secret, { expiresIn: authConfig.expiresIn });

      const tokenVerification = await TokenVerification.create({
        user: provider.dataValues.user.id,
        token: crypto.randomBytes(16).toString('hex'),
      });

      await Queue.add(SignUpMail.key, {
        name: provider.dataValues.name,
        url: `${process.env.APP_URL}/confirmation?token=${tokenVerification.token}`,
        email: provider.dataValues.user.email,
      });

      return res.json(provider);
    } catch (error) {
      console.log('--> ProviderController - STORE', error);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async update(req, res) {
    try {
      const { body, files, headers, params } = req;
      const { provider_clocks, provider_periods, provider_services, provider_stuffs } = body;
      const { picture_address, picture_profile } = files;
      const { id } = headers;

      if (Number(params.id) !== id) {
        return res.status(403).json({ status: 'Access denied', success: false, message: 'Unauthorized access' });
      }

      const provider = await Provider.findByPk(id);

      if (!isEmpty(picture_address)) {
        body.picture_address = picture_address[0].filename;
      }

      if (!isEmpty(picture_profile)) {
        body.picture_profile = picture_profile[0].filename;
      }

      if (!isEmpty(provider_clocks)) {
        await provider.setClocks(provider_clocks);
      }

      if (!isEmpty(provider_periods)) {
        await provider.setPeriods(provider_periods);
      }

      if (!isEmpty(provider_services)) {
        await ProviderServices.destroy({
          where: { provider_id: provider.id },
        });

        const srvcs = provider_services.map(service => ({
          ...service,
          provider_id: provider.id,
        }));

        await ProviderServices.bulkCreate(srvcs);
      }

      if (!isEmpty(provider_stuffs)) {
        await provider.setStuffs(provider_stuffs);
      }

      await provider.update(body);

      const updated = await Provider.findByPk(id, {
        attributes,
        include: [userInclude, addressInclude, clockInclude, periodInclude, serviceInclude, stuffInclude],
      });

      return res.json(updated);
    } catch (error) {
      console.log('--> ProviderController - UPDATE', error);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
}

export default new ProviderController();
