import { User } from '../models';
import { TokenVerification } from '../schemas';

class ConfirmationController {
  async show(req, res) {
    const { token } = req.query;
    const response = await TokenVerification.findOne({ token });

    if (!response) {
      return res.status(400).send({
        type: 'not-verified',
        msg: 'Your token may have expired or you already have activate then.',
      });
    }

    const { user: id } = response;
    const user = await User.findByPk(id);

    if ((user.account_type === 'customer' || user.account_type === 'provider') && user.status === 'enabled') {
      return res.json(user);
    }

    if (user.account_type === 'provider' && user.status === 'disabled') {
      return res.status(400).send({
        type: 'already-verified',
        msg: 'Talk to an administrator.',
      });
    }

    if (user.account_type === 'customer') {
      user.status = 'enabled';
    } else if (user.account_type === 'provider') {
      user.status = 'disabled';
    }

    await user.save();
    return res.json(user);
  }
}

export default new ConfirmationController();
