import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';

const debug = createDebug('AiJo:DefaultController');

export class DefaultController {
  constructor() {
    debug('Default controller instantiated...');
  }

  default(req: Request, res: Response, _next: NextFunction) {
    debug('Home, sweet home!');
    res.json({
      info: 'Aikido Journey',
      endpoints: {
        users: '/aikido-users',
        techniques: '/techniques',
      },
    });
  }
}
