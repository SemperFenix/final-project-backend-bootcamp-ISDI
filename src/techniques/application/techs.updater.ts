/* eslint-disable no-unused-vars */

import createDebug from 'debug';
import { Tech } from '../domain/tech.js';
import TechRepo from '../domain/tech.repo.js';

const debug = createDebug('AiJo:TechUC_Updater');

export default class TechUpdater {
  constructor(private repo: TechRepo) {
    debug('TechUpdater instantiated');
  }

  async execute(entity: Partial<Tech>): Promise<Tech> {
    const result = await this.repo.update(entity);
    return result;
  }
}
