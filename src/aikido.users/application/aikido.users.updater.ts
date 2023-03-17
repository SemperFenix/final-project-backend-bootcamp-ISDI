/* eslint-disable no-unused-vars */
import { AikidoUser } from '../domain/aikido.user.js';
import AikidoUserRepo from '../domain/aikido.user.repo.js';
import createDebug from 'debug';

const debug = createDebug('AiJo:AiUsUC_Updater');

export default class AikidoUserUpdater {
  constructor(private repo: AikidoUserRepo) {
    debug('AikidoUserUpdater instantiated');
  }

  async execute(entity: Partial<AikidoUser>): Promise<AikidoUser> {
    const result = await this.repo.update(entity);
    return result;
  }
}
