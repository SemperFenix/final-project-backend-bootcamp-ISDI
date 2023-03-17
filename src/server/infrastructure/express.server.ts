/* eslint-disable no-unused-vars */
import express, { Express } from 'express';
import http, { Server } from 'http';
import ServerRouter from './server.router.js';
import createDebug from 'debug';
import morgan from 'morgan';
import cors from 'cors';
import { dbConnect } from './mongoose/db/db.connect.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const debug = createDebug('AiJo:ExpServ');

export default class ExpressServer {
  app: Express;

  constructor(private routers: ServerRouter[]) {
    this.app = express();
    this.config();
    this.routes();
    debug('Server initialited');
  }

  config(): void {
    this.app.disable('x-powered-by');
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.static('src/common/public'));
    this.app.use(errorMiddleware);
  }

  routes(): void {
    this.routers.forEach((router) => {
      this.app.use(router.path, router.router);
    });
  }

  start(port: number): Server {
    const server = http.createServer(this.app);
    dbConnect().then((mongoose) => {
      server.listen(port);
      debug('Connected to DB: ', mongoose.connection.db.databaseName);
    });
    server.on('listening', () => {
      debug(`Server running on port ${port}`);
    });

    return server;
  }
}
