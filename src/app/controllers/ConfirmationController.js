import { User } from '../models';
import { TokenVerification } from '../schemas';

class ConfirmationController {
  async show(req, res) {
    const { token } = req.query;
    const response = await TokenVerification.findOne({ token });

    if (!response) {
      return res.status(400).send({
        type: 'not-verified',
        msg: 'Your token may have expired.',
      });
    }

    const { user: id } = response;
    const user = await User.findByPk(id);

    if (user.status !== 'disabled') {
      return res.status(400).send({
        type: 'already-verified',
        msg: 'Your user is already verified.',
      });
    }

    if (user.account_type === 'customer') {
      user.status = 'enabled';
    } else if (user.account_type === 'provider') {
      user.status = 'locked';
    }

    await user.save();
    return res.json(user);
  }
}

export default new ConfirmationController();
