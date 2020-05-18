import axios from 'axios';
import { Appointment, Customer, Provider, User } from '../models';
import { Message } from '../schemas';

import isEmpty from '../../lib/Helpers';

class MessageController {
  async index(req, res) {
    const provider = await User.findOne({
      where: { id: req.headers.user_id, provider: true },
    });

    if (isEmpty(provider)) {
      return res.status(400).json({
        error: 'User is not a provider or does not exists',
      });
    }

    const notifications = await Message.find({
      user: req.headers.user_id,
    }).sort({ createdAt: 'desc' });

    return res.json(notifications);
  }

  async update(req, res) {
    try {
      const { body, connected_users, headers, io, params } = req;
      const { text } = body;
      const { account_type, email, uid: _id } = headers;
      const { id: appointment_id } = params;
      const messages = { text, user: { _id, email } };
      await Message({ appointment_id }, { $push: { messages } });

      const appointment = await Appointment.findByPk(appointment_id, {
        include: [
          { as: 'customer', attributes: ['id', 'onesignal'], model: Customer },
          { as: 'provider', attributes: ['id', 'onesignal'], model: Provider },
        ],
      });

      switch (account_type) {
        case 'customer': {
          const ownerOnline = connected_users.provider[appointment.dataValues.provider.id];

          if (ownerOnline) {
            io.to(ownerOnline).emit('message', messages);
          } else if (appointment.dataValues.provider.onesignal) {
            axios.post('https://exp.host/--/api/v2/push/send', [
              {
                to: appointment.dataValues.provider.onesignal,
                body: text,
                title: 'New message',
              },
            ]);
          }

          break;
        }

        case 'provider': {
          const ownerOnline = connected_users.customer[appointment.dataValues.customer.id];

          if (ownerOnline) {
            io.to(ownerOnline).emit('message', messages);
          } else if (appointment.dataValues.customer.onesignal) {
            await axios.post('https://exp.host/--/api/v2/push/send', [
              {
                to: appointment.dataValues.customer.onesignal,
                body: text,
                title: 'New message',
              },
            ]);
          }
          break;
        }

        default:
          break;
      }

      return res.json({ success: true });
    } catch (error) {
      return res.status(400).json({ error: error.response.data });
    }
  }
}

export default new MessageController();
