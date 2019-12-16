import jwt from 'jsonwebtoken';
import { authConfig } from '../../config';
import isEmpty from '../../lib/Helpers';
import User from '../models/User';

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
      return res.json({
        token: jwt.sign({ account_type, id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
        user: {
          account_type,
          email,
          id,
        },
      });
    } catch (e) {
      return res.status(e.status || 400).json({
        error: e.message || 'User already exists',
      });
    }
  }
}

export default new SessionController();
