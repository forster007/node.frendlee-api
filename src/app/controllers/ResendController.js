import crypto from 'crypto';
import { Customer, Provider, User } from '../models';
import { TokenVerification } from '../schemas';
import SignUpMail from '../jobs/SignUpMail';
import Queue from '../../lib/Queue';

class ResendController {
  async show(req, res) {
    const { email } = req.query;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send({
        type: 'not-available',
        msg: 'Your email was not found on our database.',
      });
    }

    if (user.status === 'disabled') {
      let name = '';

      if (user.account_type === 'customer') {
        const customer = await Customer.findOne({ user_id: user.id });
        name = customer.name;
      } else if (user.account_type === 'provider') {
        const provider = await Provider.findOne({ user_id: user.id });
        name = provider.name;
      }

      const tokenVerification = await TokenVerification.create({
        user: user.id,
        token: crypto.randomBytes(16).toString('hex'),
      });

      await Queue.add(SignUpMail.key, {
        name,
        url: `${process.env.APP_URL}/api/confirmations?token=${tokenVerification.token}`,
        email,
      });

      return res.json({
        type: 'done-job',
        msg: 'Email resended successfully.',
      });
    }

    return res.status(400).json({
      type: 'not-available',
      msg: 'Your user is already activated.',
    });
  }
}

export default new ResendController();
