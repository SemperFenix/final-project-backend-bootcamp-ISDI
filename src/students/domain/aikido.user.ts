/* eslint-disable no-unused-vars */
/* eslint-disable max-params */

import Tech from '../../techniques/domain/tech';
import createDebug from 'debug';

const debug = createDebug('AiJo:AiUsClass');

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
    public email: string,
    public password: string,
    public name: string,
    public lastName: string,
    public grade: Grades,
    public techsLearnt: Tech[],
    public techsInProgress: Tech[],
    public role: 'user' | 'sensei',
    public techToReview: string, // Esta propiedad está añadida por si me da tiempo a aumentar funcionalidades
    public id?: string,
    public avatar?: string,
    public age?: number,
    public timePracticing?: string,
    public principalSensei?: AikidoUser,
    public mainUke?: AikidoUser
  ) {
    debug('Aikido User instantiated');
  }
}
