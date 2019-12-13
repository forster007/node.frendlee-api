import moment from 'moment';
import { Op } from 'sequelize';
import { Appointment, User } from '../models';

import isEmpty from '../../lib/Helpers';

class ScheduleController {
  async index(req, res) {
    const provider = await User.findOne({
      where: {
        id: req.headers.user_id,
        provider: true,
      },
    });

    if (isEmpty(provider)) {
      return res.status(400).json({
        error: 'User is not a provider or does not exists',
      });
    }

    const { date } = req.query;
    const startOfDay = moment(date).startOf('day');
    const endOfDay = moment(date).endOf('day');

    const appointments = await Appointment.findAll({
      order: ['date'],
      where: {
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay, endOfDay],
        },
        provider_id: req.headers.user_id,
      },
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
