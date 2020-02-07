import { Administrator, Customer, Provider, User } from '../models';
import isEmpty from '../../lib/Helpers';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class CheckController {
  async index(req, res) {
    await Queue.add(CancellationMail.key, {
      appointment: {
        name: 'Thomas',
        email: 'forster007@gmail.com',
      },
    });

    return res.json({ data: true });
  }

  async show(req, res) {
    const { field, value } = req.query;

    switch (field) {
      case 'bsn': {
        const adm = await Administrator.findOne({
          where: { ssn: value },
        });

        const cus = await Customer.findOne({
          where: { ssn: value },
        });

        const pro = await Provider.findOne({
          where: { ssn: value },
        });

        return res.json({
          available: !!isEmpty(adm) && !!isEmpty(cus) && !!isEmpty(pro),
        });
      }

      case 'email': {
        const user = await User.findOne({
          where: { email: value },
        });

        return res.json({ available: !!isEmpty(user) });
      }

      case 'phone_number': {
        const adm = await Administrator.findOne({
          where: { phone_number: value },
        });

        const cus = await Customer.findOne({
          where: { phone_number: value },
        });

        const pro = await Provider.findOne({
          where: { phone_number: value },
        });

        return res.json({
          available: !!isEmpty(adm) && !!isEmpty(cus) && !!isEmpty(pro),
        });
      }

      default:
        return res.json({ available: false });
    }
  }
}

export default new CheckController();
