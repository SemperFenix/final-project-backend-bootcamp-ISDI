import { NextFunction, Request, Response } from 'express';

import createDebugger from 'debug';
import { Auth, TokenPayload } from '../../../services/auth.js';
import { HTTPError } from '../../../common/errors/http.error.js';

const debug = createDebugger('AiJo:Interceptors');

export interface CustomRequest extends Request {
  credentials?: TokenPayload;
}

export abstract class Interceptors {
  static logged(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      debug('Checking loggin...');

      const authHeader = req.get('Authorization');
      if (!authHeader)
        throw new HTTPError(
          498,
          'Token expired/invalid',
          'No authorization header found'
        );

      if (!authHeader.startsWith('Bearer'))
        throw new HTTPError(
          498,
          'Token expired/invalid',
          'No Bearer in auth header'
        );

      const token = authHeader.slice(7);
      const tokenPayload = Auth.getTokenInfo(token);
      req.credentials = tokenPayload;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async authorized(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      debug('Can you access?');
      if (!req.credentials)
        throw new HTTPError(498, 'Token not found', 'No member in the request');

      if (!req.body.userId) req.body.userId = req.params.id;

      if (req.credentials.id !== req.body.userId)
        throw new HTTPError(401, 'Unauthorized', 'Not allowed action');
      debug('Yes, you can!');
      next();
    } catch (error) {
      next(error);
    }
  }

  static async admin(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      debug('Admin?');
      if (!req.credentials)
        throw new HTTPError(498, 'Token not found', 'No member in the request');

      if (!req.body.userId) req.body.userId = req.params.id;
      if (req.credentials.role !== 'sensei')
        throw new HTTPError(401, 'Unauthorized', 'Not allowed action');
      debug('Thanks, sensei!');
      next();
    } catch (error) {
      next(error);
    }
  }
}
