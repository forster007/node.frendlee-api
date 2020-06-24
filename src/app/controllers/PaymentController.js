import { Appointment, Customer, Provider } from '../models';

const stripe = require('stripe')('sk_test_7PfaWB0jUhqz2FbM5HyNizhF00UK36N7ps');

class PeriodController {
  async store(req, res) {
    try {
      const { body, headers } = req;
      const { appointment_id, token } = body;
      const { account_type, id } = headers;

      if (account_type === 'customer') {
        const appointment = await Appointment.findByPk(appointment_id, {
          include: [
            { as: 'customer', attributes: ['id', 'onesignal'], model: Customer },
            { as: 'provider', attributes: ['id', 'onesignal'], model: Provider },
          ],
        });

        const { customer, status, value } = appointment;

        if (customer.id !== id && status !== 'confirmed') {
          throw new Error('You do not have permission to pay this appointment');
        }

        const tok = await stripe.tokens.retrieve(token);

        const paymentIntentsCreate = await stripe.paymentIntents.create({
          amount: value * 100,
          currency: 'usd',
          payment_method_types: ['card'],
        });

        const paymentMethodsCreate = await stripe.paymentMethods.create({
          type: 'card',
          card: { token: tok.id },
        });

        const paymentIntentsConfirm = await stripe.paymentIntents.confirm(paymentIntentsCreate.id, {
          payment_method: paymentMethodsCreate.id,
        });

        if (paymentIntentsConfirm.status === 'succeeded') {
          await appointment.update({ status: 'payed' });

          return res.json({ status: 'payed' });
        }

        return res.json({ status: paymentIntentsConfirm.status });
      }

      throw new Error('You do not have permission to pay this appointment');
    } catch (error) {
      return res.status(error.status || 400).json({
        error: error.message || 'Appointment can not be payed',
      });
    }
  }
}

export default new PeriodController();
