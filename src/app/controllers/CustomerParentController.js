import { CustomerParent, CustomerToken } from '../models';

class CustomerParentController {
  async store(req, res) {
    const { body, headers } = req;
    const { token } = body;
    const { account_type, id } = headers;

    switch (account_type) {
      case 'parent': {
        const customerToken = await CustomerToken.findOne({
          where: { token },
        });

        const customerParent = await CustomerParent.create({
          customer_id: customerToken.dataValues.customer_id,
          parent_id: id,
          customer_nickname: 'Not defined',
          parent_nickname: 'Not defined',
        });

        return res.json(customerParent);
      }

      default: {
        return res.json({ available: false });
      }
    }
  }
}

export default new CustomerParentController();
