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

class App {
  constructor() {
    this.app = express();
    this.connected_users = {};
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

    this.app.use(process.env.PREFIX, mwAuth.unless(unlessConfig));
    this.app.use(acl.authorize.unless(unlessConfig));

    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connected_users = this.connected_users;
      next();
    });
  }

  routes() {
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    this.app.use(`/confirmation`, (req, res) => {
      res.sendFile(
        path.resolve(
          path.join(`${__dirname}/app/views/htmls/confirmation.html`)
        )
      );
    });

    this.app.use(`${process.env.PREFIX}/administrators`, router.administrators);
    this.app.use(`${process.env.PREFIX}/appointments`, router.appointments);
    this.app.use(`${process.env.PREFIX}/checks`, router.checks);
    this.app.use(`${process.env.PREFIX}/clocks`, router.clocks);
    this.app.use(`${process.env.PREFIX}/confirmations`, router.confirmations);
    this.app.use(`${process.env.PREFIX}/customers`, router.customers);
    this.app.use(`${process.env.PREFIX}/notifications`, router.notifications);
    this.app.use(`${process.env.PREFIX}/periods`, router.periods);
    this.app.use(`${process.env.PREFIX}/providers`, router.providers);
    this.app.use(`${process.env.PREFIX}/resends`, router.resends);
    this.app.use(`${process.env.PREFIX}/schedules`, router.schedules);
    this.app.use(`${process.env.PREFIX}/services`, router.services);
    this.app.use(`${process.env.PREFIX}/sessions`, router.sessions);
    this.app.use(`${process.env.PREFIX}/stuffs`, router.stuffs);
    this.app.use(`${process.env.PREFIX}/users`, router.users);

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
      const { user_id } = socket.handshake.query;
      this.connected_users[user_id] = socket.id;

      socket.on('disconnect', () => {
        delete this.connected_users[user_id];
      });
    });
  }
}

export default new App().server;
