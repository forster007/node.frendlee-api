import exphbs from 'express-handlebars';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import nodemailerhbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';
import { mailConfig } from '../config';

class Mail {
  constructor() {
    const { auth, host, service } = mailConfig;

    this.transporter = nodemailer.createTransport(
      smtpTransport({
        service,
        host,
        auth,
      })
    );

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          defaultLayout: 'default',
          extname: '.hbs',
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
