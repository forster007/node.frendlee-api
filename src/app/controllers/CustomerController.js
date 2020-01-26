import jwt from 'jsonwebtoken';
import { Address, Customer, User } from '../models';
import isEmpty from '../../lib/Helpers';
import { authConfig } from '../../config';

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
  'picture_profile_url',
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

  async show(req, res) {
    const { params } = req;
    const { id } = params;
    const customer = await Customer.findByPk(id);

    return res.json(customer);
  }

  async store(req, res) {
    try {
      const { body } = req;

      const customer = await Customer.create(body, {
        include: [
          { as: 'address', model: Address },
          { as: 'user', model: User },
        ],
      });

      customer.dataValues.token = jwt.sign(
        { account_type: 'customer', id: customer.id },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn }
      );

      return res.json(customer);
    } catch (e) {
      return res.status(e.status || 400).json({
        error: e.message || 'Internal server error',
      });
    }
  }

  async update(req, res) {
    try {
      const { body, files, headers, params } = req;
      const { picture_profile } = files;
      const id = params.id || headers.id;
      const customer = await Customer.findByPk(id);

      if (!isEmpty(picture_profile)) {
        body.picture_profile = picture_profile[0].filename;
      }

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
