import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Address, Customer, User } from '../models';
import { TokenVerification } from '../schemas';
import SignUpMail from '../jobs/SignUpMail';
import isEmpty from '../../lib/Helpers';
import Queue from '../../lib/Queue';
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

class CustomerController {
  async index(req, res) {
    try {
      const { headers } = req;
      const { account_type, id } = headers;

      if (account_type === 'administrator') {
        const customers = await Customer.findAll({
          include: [
            { as: 'user', model: User },
            { as: 'address', model: Address },
          ],
        });

        return res.json(customers);
      }

      if (account_type === 'customer') {
        const customer = await Customer.findByPk(id, {
          include: [
            { as: 'user', model: User },
            { as: 'address', model: Address },
          ],
        });

        return res.json(customer);
      }

      console.log('--> CustomerController - INDEX (default)');
      return res.status(403).json({ status: 'Access denied', success: false, message: 'Unauthorized access' });
    } catch (error) {
      console.log('--> CustomerController - INDEX', error);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async show(req, res) {
    try {
      const { headers, params } = req;
      const { account_type, id } = headers;

      switch (account_type) {
        case 'administrator': {
          const customer = await Customer.findByPk(id, {
            attributes,
            include: [
              { as: 'user', model: User },
              { as: 'address', model: Address },
            ],
          });

          return res.json(customer);
        }

        case 'customer': {
          if (Number(params.id) !== id) {
            return res.status(403).json({ status: 'Access denied', success: false, message: 'Unauthorized access' });
          }

          const customer = await Customer.findByPk(id, {
            attributes,
            include: [
              { as: 'user', model: User, attributes: ['email', 'status'] },
              { as: 'address', model: Address, attributes: ['city', 'complement', 'country', 'district', 'number', 'postal_code', 'state', 'street'] },
            ],
          });

          return res.json(customer);
        }

        default: {
          console.log('--> CustomerController - SHOW (default)');
          return res.status(403).json({ status: 'Access denied', success: false, message: 'Unauthorized access' });
        }
      }
    } catch (error) {
      console.log('--> CustomerController - SHOW', error);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
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

      customer.dataValues.token = jwt.sign({ account_type: 'customer', id: customer.id }, authConfig.secret, { expiresIn: authConfig.expiresIn });

      const tokenVerification = await TokenVerification.create({
        user: customer.dataValues.user.id,
        token: crypto.randomBytes(16).toString('hex'),
      });

      await Queue.add(SignUpMail.key, {
        name: customer.dataValues.name,
        url: `${process.env.APP_URL}/confirmation?token=${tokenVerification.token}`,
        email: customer.dataValues.user.email,
      });

      return res.json(customer);
    } catch (error) {
      console.log('--> CustomerController - STORE', error);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async update(req, res) {
    try {
      const { body, files, headers, params } = req;
      const { picture_profile } = files;
      const { id } = headers;

      if (Number(params.id) !== id) {
        return res.status(403).json({ status: 'Access denied', success: false, message: 'Unauthorized access' });
      }

      const customer = await Customer.findByPk(id);

      if (!isEmpty(picture_profile)) {
        body.picture_profile = picture_profile[0].filename;
      }

      await customer.update(body);

      return res.json(customer);
    } catch (error) {
      console.log('--> CustomerController - UPDATE', error);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
}

export default new CustomerController();
