import moment from 'moment';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      context: {
        date: moment(appointment.date).format('DD/MM/YYYY HH:mm'),
        provider: appointment.name,
        user: appointment.email,
      },
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      to: `${appointment.name} <${appointment.email}>`,
    });
  }
}

export default new CancellationMail();
