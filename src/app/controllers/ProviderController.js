import crypto from 'crypto';
import {
  Address,
  Clock,
  Period,
  Provider,
  ProviderServices,
  Service,
  Stuff,
  User,
} from '../models';
import { TokenVerification } from '../schemas';
import SignUpMail from '../jobs/SignUpMail';
import isEmpty from '../../lib/Helpers';
import Queue from '../../lib/Queue';

const attributes = [
  'id',
  'birthdate',
  'formation',
  'gender',
  'gps',
  'lastname',
  'name',
  'onesignal',
  'phone_number',
  'phone_number_is_whatsapp',
  'picture_address',
  'picture_address_url',
  'picture_profile',
  'picture_profile_url',
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
  attributes: [
    'city',
    'complement',
    'country',
    'district',
    'number',
    'postal_code',
    'state',
    'street',
  ],
  model: Address,
};

const clockInclude = {
  as: 'clocks',
  attributes: ['id', 'name', 'state'],
  model: Clock,
  through: { attributes: [] },
  where: { enabled: true },
};

const periodInclude = {
  as: 'periods',
  attributes: ['id', 'name', 'state'],
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
  attributes: ['id', 'name', 'state'],
  model: Stuff,
  through: { attributes: [] },
  where: { enabled: true },
};

class ProviderController {
  async index(req, res) {
    const providers = await Provider.findAll({
      attributes,
      include: [
        userInclude,
        addressInclude,
        clockInclude,
        periodInclude,
        serviceInclude,
        stuffInclude,
      ],
    });

    return res.json(providers);
  }

  async store(req, res) {
    try {
      const {
        provider_clocks,
        provider_periods,
        provider_services,
        provider_stuffs,
        ...body
      } = req.body;

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
    } catch (e) {
      return res.json(e);
    }
  }

  async update(req, res) {
    try {
      const { body, files, headers, params } = req;

      const {
        provider_clocks,
        provider_periods,
        provider_services,
        provider_stuffs,
      } = body;
      const { picture_address, picture_profile } = files;
      const id = params.id || headers.id;
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
        include: [
          userInclude,
          addressInclude,
          clockInclude,
          periodInclude,
          serviceInclude,
          stuffInclude,
        ],
      });

      return res.json(updated);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new ProviderController();
