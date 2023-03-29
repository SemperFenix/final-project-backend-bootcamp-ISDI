/* eslint-disable no-unused-vars */
import { AikidoUser } from '../domain/aikido.user.js';
import AikidoUserRepo from '../domain/aikido.user.repo.js';
import createDebug from 'debug';

const debug = createDebug('AiJo:AiUsUC_QuerierId');

export default class AikidoUserUnpopulatedQuerierId {
  constructor(private repo: AikidoUserRepo) {
    debug('AikidoUserQuerierId instantiated');
  }

  async execute(id: string): Promise<AikidoUser> {
    const result = await this.repo.unpopulatedQueryById(id);
    return result;
  }
}
