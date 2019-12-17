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
import isEmpty from '../../lib/Helpers';

class ProviderController {
  async index(req, res) {
    const providers = await Provider.findAll({
      attributes: [
        'id',
        'birthdate',
        'gender',
        'gps',
        'lastname',
        'name',
        'onesignal',
        'phone_number',
        'phone_number_is_whatsapp',
        'picture_address',
        'picture_profile',
        'ssn',
        'address_id',
      ],
      include: [
        {
          as: 'user',
          attributes: ['email', 'status'],
          model: User,
        },
        {
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
        },
        {
          as: 'clocks',
          attributes: ['name'],
          model: Clock,
          through: { attributes: [] },
        },
        {
          as: 'periods',
          attributes: ['name'],
          model: Period,
          through: { attributes: [] },
        },
        {
          as: 'services',
          attributes: ['id', 'name'],
          model: Service,
          through: {
            as: 'service_value',
            attributes: ['value'],
            model: ProviderServices,
          },
        },
        {
          as: 'stuffs',
          attributes: ['name'],
          model: Stuff,
          through: { attributes: [] },
        },
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

      return res.json(provider);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new ProviderController();
