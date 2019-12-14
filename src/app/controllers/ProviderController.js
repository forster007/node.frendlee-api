import {
  Address,
  Clock,
  Period,
  Provider,
  ProviderServices,
  Service,
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
          as: 'provider_address',
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
        ...body
      } = req.body;

      const provider = await Provider.create(body, {
        include: [
          { as: 'user', model: User },
          { as: 'provider_address', model: Address },
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

      return res.json(provider);
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  }
}

export default new ProviderController();
