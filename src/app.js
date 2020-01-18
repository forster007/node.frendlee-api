import './database';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { json } from 'express';
import helmet from 'helmet';
import http from 'http';
import io from 'socket.io';

import { AuthMiddleware, SecurityMiddleware } from './app/middlewares';

import * as router from './routes';

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
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(json());
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    this.app.use(AuthMiddleware);
    this.app.use(SecurityMiddleware);
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connected_users = this.connected_users;

      next();
    });
  }

  routes() {
    const PREFIX = '/api';

    this.app.use(`${PREFIX}/administrators`, router.administrators);
    this.app.use(`${PREFIX}/appointments`, router.appointments);
    this.app.use(`${PREFIX}/clocks`, router.clocks);
    this.app.use(`${PREFIX}/customers`, router.customers);
    this.app.use(`${PREFIX}/notifications`, router.notifications);
    this.app.use(`${PREFIX}/periods`, router.periods);
    this.app.use(`${PREFIX}/providers`, router.providers);
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
      const { user_id } = socket.handshake.query;
      this.connected_users[user_id] = socket.id;

      socket.on('disconnect', () => {
        delete this.connected_users[user_id];
      });
    });
  }
}

export default new App().server;
