import axios from 'axios';
import { Appointment, Customer, CustomerParent, Parent, Provider } from '../models';
import { Message } from '../schemas';

class MessageController {
  async index(req, res) {
    const { headers } = req;
    const { account_type, id } = headers;

    switch (account_type) {
      case 'customer': {
        const appointments = await Appointment.findAll({
          include: [{ as: 'customer', attributes: ['avatar', 'id', 'onesignal', 'picture_profile'], model: Customer }],
          where: { customer_id: id },
        });

        const appointmentids = appointments.map(appointment => appointment.id);
        const messages = await Message.find({ appointment_id: appointmentids });

        return res.json({ messages });
      }

      case 'parent': {
        const customerParent = await CustomerParent.findAll({
          attributes: ['customer_id', 'parent_id'],
          where: { parent_id: id, status: 'approved' },
        });

        if (!customerParent) {
          throw new Error('You do not talk on this appointment');
        }

        const customerIds = customerParent.map(e => e.customer_id);

        const appointments = await Appointment.findAll({
          include: [{ as: 'customer', attributes: ['avatar', 'id', 'onesignal', 'picture_profile'], model: Customer }],
          where: { customer_id: customerIds },
        });

        const appointmentids = appointments.map(appointment => appointment.id);
        const messages = await Message.find({ appointment_id: appointmentids });

        return res.json({ messages });
      }

      case 'provider': {
        const appointments = await Appointment.findAll({
          include: [{ as: 'provider', attributes: ['avatar', 'id', 'onesignal', 'picture_profile'], model: Provider }],
          where: { provider_id: id },
        });

        const appointmentids = appointments.map(appointment => appointment.id);
        const messages = await Message.find({ appointment_id: appointmentids });

        return res.json({ messages });
      }

      default:
        break;
    }

    return res.json({ success: true });
  }

  async show(req, res) {
    const { headers, params } = req;
    const { account_type, id } = headers;
    const { id: appointment_id } = params;

    const appointment = await Appointment.findByPk(appointment_id, {
      include: [
        { as: 'customer', attributes: ['id', 'onesignal'], model: Customer },
        { as: 'provider', attributes: ['id', 'onesignal'], model: Provider },
      ],
    });

    switch (account_type) {
      case 'customer': {
        if (appointment.dataValues.customer_id === id) {
          const messages = await Message.findOne({ appointment_id });
          return res.json({ ...messages });
        }

        break;
      }

      case 'parent': {
        const customerParent = await CustomerParent.findOne({
          include: [{ as: 'parent', attributes: ['avatar', 'lastname', 'name', 'picture_profile'], model: Parent }],
          where: { customer_id: appointment.dataValues.customer_id, parent_id: id, status: 'approved' },
        });

        if (!customerParent) {
          throw new Error('You do not talk on this appointment');
        }

        const messages = await Message.findOne({ appointment_id });
        return res.json({ ...messages });
      }

      case 'provider': {
        if (appointment.dataValues.provider_id === id) {
          const messages = await Message.findOne({ appointment_id });
          return res.json({ ...messages });
        }

        break;
      }

      default:
        break;
    }

    return res.json({ success: true });
  }

  async update(req, res) {
    try {
      const { body, connected_users, headers, io, params } = req;
      const { text } = body;
      const { account_type, id, email, uid: _id } = headers;
      const { id: appointment_id } = params;
      const messages = { text, user: { _id, email } };
      const appointment = await Appointment.findByPk(appointment_id, {
        include: [
          { as: 'customer', attributes: ['avatar', 'id', 'onesignal', 'picture_profile'], model: Customer },
          { as: 'provider', attributes: ['avatar', 'id', 'onesignal', 'picture_profile'], model: Provider },
        ],
      });

      switch (account_type) {
        case 'customer': {
          if (appointment.dataValues.customer_id === id) {
            messages.user.avatar = appointment.dataValues.customer.avatar.uri;
            await Message.findOneAndUpdate({ appointment_id }, { $push: { messages } });

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
          }

          break;
        }

        case 'parent': {
          const customerParent = await CustomerParent.findOne({
            include: [{ as: 'parent', attributes: ['avatar', 'lastname', 'name', 'picture_profile'], model: Parent }],
            where: { customer_id: appointment.dataValues.customer_id, parent_id: id, status: 'approved' },
          });

          if (!customerParent) {
            throw new Error('You do not talk on this appointment');
          }

          messages.user.avatar = customerParent.parent.avatar.uri;
          await Message.findOneAndUpdate({ appointment_id }, { $push: { messages } });

          const ownerOnline = connected_users.provider[appointment.dataValues.provider.id];

          if (ownerOnline) {
            io.to(ownerOnline).emit('message', messages);
          } else if (appointment.dataValues.customer.onesignal) {
            axios.post('https://exp.host/--/api/v2/push/send', [
              {
                to: appointment.dataValues.customer.onesignal,
                body: text,
                title: 'New message',
              },
            ]);

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
          if (appointment.dataValues.provider_id === id) {
            messages.user.avatar = appointment.dataValues.provider.avatar.uri;

            await Message.findOneAndUpdate({ appointment_id }, { $push: { messages } });
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
          }
          break;
        }

        default:
          break;
      }

      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }
}

export default new MessageController();
