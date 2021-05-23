import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import 'express-async-errors';

import errorHandler from '@middlewares/errorHandler';

import routes from './app/routes';

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.server.use(process.env.STAGE === 'local' ? '/' : '/users', routes);
    this.server.use(errorHandler);
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
  }
}

export default new App().server;
