import { Customer, CustomerParent, CustomerToken, Parent } from '../models';

class CustomerParentController {
  async index(req, res) {
    const { headers } = req;
    const { account_type, id } = headers;

    switch (account_type) {
      case 'customer': {
        const customers = await CustomerParent.findAll({
          include: [
            {
              as: 'parent',
              attributes: ['avatar', 'birthdate', 'lastname', 'name', 'picture_profile'],
              model: Parent,
            },
          ],
          order: [['id', 'DESC']],
          where: { customer_id: id },
        });

        return res.json(customers);
      }

      case 'parent': {
        const parents = await CustomerParent.findAll({
          include: [
            {
              as: 'customer',
              attributes: ['avatar', 'birthdate', 'lastname', 'name', 'picture_profile'],
              model: Customer,
            },
          ],
          order: [['id', 'DESC']],
          where: { parent_id: id },
        });

        return res.json(parents);
      }

      default:
        return res.json({});
    }
  }

  async store(req, res) {
    try {
      const { body, headers } = req;
      const { token } = body;
      const { account_type, id } = headers;

      switch (account_type) {
        case 'parent': {
          const customerToken = await CustomerToken.findOne({
            where: { token },
          });

          if (!customerToken) {
            throw new Error('That token does not refer to any users. Please, verify token and try again.');
          }

          const customerParent = await CustomerParent.create({
            customer_id: customerToken.dataValues.customer_id,
            parent_id: id,
            customer_nickname: 'Not defined',
            parent_nickname: 'Not defined',
          });

          return res.json(customerParent);
        }

        default: {
          throw new Error('Account type not founded');
        }
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new CustomerParentController();
