import { Router, Router as router } from 'express';
import { TechsController } from '../../application/controllers/techs.controllers.js';
import { Interceptors } from '../middleware/interceptors.middleware.js';
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
      Interceptors.logged,
      Interceptors.admin,
      this.techsControllers.create.bind(this.techsControllers)
    );

    this.router.get(
      '/:id',
      Interceptors.logged,
      this.techsControllers.queryById.bind(this.techsControllers)
    );

    this.router.patch(
      '/update/:id',
      Interceptors.logged,
      Interceptors.admin,
      this.techsControllers.update.bind(this.techsControllers)
    );

    this.router.get(
      '/list/filter?:id',
      Interceptors.logged,
      this.techsControllers.queryCategorized.bind(this.techsControllers)
    );

    this.router.get(
      '/list/:id?:id',
      Interceptors.logged,
      this.techsControllers.queryAll.bind(this.techsControllers)
    );
  }
}
