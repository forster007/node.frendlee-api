import Mail from '../../lib/Mail';

class SignUpMail {
  get key() {
    return 'SignUpMail';
  }

  async handle({ data }) {
    console.log(data);
    await Mail.sendMail({
      context: {
        email: data.email,
        name: data.name,
        url: data.url,
      },
      subject: 'Account Verification Token',
      template: 'signup',
      to: `${data.name} <${data.email}>`,
    });
  }
}

export default new SignUpMail();
