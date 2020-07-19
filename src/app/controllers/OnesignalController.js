import { Customer, Parent, Provider } from '../models';

class OnesignalController {
  async store(req, res) {
    const { body, headers } = req;
    const { account_type, id } = headers;
    const { onesignal } = body;

    switch (account_type) {
      case 'customer': {
        const customer = await Customer.findOne({ where: { id } });
        await customer.update({ onesignal });

        return res.json(customer);
      }

      case 'parent': {
        const parent = await Parent.findOne({ where: { id } });
        await parent.update({ onesignal });

        return res.json({ parent });
      }

      case 'provider': {
        const provider = await Provider.findOne({ where: { id } });
        await provider.update({ onesignal });

        return res.json({ provider });
      }

      default: {
        return res.json({ available: false });
      }
    }
  }
}

export default new OnesignalController();
