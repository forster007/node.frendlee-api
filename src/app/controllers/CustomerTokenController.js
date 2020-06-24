import { randomBytes } from 'crypto';
import { CustomerToken } from '../models';

class CustomerTokenController {
  async store(req, res) {
    const { headers } = req;
    const { account_type, id } = headers;

    switch (account_type) {
      case 'customer': {
        const customerToken = await CustomerToken.findOne({
          where: { customer_id: id },
        });

        const token = randomBytes(6).toString('hex');

        if (customerToken) {
          await customerToken.update({ token });

          return res.json(customerToken);
        }

        const newCustomerToken = await CustomerToken.create({ customer_id: id, token });

        return res.json(newCustomerToken);
      }

      default: {
        return res.json({ available: false });
      }
    }
  }
}

export default new CustomerTokenController();
