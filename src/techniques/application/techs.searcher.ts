/* eslint-disable no-unused-vars */

import createDebug from 'debug';
import { Tech } from '../domain/tech';
import TechRepo from '../domain/tech.repo';

const debug = createDebug('AiJo:TechUC_Searcher');

export default class TechSearcher {
  constructor(private repo: TechRepo) {
    debug('TechSearcher instantiated');
  }

  async execute(queries: { key: string; value: unknown }[]): Promise<Tech[]> {
    const result = await this.repo.search(queries);
    return result;
  }
}
