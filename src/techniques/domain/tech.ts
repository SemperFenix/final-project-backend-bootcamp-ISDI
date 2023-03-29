/* eslint-disable no-unused-vars */
/* eslint-disable max-params */
import { AikidoUser, Grades } from '../../aikido.users/domain/aikido.user.js';
import createDebug from 'debug';

const debug = createDebug('AiJo:TechClass');
export type Attack =
  | 'Katate-dori'
  | 'Ai hanmi katate-dori'
  | 'Ryote-dori'
  | 'Morote-dori'
  | 'Mune-dori'
  | 'Ryomune-dori'
  | 'Kata-dori'
  | 'Ryo kata-dori'
  | 'Kao-tsuki'
  | 'Jodan-tsuki'
  | 'Chudan-tsuki'
  | 'Mawasi-tsuki'
  | 'Men-Uchi'
  | 'Shomen-uchi'
  | 'Yokomen-uchi'
  | 'Ushiro tekubi-dori'
  | 'Ushiro kubishime'
  | 'Ushiro ryokata-dori'
  | 'Mae-geri'
  | 'Yoko-geri'
  | 'Mawashi-geri'
  | 'Katate ryote-dori'
  | 'Muna-dori'
  | 'Kata-dori menuchi'
  | 'Eridori';

export type Technique =
  | 'Ikkyo'
  | 'Nikkyo'
  | 'Sankyo'
  | 'Gokyo'
  | 'Yonkyo'
  | 'Rokkyo'
  | 'Irimi-nage'
  | 'Juji-nage'
  | 'Kaiten-nage'
  | 'Kokyu-nage'
  | 'Koshi-nage'
  | 'Shiho-nage'
  | 'Tenchi-nage'
  | 'Ude kime-nage'
  | 'Kote-hineri'
  | 'Kote-gaeshi'
  | 'Hiji-garami'
  | 'Sumi-otoshi'
  | 'Uchi kaiten-nage'
  | 'Uchi kaiten-sankyo'
  | 'Hiji kime-osae'
  | 'Kokyu-ho'
  | 'Soto kaiten-nage'
  | 'Jiyu-waza'
  | 'Ushiro kiri-otoshi';

export type Stand =
  | 'Tachi-waza'
  | 'Suwari-waza'
  | 'Hanmi handachi-waza'
  | 'Ushiro-waza';

export class ProtoTech {
  constructor(
    public attack: Attack,
    public tech: Technique,
    public stand: Stand,
    public grade: Grades,
    public video?: string
  ) {
    debug('Proto Tech instantiated');
  }
}

export type PopulatedTech = {
  id: string;
  attack: Attack;
  tech: Technique;
  stand: Stand;
  grade: Grades;
  usersLearnt: AikidoUser[];
  usersInProgress: AikidoUser[];
  usersToLearn: AikidoUser[];
  video?: string;
};

export class Tech extends ProtoTech {
  constructor(
    public id: string,
    public attack: Attack,
    public tech: Technique,
    public stand: Stand,
    public grade: Grades,
    public usersLearnt: AikidoUser['id'][],
    public usersInProgress: AikidoUser['id'][],
    public usersToLearn: AikidoUser['id'][],
    public video?: string
  ) {
    super(attack, tech, stand, grade, video);
    debug('Tech instantiated');
  }
}
