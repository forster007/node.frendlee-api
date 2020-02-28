import moment from 'moment';
import { Op } from 'sequelize';
import {
  Appointment,
  Customer,
  Provider,
  ProviderServices,
  User,
} from '../models';
import { Notification } from '../schemas';

import CancellationMail from '../jobs/CancellationMail';
import isEmpty from '../../lib/Helpers';
import Queue from '../../lib/Queue';

const exclude = ['createdAt', 'updatedAt'];

const userInclude = {
  as: 'user',
  attributes: ['email', 'status'],
  model: User,
};

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
    const { account_type, id } = req.headers;

    switch (account_type) {
      case 'customer': {
        const appointments = await Appointment.findAll({
          where: { customer_id: id },
        });

        return res.json(appointments);
      }
      case 'provider': {
        const appointments = await Appointment.findAll({
          where: { provider_id: id },
        });

        return res.json(appointments);
      }
      default:
        return res.status(400).json({});
    }
  }

  async store(req, res) {
    try {
      const { body, headers } = req;
      const { account_type } = headers;

      if (account_type === 'customer') {
        const customer = await Customer.findOne({
          attributes: { exclude },
          include: [userInclude],
          where: { id: headers.id },
        });

        if (isEmpty(customer)) {
          throw new Error('You cannot store an appointment');
        }

        const cUser = customer.user;

        if (cUser.status === 'disabled' || cUser.status === 'locked') {
          throw new Error(
            `You cannot store an appointment because your account was ${cUser.status}`
          );
        }

        const provider = await Provider.findOne({
          attributes: { exclude },
          include: [userInclude],
          where: { id: body.provider_id },
        });

        if (isEmpty(provider)) {
          throw new Error('Provider does not exists or he was unavailable');
        }

        const pUser = provider.user;

        if (pUser.status === 'disabled' || pUser.status === 'locked') {
          throw new Error(
            `You cannot store an appointment because this provider account was ${pUser.status}`
          );
        }

        const {
          address,
          date,
          duration,
          observation,
          provider_service_id,
        } = body;

        const dateNow = moment().toDate();
        const start_at = moment(date).toDate();
        const finish_at = moment(date)
          .add(duration, 'hour')
          .toDate();

        if (moment(start_at).isBefore(dateNow)) {
          throw new Error(
            'You cannot store an appointment because past dates are not permitted'
          );
        }

        const customerAvailable = await Appointment.findOne({
          where: {
            [Op.and]: [
              {
                [Op.or]: [
                  { start_at: { [Op.between]: [start_at, finish_at] } },
                  { finish_at: { [Op.between]: [start_at, finish_at] } },
                ],
              },
              {
                customer_id: customer.id,
              },
            ],
          },
        });

        if (!isEmpty(customerAvailable)) {
          throw new Error('You already have an appointment on this date');
        }

        const providerAvailable = await Appointment.findOne({
          where: {
            [Op.and]: [
              {
                [Op.or]: [
                  { start_at: { [Op.between]: [start_at, finish_at] } },
                  { finish_at: { [Op.between]: [start_at, finish_at] } },
                ],
              },
              {
                provider_id: provider.id,
              },
            ],
          },
        });

        if (!isEmpty(providerAvailable)) {
          throw new Error('Provider is not avaiable on this date');
        }

        const providerService = await ProviderServices.findByPk(
          provider_service_id
        );

        if (isEmpty(providerService)) {
          throw new Error('This provider service is not avaiable');
        }

        const value = providerService.value * duration;

        const appointment = await Appointment.create({
          start_at,
          duration,
          finish_at,
          observation,
          value,
          address,
          customer_id: customer.id,
          provider_id: provider.id,
          provider_service_id: providerService.id,
        });

        return res.json(appointment);
      }

      throw new Error('You cannot store an appointment');

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
        address_id: req.body.address_id,
        customer_id: customer.id,
        date: dateToStart,
        description: req.body.description,
        provider_id: provider.id,
        service_id: req.body.service_id,
      });

      const appointmentDateTime = moment(dateToStart).format('DD/MM/YYYY');
      const appointmentClockTime = moment(dateToStart).format('HH:mm');

      const notification = await Notification.create({
        content: `Novo agendamento de ${customer.name} para o dia ${appointmentDateTime} às ${appointmentClockTime}`,
        user: provider.id,
      });

      const socket = req.connected_users[provider.id];

      if (socket) {
        req.io.to(socket).emit('notification', notification);
      }

      return res.json(appointment);
    } catch (e) {
      console.log(e);
      return res.status(e.status || 400).json({
        error: e.message || 'Appointment already exists',
      });
    }
  }
}

export default new AppointmentController();
