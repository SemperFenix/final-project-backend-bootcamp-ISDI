/* eslint-disable max-params */
/* eslint-disable no-useless-constructor */
import AikidoUser, { Grades } from '../../students/domain/aikido.user';

export default class Tech {
  constructor(
    public _attack: string,
    public _tech: string,
    public _stand: string,
    public _grade: Grades,
    public _usersLearnt: AikidoUser[],
    public _usersInProgress: AikidoUser[],
    public _usersToLearn: AikidoUser[],
    public _video?: string
  ) {}
}
