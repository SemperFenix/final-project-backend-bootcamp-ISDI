import { Router, Router as router } from 'express';
import { AikidoUsersController } from '../../application/controllers/aikido.users.controllers.js';
import { Interceptors } from '../middleware/interceptors.middleware.js';
import ServerRouter from '../server.router.js';

export default class AikidoUserRouter implements ServerRouter {
  path: string = '/aikido-users';
  router: Router = router();

  // eslint-disable-next-line no-unused-vars
  constructor(private aikidoUsersControllers: AikidoUsersController) {
    this.registerControllers();
  }

  registerControllers(): void {
    this.router.post(
      '/register',
      this.aikidoUsersControllers.register.bind(this.aikidoUsersControllers)
    );

    this.router.post(
      '/login',
      this.aikidoUsersControllers.login.bind(this.aikidoUsersControllers)
    );
    this.router.get(
      '/members',
      Interceptors.logged,
      this.aikidoUsersControllers.getCategorized.bind(
        this.aikidoUsersControllers
      )
    );
  }
}
