import { Address, Provider, Service, User, UserServices } from '../models';
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
          as: 'user_address',
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
          as: 'services',
          attributes: ['id', 'name'],
          model: Service,
          through: {
            as: 'service_value',
            attributes: ['value'],
            model: UserServices,
          },
        },
      ],
    });

    return res.json(providers);
  }

  async store(req, res) {
    try {
      const { user_services, ...body } = req.body;
      const provider = await Provider.create(body, {
        include: [
          { as: 'user', model: User },
          { as: 'user_address', model: Address },
        ],
      });

      if (user_services && !isEmpty(user_services)) {
        const srvcs = user_services.map(service => ({
          ...service,
          provider_id: provider.id,
        }));

        await UserServices.bulkCreate(srvcs);
      }

      return res.json(provider);
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  }
  /*
  async index(req, res) {
    const providers = await User.findAll({
      attributes: ['avatar_id', 'email', 'id', 'name'],
      include: [
        {
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
          model: File,
        },
        {
          as: 'services',
          include: [],
          model: Service,
          through: {
            as: 'service_value',
            attributes: ['value'],
            model: UsersServices,
          },
        },
      ],
      where: {
        provider: true,
      },
    });

    return res.json(providers);
  }
  */
}

export default new ProviderController();
