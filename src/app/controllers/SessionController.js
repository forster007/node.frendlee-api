import jwt from 'jsonwebtoken';
import { authConfig } from '../../config';
import isEmpty from '../../lib/Helpers';
import { Administrator, Customer, Provider, User } from '../models';

class SessionController {
  async store(req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (isEmpty(user)) {
        throw new Error('User not found');
      }

      if (!(await user.checkPassword(req.body.password))) {
        throw new Error('Password does not match');
      }

      const { account_type, email, id } = user;

      switch (account_type) {
        case 'administrator': {
          const administrator = await Administrator.findOne({
            where: { user_id: id },
          });

          return res.json({
            token: jwt.sign(
              { account_type, id: administrator.id },
              authConfig.secret,
              {
                expiresIn: authConfig.expiresIn,
              }
            ),
            user: {
              account_type,
              email,
              id: administrator.id,
              uid: id,
            },
          });
        }

        case 'customer': {
          const customer = await Customer.findOne({
            where: { user_id: id },
          });

          return res.json({
            token: jwt.sign(
              { account_type, id: customer.id },
              authConfig.secret,
              {
                expiresIn: authConfig.expiresIn,
              }
            ),
            user: {
              account_type,
              email,
              id: customer.id,
              uid: id,
            },
          });
        }

        case 'provider': {
          const provider = await Provider.findOne({
            where: { user_id: id },
          });

          return res.json({
            token: jwt.sign(
              { account_type, id: provider.id },
              authConfig.secret,
              {
                expiresIn: authConfig.expiresIn,
              }
            ),
            user: {
              account_type,
              email,
              id: provider.id,
              uid: id,
            },
          });
        }

        default:
          throw new Error(
            'User does not match with any account types available'
          );
      }
    } catch (e) {
      return res.status(e.status || 400).json({
        error: e.message || 'User already exists',
      });
    }
  }
}

export default new SessionController();
