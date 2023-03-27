/* eslint-disable no-unused-vars */
import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../../../common/errors/http.error.js';

import TechCreator from '../../../techniques/application/techs.creator.js';
import TechEraser from '../../../techniques/application/techs.eraser.js';
import TechQuerierId from '../../../techniques/application/techs.querier.id.js';
import TechQuerier from '../../../techniques/application/techs.querier.js';
import TechSearcher from '../../../techniques/application/techs.searcher.js';
import TechSearcherPaged from '../../../techniques/application/techs.searcher.paged.js';
import TechUpdater from '../../../techniques/application/techs.updater.js';
import { CustomRequest } from '../../infrastructure/middleware/interceptors.middleware.js';

const debug = createDebug('AiJo:TechsController');

export class TechsController {
  // eslint-disable-next-line max-params
  constructor(
    private techSearcher: TechSearcher,
    private techQuerier: TechQuerier,
    private techQuerierId: TechQuerierId,
    private techCreator: TechCreator,
    private techUpdater: TechUpdater,
    private techEraser: TechEraser,
    private techSearcherPaged: TechSearcherPaged
  ) {
    debug('Techs controller instantiated...');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { tech } = req.body;
      if (!tech)
        throw new HTTPError(406, 'No data provided', 'No data provided');
      tech.usersLearnt = [];
      tech.usersInProgress = [];
      tech.usersToLearn = [];

      const newTech = await this.techCreator.execute(tech);

      debug('Tech added! =)');
      res.status(201);
      res.json({ results: [newTech] });
    } catch (error) {
      next(error);
    }
  }

  async queryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new HTTPError(400, 'Bad request', 'No user provided');

      const tech = await this.techQuerierId.execute(id);
      debug('Tech found! =)');
      res.status(200);
      res.json({ results: [tech] });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) throw new HTTPError(406, 'No data provided', 'No data provided');

      const updatedTech = await this.techUpdater.execute(req.body.tech);
      if (!updatedTech) throw new HTTPError(404, 'Not found', 'Tech not found');

      debug('Tech updated! =)');
      res.status(202);
      res.json({ results: [updatedTech] });
    } catch (error) {
      next(error);
    }
  }

  async queryAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tech = req.params.id;
      if (!tech) throw new HTTPError(400, 'Bad request', 'No tech provided');
      const { page } = req.query;

      if (!page) throw new HTTPError(400, 'Bad request', 'No page provided');

      const techs = await this.techSearcherPaged.execute(
        [{ key: 'tech', value: tech }],
        page as string
      );
      debug('Tech found! =)');
      res.status(200);
      res.json({ results: [techs] });
    } catch (error) {
      next(error);
    }
  }

  async queryCategorized(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      debug(req.query);

      const keys = Object.entries(req.query);
      const query = keys.map((item) => ({ key: item[0], value: item[1] }));

      const techs = await this.techSearcher.execute(query);
      debug('Techs found! =)');
      res.status(200);
      res.json({ results: [techs] });
    } catch (error) {
      next(error);
    }
  }
}
