import moment from 'moment';
import { Op } from 'sequelize';
import { Appointment, Customer, Provider, User } from '../models';

import isEmpty from '../../lib/Helpers';

class ScheduleController {
  async index(req, res) {
    try {
      const { account_type, id } = req.headers;

      switch (account_type) {
        case 'customer': {
          const customer = await Customer.findByPk(id, {
            include: {
              as: 'user',
              attributes: ['email'],
              model: User,
            },
          });

          return res.json(customer);
        }

        case 'provider': {
          const provider = await Provider.findByPk(id, {
            include: [
              {
                as: 'user',
                attributes: ['email'],
                model: User,
              },
            ],
          });

          const appointments = await Appointment.findAll({
            attributes: ['id', 'date', 'description'],
            include: [
              {
                as: 'customer',
                attributes: {
                  exclude: [
                    'blood_pressure',
                    'createdAt',
                    'have_allergy',
                    'have_diseases',
                    'have_treatment',
                    'password_hash',
                    'updatedAt',
                    'address_id',
                    'user_id',
                  ],
                },
                include: [
                  {
                    as: 'user',
                    attributes: ['email'],
                    model: User,
                  },
                ],
                model: Customer,
              },
            ],
            where: {
              provider_id: provider.id,
            },
          });

          return res.json(appointments);
        }

        default:
          throw new Error(
            'User does not match with any account types available'
          );
      }
    } catch (e) {
      console.log(e);
      return res.status(e.status || 400).json({
        error: e.message || 'User already exists',
      });
    }

    // const provider = await Provider.findOne({
    //   where: { id: req.headers.id },
    // });

    // if (isEmpty(provider)) {
    //   throw new Error('Provider does not exists or him is unavailable');
    // }

    // const { date } = req.query;
    // const startOfDay = moment(date).startOf('day');
    // const endOfDay = moment(date).endOf('day');

    // const appointments = await Appointment.findAll({
    //   order: ['date'],
    //   where: {
    //     canceled_at: null,
    //     date: {
    //       [Op.between]: [startOfDay, endOfDay],
    //     },
    //     provider_id: req.headers.user_id,
    //   },
    // });

    // return res.json(appointments);
  }
}

export default new ScheduleController();
