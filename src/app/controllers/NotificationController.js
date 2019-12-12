import { User } from '../models';
import { Notification } from '../schemas';

import { isEmpty } from '../../lib';

class NotificationController {
  async index(req, res) {
    const provider = await User.findOne({
      where: { id: req.headers.user_id, provider: true },
    });

    if (isEmpty(provider)) {
      return res.status(400).json({
        error: 'User is not a provider or does not exists',
      });
    }

    const notifications = await Notification.find({
      user: req.headers.user_id,
    }).sort({ createdAt: 'desc' });

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findById(
      req.params.notificationid,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
