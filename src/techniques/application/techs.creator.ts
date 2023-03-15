/* eslint-disable no-unused-vars */

import createDebug from 'debug';
import { Tech } from '../domain/tech';
import TechRepo from '../domain/tech.repo';

const debug = createDebug('AiJo:TechUC_Creator');

export default class TechCreator {
  constructor(private repo: TechRepo) {
    debug('TechCreator instantiated');
  }

  async execute(entity: Tech): Promise<Tech> {
    const result = await this.repo.create(entity);
    return result;
  }
}
