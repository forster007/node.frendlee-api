import { Appointment, Customer, Provider, Rating } from '../models';

class RatingController {
  async store(req, res) {
    const { body, headers } = req;
    const { appointment_id } = body;
    const { account_type, id } = headers;

    const appointment = await Appointment.findByPk(appointment_id, {
      include: [
        { as: 'customer', attributes: ['id', 'onesignal'], model: Customer },
        { as: 'provider', attributes: ['id', 'onesignal'], model: Provider },
      ],
    });

    switch (account_type) {
      case 'customer': {
        if (id === appointment.customer.id) {
          const existRating = await Rating.findOne({ where: { appointment_id } });
          body.customer_id = appointment.customer.id;
          body.provider_id = appointment.provider.id;

          if (!existRating) {
            const rating = await Rating.create(body);
            return res.json(rating);
          }

          const rating = await existRating.update(body);
          return res.json(rating);
        }

        break;
      }

      case 'provider': {
        if (id === appointment.provider.id) {
          const existRating = await Rating.findOne({ where: { appointment_id } });
          body.customer_id = appointment.customer.id;
          body.provider_id = appointment.provider.id;

          if (!existRating) {
            const rating = await Rating.create(body);
            return res.json(rating);
          }

          const rating = await existRating.update(body);
          return res.json(rating);
        }

        break;
      }

      default:
        break;
    }

    return res.json({ data: true });
  }
}

export default new RatingController();
