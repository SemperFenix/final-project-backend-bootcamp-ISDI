/* eslint-disable no-unused-vars */
import { AikidoUser } from '../domain/aikido.user';
import AikidoUserRepo from '../domain/aikido.user.repo';
import createDebug from 'debug';

const debug = createDebug('AiJo:UC_Creator');

export default class AikidoUserCreator {
  constructor(private repo: AikidoUserRepo) {
    debug('AikidoUserCreator instantiated');
  }

  async execute(entity: AikidoUser): Promise<AikidoUser> {
    const result = await this.repo.create(entity);
    return result;
  }
}
