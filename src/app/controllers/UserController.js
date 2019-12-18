import { Address, Administrator, Customer, Provider, User } from '../models';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'account_type', 'email'],
    });

    const extendedUsers = await Promise.all(
      users.map(async user => {
        switch (user.account_type) {
          case 'administrator': {
            user.dataValues.administrator = await Administrator.findOne({
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'user_id'],
              },
              where: { user_id: user.id },
            });

            return user;
          }

          case 'customer': {
            user.dataValues.customer = await Customer.findOne({
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'address_id', 'user_id'],
              },
              include: [
                {
                  as: 'address',
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                  model: Address,
                },
              ],
              where: { user_id: user.id },
            });

            return user;
          }

          case 'provider': {
            user.dataValues.provider = await Provider.findOne({
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'address_id', 'user_id'],
              },
              include: [
                {
                  as: 'address',
                  attributes: { exclude: ['createdAt', 'updatedAt'] },
                  model: Address,
                },
              ],
              where: { user_id: user.id },
            });

            return user;
          }

          default: {
            return user;
          }
        }
      })
    );

    return res.json(extendedUsers);
  }
}

export default new UserController();
