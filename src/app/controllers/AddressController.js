import { Address, Customer, CustomerParent, Parent } from '../models';

class AddressController {
  async index(req, res) {
    const { headers, query } = req;
    const { account_type, id } = headers;

    switch (account_type) {
      case 'customer': {
        const address = await Address.findOne({
          include: [{ as: 'customer', model: Customer, where: { id } }],
        });

        return res.json(address);
      }

      case 'parent': {
        const { customer_id } = query;

        const address = await Address.findOne({
          include: [{ as: 'customer', model: Customer, where: { id: customer_id } }],
        });

        return res.json(address);
      }

      default: {
        return res.status(400).json({});
      }
    }
  }
}

export default new AddressController();
