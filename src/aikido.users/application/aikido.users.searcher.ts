/* eslint-disable no-unused-vars */
import { AikidoUser } from '../domain/aikido.user';
import AikidoUserRepo from '../domain/aikido.user.repo';
import createDebug from 'debug';

const debug = createDebug('AiJo:UC_Searcher');

export default class AikidoUserSearcher {
  constructor(private repo: AikidoUserRepo) {
    debug('AikidoUserSearcher instantiated');
  }

  async execute(
    queries: { key: string; value: unknown }[]
  ): Promise<AikidoUser[]> {
    const result = await this.repo.search(queries);
    return result;
  }
}
