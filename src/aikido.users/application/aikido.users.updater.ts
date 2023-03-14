/* eslint-disable no-unused-vars */
import { AikidoUser } from '../domain/aikido.user';
import AikidoUserRepo from '../domain/aikido.user.repo';
import createDebug from 'debug';

const debug = createDebug('AiJo:UC_Updater');

export default class AikidoUserUpdater {
  constructor(private repo: AikidoUserRepo) {
    debug('AikidoUserUpdater instantiated');
  }

  async execute(entity: Partial<AikidoUser>): Promise<AikidoUser> {
    const result = await this.repo.update(entity);
    return result;
  }
}
