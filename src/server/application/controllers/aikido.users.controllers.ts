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
import { CustomRequest } from '../../infrastructure/middleware/interceptors.middleware.js';
import AikidoUserSearcherPaged from '../../../aikido.users/application/aikido.users.searcherPaged.js';

const debug = createDebug('AiJo:AiUsController');

export class AikidoUsersController {
  // eslint-disable-next-line max-params
  constructor(
    private aikidoUserSearcher: AikidoUserSearcher,
    private aikidoUserQuerier: AikidoUserQuerier,
    private aikidoUserQuerierId: AikidoUserQuerierId,
    private aikidoUserCreator: AikidoUserCreator,
    private aikidoUserUpdater: AikidoUserUpdater,
    private aikidoUserEraser: AikidoUserEraser,
    private aikidoUserSearcherPaged: AikidoUserSearcherPaged
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
      const aikidoUser = await this.aikidoUserSearcher.execute([
        { key: 'email', value: email },
      ]);
      if (!aikidoUser)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email or password');
      if (!(await Auth.compareHash(password, aikidoUser[0].password)))
        throw new HTTPError(401, 'Unauthorized', 'Password not match');
      const tokenPayload: TokenPayload = {
        id: aikidoUser[0].id,
        email: aikidoUser[0].email,
        role: aikidoUser[0].role,
      };
      const token = Auth.createToken(tokenPayload);
      debug('Login successful! =D');
      res.json({ results: [{ token }] });
    } catch (error) {
      debug('Login error =(');
      next(error);
    }
  }

  async getSenseisCategorized(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    // eslint-disable-next-line no-debugger
    debugger;
    try {
      const { page } = req.query;
      if (!page) throw new HTTPError(400, 'Bad request', 'No page provided');

      const senseis = await this.aikidoUserSearcherPaged.execute(
        [{ key: 'role', value: 'sensei' }],
        page as string
      );

      res.json({
        results: [
          {
            users: senseis.members,
            number: senseis.number,
          },
        ],
      });
    } catch (error) {
      next(error);
    }
  }

  async getStudentsCategorized(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { page } = req.query;

      if (!page) throw new HTTPError(400, 'Bad request', 'No page provided');

      const students = await this.aikidoUserSearcherPaged.execute(
        [{ key: 'role', value: 'user' }],
        page as string
      );
      res.json({
        results: [
          {
            users: students.members,
            number: students.number,
          },
        ],
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new HTTPError(400, 'Bad request', 'No user provided');

      const user = await this.aikidoUserQuerierId.execute(id);
      res.json({
        results: [user],
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSelfUser(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new HTTPError(400, 'Bad request', 'No user provided');

      // Un usuario normal no puede editar algunos de sus campos, por lo que, incluso si los manda, los elimino para que no los pase al updater

      delete req.body.grade;
      delete req.body.techsLearnt;
      delete req.body.mainUke;

      const user = await this.aikidoUserUpdater.execute(req.body);
      res.json({
        results: [user],
      });
    } catch (error) {
      next(error);
    }
  }

  async updateAdmin(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new HTTPError(400, 'Bad request', 'No user provided');

      const user = req.body;

      const userToUpdate = await this.aikidoUserQuerierId.execute(user.id);

      userToUpdate.techsLearnt.push(req.body.tech);
      userToUpdate.techsInProgress = userToUpdate.techsInProgress.filter(
        (item) => item !== req.body.tech.id
      );

      const updatedUser = await this.aikidoUserUpdater.execute(req.body);
      res.json({
        results: [updatedUser],
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new HTTPError(400, 'Bad request', 'No user provided');

      await this.aikidoUserEraser.execute(id);
      res.json({
        results: [{}],
      });
    } catch (error) {
      next(error);
    }
  }

  async addUke(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new HTTPError(400, 'Bad request', 'No user provided');

      const user = await this.aikidoUserQuerierId.execute(id);
      if (!req.body.id)
        throw new HTTPError(400, 'Bad request', 'No user provided');

      const ukeToAdd = await this.aikidoUserQuerierId.execute(req.body.id);

      if (!ukeToAdd) throw new HTTPError(404, 'Not found', 'User not found');

      user.mainUke = ukeToAdd;

      const updatedUser = await this.aikidoUserUpdater.execute(user);
      res.json({
        results: [updatedUser],
      });
    } catch (error) {
      next(error);
    }
  }

  async removeUke(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new HTTPError(400, 'Bad request', 'No user provided');

      const user = await this.aikidoUserQuerierId.execute(id);

      user.mainUke = undefined;

      const updatedUser = await this.aikidoUserUpdater.execute(user);
      res.json({
        results: [updatedUser],
      });
    } catch (error) {
      next(error);
    }
  }
}
