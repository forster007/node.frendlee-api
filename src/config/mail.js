require('dotenv').config();

export default {
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Frendlee <noreply@frendlee.com.br',
  },
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  service: process.env.MAIL_SERVICE,
};
