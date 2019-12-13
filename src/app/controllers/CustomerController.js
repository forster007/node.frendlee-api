import {
  Address,
  Profile,
  Provider,
  Service,
  User,
  UsersServices,
} from '../models';

class CustomerController {
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
}

export default new CustomerController();
