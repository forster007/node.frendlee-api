import { Administrator, Customer, Provider, User } from '../models';
import isEmpty from '../../lib/Helpers';

class CheckController {
  async show(req, res) {
    const { field, value } = req.query;

    switch (field) {
      case 'bsn': {
        const administrator = await Administrator.findOne({
          where: { ssn: value },
        });

        const customer = await Customer.findOne({
          where: { ssn: value },
        });

        const provider = await Provider.findOne({
          where: { ssn: value },
        });

        return res.json({
          available: !!isEmpty(administrator) && !!isEmpty(customer) && !!isEmpty(provider),
        });
      }

      case 'email': {
        const user = await User.findOne({
          where: { email: value },
        });

        return res.json({ available: !!isEmpty(user) });
      }

      case 'phone_number': {
        const administrator = await Administrator.findOne({
          where: { phone_number: value },
        });

        const customer = await Customer.findOne({
          where: { phone_number: value },
        });

        const provider = await Provider.findOne({
          where: { phone_number: value },
        });

        return res.json({
          available: !!isEmpty(administrator) && !!isEmpty(customer) && !!isEmpty(provider),
        });
      }

      default:
        return res.json({ available: false });
    }
  }
}

export default new CheckController();
