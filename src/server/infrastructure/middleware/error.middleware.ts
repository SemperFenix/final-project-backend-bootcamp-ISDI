import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../../common/errors/http.error';
import createDebug from 'debug';

const debug = createDebug('AiJo:ErrorMiddle');

export const errorMiddleware = (
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
};
