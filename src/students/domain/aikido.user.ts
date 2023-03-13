/* eslint-disable max-params */
/* eslint-disable no-useless-constructor */

import Tech from '../../techniques/domain/techniques';

export type Grades =
  | '6º kyu'
  | '5º kyu'
  | '4º kyu'
  | '3º kyu'
  | '2º kyu'
  | '1º kyu'
  | '1º DAN'
  | '2º DAN'
  | '3º DAN'
  | '4º DAN'
  | '5º DAN'
  | '6º DAN'
  | '7º DAN';

export default class AikidoUser {
  constructor(
    public _email: string,
    public _password: string,
    public _name: string,
    public _lastName: string,
    public _avatar: string,
    public _grade: Grades,
    public _techsLearnt: Tech[],
    public _techsInProgress: Tech[],
    public _techsToLearn: Tech[],
    public _role: 'user' | 'sensei',
    public _techToReview: string,
    public _age?: number,
    public _timePracticing?: string,
    public _principalSensei?: AikidoUser,
    public _mainUke?: AikidoUser
  ) {}
}
