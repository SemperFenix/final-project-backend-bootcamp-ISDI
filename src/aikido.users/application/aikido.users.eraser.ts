/* eslint-disable no-unused-vars */
import { AikidoUser } from '../domain/aikido.user';
import AikidoUserRepo from '../domain/aikido.user.repo';
import createDebug from 'debug';

const debug = createDebug('AiJo:AiUsUC_Eraser');

export default class AikidoUserEraser {
  constructor(private repo: AikidoUserRepo) {
    debug('AikidoUserEraser instantiated');
  }

  async execute(id: string): Promise<void> {
    await this.repo.erase(id);
  }
}
