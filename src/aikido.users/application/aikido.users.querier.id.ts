/* eslint-disable no-unused-vars */
import { AikidoUser } from '../domain/aikido.user';
import AikidoUserRepo from '../domain/aikido.user.repo';
import createDebug from 'debug';

const debug = createDebug('AiJo:UC_QuerierId');

export default class AikidoUserQuerierId {
  constructor(private repo: AikidoUserRepo) {
    debug('AikidoUserQuerierId instantiated');
  }

  async execute(id: string): Promise<void> {
    await this.repo.queryById(id);
  }
}
