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
      '/users/list/:id?:id',
      Interceptors.logged,
      this.aikidoUsersControllers.getUsersCategorized.bind(
        this.aikidoUsersControllers
      )
    );

    this.router.get(
      '/users/:id',
      Interceptors.logged,
      this.aikidoUsersControllers.getUserById.bind(this.aikidoUsersControllers)
    );

    this.router.patch(
      '/update/:id',
      Interceptors.logged,
      Interceptors.authorized,
      this.aikidoUsersControllers.updateSelfUser.bind(
        this.aikidoUsersControllers
      )
    );

    this.router.patch(
      '/update/admin/:id',
      Interceptors.logged,
      Interceptors.admin,
      this.aikidoUsersControllers.updateAdmin.bind(this.aikidoUsersControllers)
    );

    this.router.delete(
      '/delete/:id',
      Interceptors.logged,
      Interceptors.authorized,
      this.aikidoUsersControllers.deleteUser.bind(this.aikidoUsersControllers)
    );

    this.router.patch(
      '/add-uke/:id',
      Interceptors.logged,
      Interceptors.authorized,
      this.aikidoUsersControllers.addUke.bind(this.aikidoUsersControllers)
    );

    this.router.patch(
      '/remove-uke/:id',
      Interceptors.logged,
      Interceptors.authorized,
      this.aikidoUsersControllers.removeUke.bind(this.aikidoUsersControllers)
    );

    this.router.patch(
      '/add-tech/:id',
      Interceptors.logged,
      Interceptors.authorized,
      this.aikidoUsersControllers.addTech.bind(this.aikidoUsersControllers)
    );

    this.router.patch(
      '/remove-tech/:id',
      Interceptors.logged,
      Interceptors.authorized,
      this.aikidoUsersControllers.removeTech.bind(this.aikidoUsersControllers)
    );
  }
}
