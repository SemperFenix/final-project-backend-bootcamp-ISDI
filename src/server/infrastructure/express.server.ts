/* eslint-disable no-unused-vars */
import express, { Express, Request, Response, NextFunction } from 'express';
import http from 'http';
import ServerRouter from './server.router.js';
import createDebug from 'debug';
import morgan from 'morgan';
import cors from 'cors';
import { CustomError } from '../../common/errors/http.error.js';
import { dbConnect } from './mongoose/db/db.connect.js';

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
    this.app.use(
      (
        error: CustomError,
        _req: Request,
        resp: Response,
        _next: NextFunction
      ) => {
        const status = error.code || 500;
        const statusMessage = error.outMsg || 'Internal Server Error';
        resp.status(status);
        debug('Error: ', status, statusMessage);
        debug(error.name, ': ', error.message);

        resp.json({
          error: [{ status, statusMessage }],
        });
      }
    );
  }

  routes(): void {
    this.routers.forEach((router) => {
      this.app.use(router.path, router.router);
    });
  }

  start(port: number): void {
    const server = http.createServer(this.app);

    dbConnect().then((mongoose) => {
      server.listen(port);
      debug('Connected to DB: ', mongoose.connection.db.databaseName);
    });
    server.on('listening', () => {
      debug(`Server running on port ${port}`);
    });
  }
}
