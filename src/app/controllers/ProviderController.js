import { Address, Profile, Provider, User } from '../models';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      attributes: [
        'id',
        'account_type',
        'birthdate',
        'email',
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
        'status',
        'address_id',
        'profile_id',
      ],
      include: [
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
          as: 'user_profile',
          attributes: ['id'],
          include: [
            {
              as: 'user_provider',
              attributes: [
                'formation',
                'is_medical_provider',
                'picture_certification',
                'picture_license',
              ],
              model: Provider,
            },
          ],
          model: Profile,
        },
      ],
      where: {
        account_type: 'provider',
      },
    });

    return res.json(providers);
  }

  async store(req, res) {
    try {
      const provider = await Provider.create(req.body, {
        include: [
          { as: 'user', model: User },
          { as: 'user_address', model: Address },
        ],
      });

      return res.json(provider);
    } catch (e) {
      console.log('ERROR --> ', e);
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
