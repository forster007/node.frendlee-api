import './database';
import acl from 'express-acl';
import cors from 'cors';
import express, { json } from 'express';
import helmet from 'helmet';
import http from 'http';
import io from 'socket.io';
import path from 'path';
import unless from 'express-unless';

import { aclConfig, unlessConfig } from './config';

import * as router from './routes';
import mwAuth from './app/middlewares/mwAuth';

const PREFIX = process.env.BASE_PREFIX;

class App {
  constructor() {
    this.app = express();
    this.connected_users = { customer: {}, provider: {} };
    this.server = http.Server(this.app);

    this.middlewares();
    this.routes();
    this.socket();
  }

  middlewares() {
    acl.config(aclConfig);
    mwAuth.unless = unless;

    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(json({ limit: '50mb' }));
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connected_users = this.connected_users;
      next();
    });

    this.app.use(PREFIX, mwAuth.unless(unlessConfig));
    this.app.use(acl.authorize.unless(unlessConfig));
  }

  routes() {
    this.app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

    this.app.use(`/confirmation`, (req, res) => {
      res.sendFile(path.resolve(path.join(`${__dirname}/app/views/htmls/confirmation.html`)));
    });

    this.app.use(`${PREFIX}/administrators`, router.administrators);
    this.app.use(`${PREFIX}/appointments`, router.appointments);
    this.app.use(`${PREFIX}/checks`, router.checks);
    this.app.use(`${PREFIX}/clocks`, router.clocks);
    this.app.use(`${PREFIX}/confirmations`, router.confirmations);
    this.app.use(`${PREFIX}/customers`, router.customers);
    this.app.use(`${PREFIX}/messages`, router.messages);
    this.app.use(`${PREFIX}/notifications`, router.notifications);
    this.app.use(`${PREFIX}/onesignal`, router.onesignal);
    this.app.use(`${PREFIX}/periods`, router.periods);
    this.app.use(`${PREFIX}/providers`, router.providers);
    this.app.use(`${PREFIX}/resends`, router.resends);
    this.app.use(`${PREFIX}/schedules`, router.schedules);
    this.app.use(`${PREFIX}/services`, router.services);
    this.app.use(`${PREFIX}/sessions`, router.sessions);
    this.app.use(`${PREFIX}/stuffs`, router.stuffs);
    this.app.use(`${PREFIX}/users`, router.users);

    this.app.all('*', (req, res) => {
      const error = {
        code: 404,
        message: 'Route not available',
        status: 'error',
      };

      res.status(404).send(error);
    });
  }

  socket() {
    this.io = io(this.server);
    this.io.on('connection', socket => {
      const { account_type, id } = socket.handshake.query;
      if (account_type && id) {
        this.connected_users[account_type][id] = socket.id;
        console.log(this.connected_users);

        socket.on('disconnect', () => {
          delete this.connected_users[account_type][id];
          console.log(this.connected_users);
        });
      }
    });
  }
}

export default new App().server;
