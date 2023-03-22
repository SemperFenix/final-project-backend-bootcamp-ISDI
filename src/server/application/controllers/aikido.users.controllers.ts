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
import AikidoUserSearcherPaged from '../../../aikido.users/application/aikido.users.searcher.paged.js';
import TechUpdater from '../../../techniques/application/techs.updater.js';
import TechQuerierId from '../../../techniques/application/techs.querier.id.js';
import { AikidoUser } from '../../../aikido.users/domain/aikido.user.js';

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
    private aikidoUserSearcherPaged: AikidoUserSearcherPaged,
    private techQuerierId: TechQuerierId,
    private techUpdater: TechUpdater
  ) {
    debug('AikidoUsers controller instantiated...');
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      debug('Registering...');
      const info: AikidoUser = req.body.user;

      if (!info.email || !info.password)
        throw new HTTPError(401, 'Unathorized', 'No email or pass provided');
      info.password = await Auth.hash(info.password);
      info.role = 'user';
      info.techsLearnt = [];
      info.techsInProgress = [];
      info.principalSensei = '6412e5c19d5869254d915887';
      const newAikidoUser = await this.aikidoUserCreator.execute(info);
      res.status(201);
      res.json({ results: [newAikidoUser] });
    } catch (error) {
      debug('Register error =(');
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      debugger;
      debug('Logging in...');

      const { email, password } = req.body.user;
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
      res.status(200);
      res.json({ results: [{ token }] });
    } catch (error) {
      debug('Login error =(');
      next(error);
    }
  }

  async getUsersCategorized(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      debug(id);

      if (!id) throw new HTTPError(400, 'No data provided', 'No role provided');

      // Código refactorizable??
      if (id !== 'user') {
        if (id !== 'sensei') throw new HTTPError(406, 'Invalid data', id);
      }

      const { page } = req.query;
      if (!page) throw new HTTPError(400, 'Bad request', 'No page provided');

      const users = await this.aikidoUserSearcherPaged.execute(
        [{ key: 'role', value: id }],
        page as string
      );
      debug('Users ready! =)');
      res.status(202);

      res.json({
        results: [
          {
            users: users.members,
            number: users.number,
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
      debug('User found! =)');
      res.status(200);

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

      delete req.body.user.grade;
      delete req.body.user.techsLearnt;
      delete req.body.user.mainUke;

      const user = await this.aikidoUserUpdater.execute(req.body.user);
      debug('Updated!');
      res.status(202);

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

      const userToUpdate = await this.aikidoUserQuerierId.execute(id);

      userToUpdate.techsLearnt.push(req.body.user.id);
      userToUpdate.techsInProgress = userToUpdate.techsInProgress.filter(
        (item) => item !== req.body.user.id
      );

      const tech = await this.techQuerierId.execute(req.body.tech.id);

      tech.usersLearnt.push(id);
      tech.usersInProgress = tech.usersInProgress.filter((item) => item !== id);

      await this.techUpdater.execute(tech);

      const updatedUser = await this.aikidoUserUpdater.execute(
        req.body.user.id
      );
      debug('Updated!');
      res.status(202);

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
      debug("'Bye, bye ='(");
      res.status(202);

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
      if (!req.body.user.id)
        throw new HTTPError(400, 'Bad request', 'No user provided');

      const ukeToAdd = await this.aikidoUserQuerierId.execute(req.body.user.id);

      if (!ukeToAdd) throw new HTTPError(404, 'Not found', 'User not found');

      const user = await this.aikidoUserQuerierId.execute(id);
      if (user.mainUke !== '' || undefined)
        throw new HTTPError(
          409,
          "Can't be more than one uke",
          'Field restricted to single value'
        );

      user.mainUke = ukeToAdd.id;

      const updatedUser = await this.aikidoUserUpdater.execute(user);
      res.status(202);

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

      user.mainUke = '';

      const updatedUser = await this.aikidoUserUpdater.execute(user);
      res.status(202);

      res.json({
        results: [updatedUser],
      });
    } catch (error) {
      next(error);
    }
  }

  async addTech(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const techId = req.body.tech.id;
      if (!userId) throw new HTTPError(400, 'Bad request', 'No user provided');
      if (!techId) throw new HTTPError(400, 'Bad request', 'No tech provided');

      const user = await this.aikidoUserQuerierId.execute(userId);
      if (!user) throw new HTTPError(404, 'Not found', 'User not found');

      const tech = await this.techQuerierId.execute(techId);
      if (!tech) throw new HTTPError(404, 'Not found', 'Tech not found');

      // Control de errores

      user.techsInProgress.push(techId);
      tech.usersInProgress.push(userId);
      await this.techUpdater.execute(tech);

      const updatedUser = await this.aikidoUserUpdater.execute(user);
      res.status(202);

      res.json({
        results: [updatedUser],
      });
    } catch (error) {
      next(error);
    }
  }

  async removeTech(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const techId = req.body.tech.id;
      if (!userId) throw new HTTPError(400, 'Bad request', 'No user provided');
      if (!techId) throw new HTTPError(400, 'Bad request', 'No tech provided');

      const user = await this.aikidoUserQuerierId.execute(userId);
      if (!user) throw new HTTPError(404, 'Not found', 'User not found');

      const tech = await this.techQuerierId.execute(techId);
      if (!tech) throw new HTTPError(404, 'Not found', 'Tech not found');

      user.techsInProgress = user.techsInProgress.filter(
        (tech) => tech !== techId
      );

      tech.usersInProgress = tech.usersInProgress.filter(
        (tech) => tech !== userId
      );

      await this.techUpdater.execute(tech);

      const updatedUser = await this.aikidoUserUpdater.execute(user);
      res.status(202);
      res.json({
        results: [updatedUser],
      });
    } catch (error) {
      next(error);
    }
  }
}
