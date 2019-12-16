import moment from 'moment';
import { Appointment, Customer, Provider, User } from '../models';
import { Notification, storeAppointment } from '../schemas';

import CancellationMail from '../jobs/CancellationMail';
import isEmpty from '../../lib/Helpers';
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
          model: User,
        },
      ],
      order: ['date'],
      where: {
        user_id: req.headers.id,
      },
    });

    return res.json(appointments);
  }

  async store(req, res) {
    try {
      const provider = await Provider.findOne({
        include: [
          {
            as: 'user',
            attributes: ['email', 'status'],
            model: User,
            where: {
              status: 'enabled',
            },
          },
        ],
        where: {
          id: req.body.provider_id,
        },
      });

      if (isEmpty(provider)) {
        throw new Error('Provider does not exists or he is unavailable');
      }

      const dateToStart = moment(req.body.date).startOf('hour');
      const dateNow = moment();

      if (moment(dateToStart).isBefore(dateNow)) {
        throw new Error('Past date are not permitted');
      }

      const dateAvailable = await Appointment.findOne({
        where: {
          date: dateToStart,
          provider_id: provider.id,
        },
      });

      if (!isEmpty(dateAvailable)) {
        throw new Error('Appointment date is not available');
      }

      const customer = await Customer.findByPk(req.headers.id, {
        include: [
          {
            as: 'user',
            attributes: ['email', 'status'],
            model: User,
            where: {
              status: 'enabled',
            },
          },
        ],
      });

      if (isEmpty(customer)) {
        throw new Error('Your user cannot store a new appointment');
      }

      const appointment = await Appointment.create({
        customer_id: customer.id,
        date: dateToStart,
        description: req.body.description,
        provider_id: provider.id,
      });

      const appointmentDateTime = moment(dateToStart).format('DD/MM/YYYY');
      const appointmentClockTime = moment(dateToStart).format('HH:mm');

      await Notification.create({
        content: `Novo agendamento de ${customer.name} para o dia ${appointmentDateTime} às ${appointmentClockTime}`,
        user: provider.id,
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
