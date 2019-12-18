import './database';
import cors from 'cors';
import express, { json } from 'express';
import helmet from 'helmet';

import { AuthMiddleware, SecurityMiddleware } from './app/middlewares';

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
    this.server.use(SecurityMiddleware);
  }

  routes() {
    const PREFIX = '/api';

    this.server.use(`${PREFIX}/administrators`, administrators);
    this.server.use(`${PREFIX}/appointments`, appointments);
    this.server.use(`${PREFIX}/clocks`, clocks);
    this.server.use(`${PREFIX}/customers`, customers);
    this.server.use(`${PREFIX}/notifications`, notifications);
    this.server.use(`${PREFIX}/periods`, periods);
    this.server.use(`${PREFIX}/providers`, providers);
    this.server.use(`${PREFIX}/schedules`, schedules);
    this.server.use(`${PREFIX}/services`, services);
    this.server.use(`${PREFIX}/sessions`, sessions);
    this.server.use(`${PREFIX}/stuffs`, stuffs);
    this.server.use(`${PREFIX}/users`, users);

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
