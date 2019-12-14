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
        return res.status(401).json({
          error: 'User not found',
        });
      }

      if (!(await user.checkPassword(req.body.password))) {
        return res.status(401).json({
          error: 'Password does not match',
        });
      }

      const { email, id, name } = user;
      return res.json({
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
        user: {
          email,
          id,
          name,
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
