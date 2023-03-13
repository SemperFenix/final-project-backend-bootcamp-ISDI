/* eslint-disable no-unused-vars */
/* eslint-disable max-params */
import AikidoUser, { Grades } from '../../students/domain/aikido.user';
import createDebug from 'debug';

const debug = createDebug('AiJo:TechClass');

export default class Tech {
  constructor(
    public attack: string,
    public tech: string,
    public stand: string,
    public grade: Grades,
    public usersLearnt: AikidoUser[],
    public usersInProgress: AikidoUser[],
    public usersToLearn: AikidoUser[],
    public video?: string
  ) {
    debug('Tech instantiated');
  }
}
