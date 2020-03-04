import axios from 'axios';
import moment from 'moment';
import { Op } from 'sequelize';
import { Appointment, Customer, Provider, ProviderServices, Service, User } from '../models';
// import { Notification } from '../schemas';

import isEmpty from '../../lib/Helpers';

const exclude = ['createdAt', 'updatedAt'];

class AppointmentController {
  async index(req, res) {
    const { headers, query } = req;
    const { account_type, id } = headers;

    switch (account_type) {
      case 'customer': {
        const appointments = await Appointment.findAll({
          include: [
            {
              as: 'provider',
              attributes: ['lastname', 'name', 'picture_profile', 'picture_profile_url'],
              model: Provider,
            },
            {
              as: 'detail',
              attributes: ['id'],
              include: [
                {
                  as: 'service',
                  attributes: ['name'],
                  model: Service,
                },
              ],
              model: ProviderServices,
            },
          ],
          where: { customer_id: id },
          order: [
            ['status', 'ASC'],
            ['start_at', 'DESC'],
          ],
        });

        return res.json(appointments);
      }

      case 'provider': {
        if (!isEmpty(query)) {
          const { operation, status } = query;

          const appointments = await Appointment.findAll({
            where: {
              status: {
                [Op[operation]]: status,
              },
              provider_id: id,
            },
            order: [
              ['status', 'ASC'],
              ['start_at', 'DESC'],
            ],
          });

          return res.json(appointments);
        }

        const appointments = await Appointment.findAll({
          where: { provider_id: id },
          order: [
            ['status', 'ASC'],
            ['start_at', 'DESC'],
          ],
        });

        return res.json(appointments);
      }

      default: {
        return res.status(400).json({});
      }
    }
  }

  async store(req, res) {
    try {
      const { body, headers } = req;
      const { account_type } = headers;

      if (account_type === 'customer') {
        const customer = await Customer.findOne({
          attributes: { exclude },
          include: [{ as: 'user', attributes: ['email', 'status'], model: User }],
          where: { id: headers.id },
        });

        if (isEmpty(customer)) {
          throw new Error('You cannot store an appointment');
        }

        const cUser = customer.user;

        if (cUser.status === 'disabled' || cUser.status === 'locked') {
          throw new Error(`You cannot store an appointment because your account was ${cUser.status}`);
        }

        const provider = await Provider.findOne({
          attributes: { exclude },
          include: [{ as: 'user', attributes: ['email', 'status'], model: User }],
          where: { id: body.provider_id },
        });

        if (isEmpty(provider)) {
          throw new Error('Provider does not exists or he was unavailable');
        }

        const pUser = provider.user;

        if (pUser.status === 'disabled' || pUser.status === 'locked') {
          throw new Error(`You cannot store an appointment because this provider account was ${pUser.status}`);
        }

        const { address, date, duration, observation, provider_service_id } = body;

        const dateNow = moment().toDate();
        const start_at = moment(date).toDate();
        const finish_at = moment(date)
          .add(duration, 'hour')
          .toDate();

        if (moment(start_at).isBefore(dateNow)) {
          throw new Error('You cannot store an appointment because past dates are not permitted');
        }

        const customerAvailable = await Appointment.findOne({
          where: {
            [Op.and]: [
              {
                [Op.or]: [{ start_at: { [Op.between]: [start_at, finish_at] } }, { finish_at: { [Op.between]: [start_at, finish_at] } }],
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
                [Op.or]: [{ start_at: { [Op.between]: [start_at, finish_at] } }, { finish_at: { [Op.between]: [start_at, finish_at] } }],
              },
              {
                provider_id: provider.id,
              },
            ],
          },
        });

        if (!isEmpty(providerAvailable)) {
          throw new Error('Your provider already have an appointment on this date');
        }

        const providerService = await ProviderServices.findByPk(provider_service_id);

        if (isEmpty(providerService)) {
          throw new Error('Your selected provider service is not avaiable');
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

        axios.post('https://exp.host/--/api/v2/push/send', [
          {
            to: provider.onesignal,
            body: 'You have a new appointmnet.',
            title: 'New appointment',
          },
        ]);

        return res.json(appointment);
      }

      throw new Error('You cannot store an appointment');

      // const appointmentDateTime = moment(dateToStart).format('DD/MM/YYYY');
      // const appointmentClockTime = moment(dateToStart).format('HH:mm');
      // const notification = await Notification.create({
      //   content: `Novo agendamento de ${customer.name} para o dia ${appointmentDateTime} às ${appointmentClockTime}`,
      //   user: provider.id,
      // });

      // const socket = req.connected_users[provider.id];
      // if (socket) req.io.to(socket).emit('notification', notification);
      // return res.json(appointment);
    } catch (e) {
      console.log(e);
      return res.status(e.status || 400).json({
        error: e.message || 'Appointment already exists',
      });
    }
  }

  async update(req, res) {
    try {
      const { body, headers, params } = req;
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
          if (appointment.customer.id !== id) {
            throw new Error('You do not have permission to update this appointment');
          }

          await appointment.update(body);

          if (body.status === 'payed') {
            axios.post('https://exp.host/--/api/v2/push/send', [
              {
                to: appointment.provider.onesignal,
                body: 'Your appointment has been payed by the customer.',
                title: 'Appointment payed',
              },
            ]);
          }

          return res.json(appointment);
        }

        case 'provider': {
          if (appointment.provider.id !== id) {
            throw new Error('You do not have permission to update this appointment');
          }

          await appointment.update(body);

          if (body.status === 'confirmed') {
            axios.post('https://exp.host/--/api/v2/push/send', [
              {
                to: appointment.customer.onesignal,
                body: 'Your appointment has been accepted by the provider.',
                title: 'Appointment accepted',
              },
            ]);
          }

          return res.json(appointment);
        }

        default: {
          throw new Error('You do not have permission to update this appointment');
        }
      }
    } catch (error) {
      return res.status(error.status || 400).json({
        error: error.message || 'Appointment can not be updated',
      });
    }
  }
}

export default new AppointmentController();
