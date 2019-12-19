import { Address, Customer, User } from '../models';

const attributes = [
  'id',
  'birthdate',
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
  attributes: ['email', 'status'],
  model: User,
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

class CustomerController {
  async index(req, res) {
    const customers = await Customer.findAll({
      attributes,
      include: [userInclude, addressInclude],
    });

    return res.json(customers);
  }

  async store(req, res) {
    try {
      const customer = await Customer.create(req.body, {
        include: [
          { as: 'address', model: Address },
          { as: 'user', model: User },
        ],
      });

      return res.json(customer);
    } catch (e) {
      return res.status(e.status || 400).json({
        error: e.message || 'Internal server error',
      });
    }
  }

  async update(req, res) {
    try {
      const { body, headers, params } = req;
      const id = params.id || headers.id;

      const customer = await Customer.findByPk(id);

      await customer.update(body);

      return res.json(customer);
    } catch (e) {
      return res.status(e.status || 400).json({
        error: e.message || 'Internal server error',
      });
    }
  }
}

export default new CustomerController();
