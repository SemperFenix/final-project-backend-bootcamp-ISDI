/* eslint-disable no-unused-vars */
import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import AikidoUserCreator from '../../../aikido.users/application/aikido.users.creator.js';
import AikidoUserEraser from '../../../aikido.users/application/aikido.users.eraser.js';
import AikidoUserQuerier from '../../../aikido.users/application/aikido.users.querier.js';
import AikidoUserQuerierId from '../../../aikido.users/application/aikido.users.querier.id.js';
import AikidoUserSearcher from '../../../aikido.users/application/aikido.users.searcher.js';
import AikidoUserUpdater from '../../../aikido.users/application/aikido.users.updater.js';
import { HTTPError } from '../../../common/errors/http.error.js';
import { Auth, TokenPayload } from '../../../services/auth.js';

const debug = createDebug('AiJo:AiUsController');

export class AikidoUsersController {
  // eslint-disable-next-line max-params
  constructor(
    private aikidoUserSearcher: AikidoUserSearcher,
    private aikidoUserQuerier: AikidoUserQuerier,
    private aikidoUserQuerierId: AikidoUserQuerierId,
    private aikidoUserCreator: AikidoUserCreator,
    private aikidoUserUpdater: AikidoUserUpdater,
    private aikidoUserEraser: AikidoUserEraser
  ) {
    debug('AikidoUsers controller instantiated...');
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      debug('Registering...');

      if (!req.body.email || !req.body.password)
        throw new HTTPError(401, 'Unathorized', 'No email or pass provided');
      req.body.password = await Auth.hash(req.body.password);
      req.body.role = 'user';
      req.body.techsLearnt = [];
      req.body.techsInProgress = [];
      const newAikidoUser = await this.aikidoUserCreator.execute(req.body);
      res.status(201);
      res.json({ results: [newAikidoUser] });
    } catch (error) {
      debug('Register error =(');
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      debug('Logging in...');
      const { email, password } = req.body;
      if (!email || !password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email or password');
      const member = await this.aikidoUserSearcher.execute([
        { key: 'email', value: email },
      ]);
      if (!member)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email or password');
      if (!(await Auth.compareHash(password, member[0].password)))
        throw new HTTPError(401, 'Unauthorized', 'Password not match');
      const tokenPayload: TokenPayload = {
        id: member[0].id,
        email: member[0].email,
        role: member[0].role,
      };
      const token = Auth.createToken(tokenPayload);
      debug('Login successful! =D');
      res.json({ results: [{ token }] });
    } catch (error) {
      debug('Login error =(');
      next(error);
    }
  }
}
