/* eslint-disable no-unused-vars */
/* eslint-disable max-params */
import { AikidoUser, Grades } from '../../students/domain/aikido.user.js';
import createDebug from 'debug';

const debug = createDebug('AiJo:TechClass');

export class ProtoTech {
  constructor(
    public attack: string,
    public tech: string,
    public stand: string,
    public grade: Grades,
    public video?: string
  ) {
    debug('Proto Tech instantiated');
  }
}

export class Tech extends ProtoTech {
  constructor(
    public id: string,
    public attack: string,
    public tech: string,
    public stand: string,
    public grade: Grades,
    public usersLearnt: AikidoUser[],
    public usersInProgress: AikidoUser[],
    public usersToLearn: AikidoUser[],
    public video?: string
  ) {
    super(attack, tech, stand, grade, video);
    debug('Tech instantiated');
  }
}
