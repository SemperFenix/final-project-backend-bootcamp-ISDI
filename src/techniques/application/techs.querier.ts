/* eslint-disable no-unused-vars */

import createDebug from 'debug';
import { Tech } from '../domain/tech';
import TechRepo from '../domain/tech.repo';

const debug = createDebug('AiJo:TechUC_Querier');

export default class TechQuerier {
  constructor(private repo: TechRepo) {
    debug('TechQuerier instantiated');
  }

  async execute(): Promise<Tech[]> {
    const result = await this.repo.query();
    return result;
  }
}
