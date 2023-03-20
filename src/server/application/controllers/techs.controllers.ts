/* eslint-disable no-unused-vars */
import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';

import TechCreator from '../../../techniques/application/techs.creator.js';
import TechEraser from '../../../techniques/application/techs.eraser.js';
import TechQuerierId from '../../../techniques/application/techs.querier.id.js';
import TechQuerier from '../../../techniques/application/techs.querier.js';
import TechSearcher from '../../../techniques/application/techs.searcher.js';
import TechUpdater from '../../../techniques/application/techs.updater.js';

const debug = createDebug('AiJo:TechsController');

export class TechsController {
  // eslint-disable-next-line max-params
  constructor(
    private techSearcher: TechSearcher,
    private techQuerier: TechQuerier,
    private techQuerierId: TechQuerierId,
    private techCreator: TechCreator,
    private techUpdater: TechUpdater,
    private techEraser: TechEraser
  ) {
    debug('Techs controller instantiated...');
  }

  async create(req: Request, res: Response, _next: NextFunction) {
    const newTech = await this.techCreator.execute(req.body);
    debug('Tech added! =)');
    res.status(201);
    res.json({ results: [newTech] });
  }

  async queryById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const tech = await this.techQuerierId.execute(id);
    debug('Tech found! =)');
    res.status(200);
    res.json({ results: [tech] });
  }
}
