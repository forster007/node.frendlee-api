import moment from 'moment';
import {
  Address,
  Appointment,
  Customer,
  Provider,
  ProviderServices,
  Rating,
  Service,
  User,
} from '../models';

const exclude = ['createdAt', 'updatedAt'];

const userInclude = {
  as: 'user',
  attributes: ['email'],
  model: User,
};

class ScheduleController {
  async index(req, res) {
    try {
      const { account_type, id } = req.headers;

      switch (account_type) {
        case 'customer': {
          const customer = await Customer.findByPk(id, {
            include: [userInclude],
          });

          const appointments = await Appointment.findAll({
            attributes: { exclude },
            include: [
              {
                as: 'address',
                attributes: { exclude: [...exclude, 'id'] },
                model: Address,
              },
              {
                as: 'detail',
                attributes: ['id'],
                include: [
                  { as: 'service', attributes: ['name'], model: Service },
                ],
                model: ProviderServices,
              },
              {
                as: 'provider',
                attributes: ['id', 'lastname', 'name', 'picture_profile'],
                include: [{ as: 'user', attributes: ['email'], model: User }],
                model: Provider,
              },
              {
                as: 'rating',
                attributes: ['provider_rating'],
                model: Rating,
              },
            ],
            order: [['id', 'asc']],
            where: {
              customer_id: customer.id,
            },
          });

          const schedule = appointments.map(e => ({
            id: e.id,
            address: e.address,
            start_at: e.start_at,
            finish_at: e.finish_at,
            provider_id: e.provider.id,
            provider_email: e.provider.user.email,
            provider_name: `${e.provider.name} ${e.provider.lastname}`,
            observation: e.observation,
            status: e.status,
            title: e.detail.service.name,
            value: e.value,
          }));

          return res.json(schedule);
        }

        case 'provider': {
          const provider = await Provider.findByPk(id, {
            include: [userInclude],
          });

          const appointments = await Appointment.findAll({
            attributes: { exclude },
            include: [
              {
                as: 'address',
                attributes: { exclude: [...exclude, 'id'] },
                model: Address,
              },
              {
                as: 'detail',
                attributes: ['id'],
                include: [
                  { as: 'service', attributes: ['name'], model: Service },
                ],
                model: ProviderServices,
              },
              {
                as: 'customer',
                attributes: ['id', 'lastname', 'name', 'picture_profile'],
                include: [{ as: 'user', attributes: ['email'], model: User }],
                model: Customer,
              },
              { as: 'rating', attributes: ['customer_rating'], model: Rating },
            ],
            order: [['id', 'asc']],
            where: { provider_id: provider.id },
          });

          const schedule = appointments.map(e => ({
            id: e.id,
            address: e.address,
            start_at: e.date,
            finish_at: moment(e.date).add('hour', e.duration),
            customer_id: e.customer.id,
            customer_email: e.customer.user.email,
            customer_name: `${e.customer.name} ${e.customer.lastname}`,
            observation: e.observation,
            status: e.status,
            title: e.detail.service.name,
            value: e.value,
          }));

          return res.json(schedule);
        }

        default:
          throw new Error(
            'User does not match with any account types available'
          );
      }
    } catch (e) {
      return res.status(e.status || 400).json({
        error: e.message || 'User already exists',
      });
    }
  }
}

export default new ScheduleController();
