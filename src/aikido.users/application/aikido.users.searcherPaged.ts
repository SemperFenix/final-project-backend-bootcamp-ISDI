/* eslint-disable no-unused-vars */
import { AikidoUser } from '../domain/aikido.user.js';
import AikidoUserRepo from '../domain/aikido.user.repo.js';
import createDebug from 'debug';

const debug = createDebug('AiJo:AiUsUC_SearcherPaged');

export default class AikidoUserSearcherPaged {
  constructor(private repo: AikidoUserRepo) {
    debug('AikidoUserSearcherPaged instantiated');
  }

  async execute(
    queries: { key: string; value: unknown }[],
    page: number
  ): Promise<{ members: AikidoUser[]; number: Number }> {
    const result = await this.repo.searchPaged(queries, page);
    return result;
  }
}
