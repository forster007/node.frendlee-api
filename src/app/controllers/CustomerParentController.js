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

  async update(req, res) {
    try {
      const { body, headers, params } = req;
      const { account_type, id } = headers;
      const { id: customerParent_id } = params;

      switch (account_type) {
        case 'customer': {
          const customerParent = await CustomerParent.findOne({
            where: {
              id: customerParent_id,
              customer_id: id,
            },
          });

          if (!customerParent) {
            throw new Error('You can not update this customer parent');
          }

          await customerParent.update(body);

          return res.json(customerParent);
        }

        default:
          throw new Error('You can not update this customer parent');
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
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
