/* eslint-disable no-unused-vars */

import createDebug from 'debug';
import { Tech } from '../domain/tech';
import TechRepo from '../domain/tech.repo';

const debug = createDebug('AiJo:AiUsUC_SearcherPaged');

export default class TechSearcherPaged {
  constructor(private repo: TechRepo) {
    debug('AikidoUserSearcherPaged instantiated');
  }

  async execute(
    queries: { key: string; value: unknown }[],
    page: string
  ): Promise<{ techs: Tech[]; number: number }> {
    const result = await this.repo.searchPaged(queries, page);
    return result;
  }
}
