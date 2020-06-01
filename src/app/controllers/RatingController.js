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
          const obj = {
            appointment_id,
            customer_id: appointment.customer.id,
            provider_comment: body.comment,
            provider_compliment: body.compliment,
            provider_id: appointment.provider.id,
            provider_rating: body.rating,
          };

          if (!existRating) {
            const rating = await Rating.create(obj);
            await appointment.update({ customer_rating: true });

            return res.json(rating);
          }

          const rating = await existRating.update(obj);
          await appointment.update({ customer_rating: true });

          return res.json(rating);
        }

        break;
      }

      case 'provider': {
        if (id === appointment.provider.id) {
          const existRating = await Rating.findOne({ where: { appointment_id } });
          const obj = {
            appointment_id,
            provider_id: appointment.provider.id,
            customer_comment: body.comment,
            customer_compliment: body.compliment,
            customer_id: appointment.customer.id,
            customer_rating: body.rating,
          };

          if (!existRating) {
            const rating = await Rating.create(obj);
            await appointment.update({ provider_rating: true });

            return res.json(rating);
          }

          const rating = await existRating.update(obj);
          await appointment.update({ provider_rating: true });

          return res.json(rating);
        }

        break;
      }

      default: {
        return res.status(400).json({ error: 'not allowed ' });
      }
    }

    return res.status(400).json({ error: 'not allowed ' });
  }
}

export default new RatingController();
