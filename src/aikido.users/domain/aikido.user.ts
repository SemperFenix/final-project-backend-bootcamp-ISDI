/* eslint-disable no-unused-vars */
/* eslint-disable max-params */

import { Tech } from '../../techniques/domain/tech.js';
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

export class ProtoAikidoUser {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public lastName: string,
    public grade: Grades,
    public mainUke: AikidoUser['id'][],
    public avatar?: string,
    public age?: number,
    public timePracticing?: string,
    public principalSensei?: AikidoUser['id']
  ) {
    debug('Aikido User instantiated');
  }
}

export type PopulatedAikidoUser = {
  email: string;
  password: string;
  name: string;
  lastName: string;
  grade: Grades;
  techsLearnt: Tech[];
  techsInProgress: Tech[];
  role: 'user' | 'sensei';
  techToReview: string; // Esta propiedad está añadida por si me da tiempo a aumentar funcionalidades
  id: string;
  mainUke: AikidoUser;
  avatar?: string;
  age?: number;
  timePracticing?: string;
  principalSensei?: AikidoUser;
};

export class AikidoUser extends ProtoAikidoUser {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public lastName: string,
    public grade: Grades,
    public techsLearnt: Tech['id'][],
    public techsInProgress: Tech['id'][],
    public role: 'user' | 'sensei',
    public techToReview: string, // Esta propiedad está añadida por si me da tiempo a aumentar funcionalidades
    public id: string,
    public mainUke: AikidoUser['id'][],
    public avatar?: string,
    public age?: number,
    public timePracticing?: string,
    public principalSensei?: AikidoUser['id']
  ) {
    super(
      email,
      password,
      name,
      lastName,
      grade,
      mainUke,
      avatar,
      age,
      timePracticing,
      principalSensei
    );
    debug('Aikido Repo User instantiated');
  }
}
