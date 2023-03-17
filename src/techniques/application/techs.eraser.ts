/* eslint-disable no-unused-vars */

import createDebug from 'debug';
import TechRepo from '../domain/tech.repo.js';

const debug = createDebug('AiJo:TechUC_Eraser');

export default class TechEraser {
  constructor(private repo: TechRepo) {
    debug('TechEraser instantiated');
  }

  async execute(id: string): Promise<void> {
    await this.repo.erase(id);
  }
}
