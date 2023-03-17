import { Router, Router as router } from 'express';
import { DefaultController } from '../../application/controllers/default.controller.js';
import ServerRouter from '../server.router.js';

export default class DefaultRouter implements ServerRouter {
  path: string = '';
  router: Router = router();

  // eslint-disable-next-line no-unused-vars
  constructor(private defaultControllers: DefaultController) {
    this.registerControllers();
  }

  registerControllers(): void {
    this.router.get(
      '/',
      this.defaultControllers.default.bind(this.defaultControllers)
    );
  }
}
