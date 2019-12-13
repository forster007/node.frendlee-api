import { isEmpty } from '../../lib';
import { Address, Profile, Provider, User, UsersServices } from '../models';
import { storeUserSchema, updateUserSchema } from '../schemas';

class UserController {
  async store(req, res) {
    try {
      const user = await User.create(req.body, {
        include: [
          {
            as: 'user_address',
            model: Address,
          },
          {
            as: 'user_profile',
            model: Profile,
            include: [
              {
                as: 'user_provider',
                model: Provider,
              },
            ],
          },
        ],
      });
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  }
  /*
  async store(req, res) {
    try {
      await storeUserSchema.validateAsync(req.body);

      const userExists = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!isEmpty(userExists)) {
        return res.status(400).json({
          error: 'User already exists',
        });
      }

      const { services, ...data } = req.body;
      const user = await User.create(data);

      if (services && services.length > 0) {
        const newServices = services.map(service => ({
          provider_id: user.id,
          ...service,
        }));

        await UsersServices.bulkCreate(newServices);
      }

      return res.json(user);
    } catch (e) {
      return res.status(e.status || 400).json({
        error: e.message || 'User already exists',
      });
    }
  }
  */

  async update(req, res) {
    try {
      // await updateUserSchema.validateAsync(req.body);

      const { oldPassword } = req.body;

      const userid = req.params.userid || req.headers.user_id;

      const user = await User.findByPk(userid);

      if (req.body.email && req.body.email !== user.email) {
        const userExists = await User.findOne({
          where: { email: req.body.email },
        });

        if (!isEmpty(userExists)) {
          return res.status(400).json({ error: 'User already exists' });
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password does not match' });
      }

      const { email, id, name, provider } = await user.update(req.body);

      return res.json({
        email,
        id,
        name,
        provider,
      });
    } catch (e) {
      return res.status(e.status || 400).json({
        error: e.message || 'User can not be updated',
      });
    }
  }
}

export default new UserController();
