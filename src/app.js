import './database';
import cors from 'cors';
import express, { json } from 'express';
import helmet from 'helmet';

import { AdminMiddleware, AuthMiddleware } from './app/middlewares';

import {
  administrators,
  appointments,
  clocks,
  customers,
  notifications,
  periods,
  providers,
  schedules,
  services,
  sessions,
  stuffs,
  users,
} from './routes';

const BASE_PREFIX = '/api';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(json());

    this.server.use(AuthMiddleware);
    this.server.use(AdminMiddleware);
  }

  routes() {
    this.server.use(`${BASE_PREFIX}/administrators`, administrators);
    this.server.use(`${BASE_PREFIX}/appointments`, appointments);
    this.server.use(`${BASE_PREFIX}/clocks`, clocks);
    this.server.use(`${BASE_PREFIX}/customers`, customers);
    this.server.use(`${BASE_PREFIX}/notifications`, notifications);
    this.server.use(`${BASE_PREFIX}/periods`, periods);
    this.server.use(`${BASE_PREFIX}/providers`, providers);
    this.server.use(`${BASE_PREFIX}/schedules`, schedules);
    this.server.use(`${BASE_PREFIX}/services`, services);
    this.server.use(`${BASE_PREFIX}/sessions`, sessions);
    this.server.use(`${BASE_PREFIX}/stuffs`, stuffs);
    this.server.use(`${BASE_PREFIX}/users`, users);

    this.server.all('*', (req, res) => {
      const error = {
        code: 404,
        message: 'Route not available',
        status: 'error',
      };

      res.status(404).send(error);
    });
  }
}

export default new App().server;
