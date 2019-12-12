import moment from 'moment';
import { Appointment, File, User } from '../models';
import { Notification, storeAppointment } from '../schemas';

import CancellationMail from '../jobs/CancellationMail';
import { isEmpty } from '../../lib';
import Queue from '../../lib/Queue';

class AppointmentController {
  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.appointmentid, {
      include: [
        {
          as: 'provider',
          attributes: ['email', 'name'],
          model: User,
        },
        {
          as: 'user',
          attributes: ['email', 'name'],
          model: User,
        },
      ],
    });

    if (appointment.user_id !== req.headers.user_id) {
      return res.status(401).json({
        error: 'You do not have permission to cancel this appointment',
      });
    }

    appointment.canceled_at = new Date();

    await appointment.save();
    await Queue.add(CancellationMail.key, { appointment });

    return res.json(appointment);
  }

  async index(req, res) {
    const appointments = await Appointment.findAll({
      attributes: ['id', 'date'],
      include: [
        {
          as: 'provider',
          attributes: ['email', 'name'],
          include: [
            {
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
              model: File,
            },
          ],
          model: User,
        },
      ],
      order: ['date'],
      where: {
        user_id: req.headers.user_id,
      },
    });

    return res.json(appointments);
  }

  async store(req, res) {
    try {
      await storeAppointment.validateAsync(req.body);

      const provider = await User.findOne({
        where: { id: req.body.provider_id, provider: true },
      });

      if (isEmpty(provider)) {
        return res.status(400).json({
          error: 'Provider does not exists',
        });
      }

      if (req.headers.user_id === req.body.provider_id) {
        return res.status(400).json({
          error: 'Customer can not be a provider',
        });
      }

      const dateToStart = moment(req.body.date).startOf('hour');
      const dateNow = moment();

      if (moment(dateToStart).isBefore(dateNow)) {
        return res.status(400).json({
          error: 'Past date are not permitted',
        });
      }

      const dateAvailable = await Appointment.findOne({
        where: {
          canceled_at: null,
          date: dateToStart,
          provider_id: req.body.provider_id,
        },
      });

      if (!isEmpty(dateAvailable)) {
        return res.status(400).json({
          error: 'Appointment date is not available',
        });
      }

      const appointment = await Appointment.create({
        date: dateToStart,
        provider_id: req.body.provider_id,
        user_id: req.headers.user_id,
      });

      const customer = await User.findByPk(req.headers.user_id);
      const dateTime = moment(dateToStart).format('DD/MM/YYYY');
      const hourTime = moment(dateToStart).format('HH:mm');

      await Notification.create({
        content: `Novo agendamento de ${customer.name} para o dia ${dateTime} às ${hourTime}`,
        user: req.body.provider_id,
      });

      return res.json(appointment);
    } catch (e) {
      return res.status(e.status || 400).json({
        error: e.message || 'Appointment already exists',
      });
    }
  }
}

export default new AppointmentController();
