import { Router, Router as router } from 'express';
import { TechsController } from '../../application/controllers/techs.controllers.js';
import ServerRouter from '../server.router.js';

export default class TechRouter implements ServerRouter {
  path: string = '/techniques';
  router: Router = router();

  // eslint-disable-next-line no-unused-vars
  constructor(private techsControllers: TechsController) {
    this.registerControllers();
  }

  registerControllers(): void {
    this.router.post(
      '/add',
      this.techsControllers.create.bind(this.techsControllers)
    );
  }
}
