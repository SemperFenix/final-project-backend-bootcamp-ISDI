/* eslint-disable no-unused-vars */
import { AikidoUser } from '../domain/aikido.user';
import AikidoUserRepo from '../domain/aikido.user.repo';
import createDebug from 'debug';

const debug = createDebug('AiJo:UC_Querier');

export default class AikidoUserQuerier {
  constructor(private repo: AikidoUserRepo) {
    debug('AikidoUserQuerier instantiated');
  }

  async execute(): Promise<void> {
    await this.repo.query();
  }
}
