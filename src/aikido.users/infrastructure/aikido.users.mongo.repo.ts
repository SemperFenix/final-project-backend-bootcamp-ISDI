import AikidoUserRepo from '../domain/aikido.user.repo.js';
import createDebug from 'debug';
import { AikidoUser, ProtoAikidoUser } from '../domain/aikido.user.js';
import { HTTPError } from '../../common/errors/http.error.js';
import { AikidoUserModel } from '../../server/infrastructure/mongoose/aikido.user.model.js';

const debug = createDebug('AiJo:AiUsMongoRepo');

export default class AikidoUserMongoRepo implements AikidoUserRepo {
  constructor() {
    debug('Aikido User Repo instantiated...');
  }

  async query(): Promise<AikidoUser[]> {
    const aikidoUsers = await AikidoUserModel.find()
      .populate('techsLearnt')
      .populate('techsInProgress')
      .populate('principalSensei')
      .populate('mainUke')
      .exec();
    debug('Users found!');
    return aikidoUsers;
  }

  async unpopulatedQueryById(id: string): Promise<AikidoUser> {
    const unpopulatedUser = await AikidoUserModel.findById(id).exec();

    if (!unpopulatedUser)
      throw new HTTPError(404, 'Not found', 'User Id not found in DB');
    debug('User found!');

    return unpopulatedUser;
  }

  async queryById(id: string): Promise<AikidoUser> {
    const aikidoUser = await AikidoUserModel.findById(id)
      .populate('techsLearnt')
      .populate('techsInProgress')
      .populate('principalSensei')
      .populate('mainUke')
      .exec();
    if (!aikidoUser)
      throw new HTTPError(404, 'Not found', 'User Id not found in DB');
    debug('User found!');

    return aikidoUser;
  }

  async search(
    queries: { key: string; value: unknown }[]
  ): Promise<AikidoUser[]> {
    const protoQuery = queries.map((item) => ({ [item.key]: item.value }));
    const myQueries = protoQuery.reduce((obj, item) => ({ ...obj, ...item }));
    const members = await AikidoUserModel.find({ ...myQueries })
      .populate('techsLearnt')
      .populate('techsInProgress')
      .populate('principalSensei')
      .populate('mainUke')
      .exec();

    debug('Search completed! =)');
    return members;
  }

  async searchPaged(
    queries: { key: string; value: unknown }[],
    page: string
  ): Promise<{ members: AikidoUser[]; number: number }> {
    if (Number(page) < 1) page = '1';
    const limit = 3;
    const skipNumber = page === '1' ? 0 : (Number(page) - 1) * limit;
    const protoQuery = queries.map((item) => ({ [item.key]: item.value }));
    const myQueries = protoQuery.reduce((obj, item) => ({ ...obj, ...item }));
    const number = await AikidoUserModel.find({ ...myQueries })
      .count()
      .exec();

    const members = await AikidoUserModel.find({ ...myQueries })
      .skip(number <= limit ? 0 : skipNumber)
      .limit(limit)
      .populate('techsLearnt')
      .populate('techsInProgress')
      .populate('principalSensei')
      .populate('mainUke')
      .exec();

    debug('Search completed! =)');
    return { members, number };
  }

  async create(entity: ProtoAikidoUser): Promise<AikidoUser> {
    const newAikidoUser = await AikidoUserModel.create(entity);
    debug('Hey, you! ;)');
    return newAikidoUser;
  }

  async update(entity: Partial<AikidoUser>): Promise<AikidoUser> {
    const updatedAikidoUser = await AikidoUserModel.findByIdAndUpdate(
      entity.id,
      entity,
      { new: true }
    )
      .populate('techsLearnt')
      .populate('techsInProgress')
      .populate('principalSensei')
      .populate('mainUke')
      .exec();
    if (!updatedAikidoUser)
      throw new HTTPError(
        404,
        'Not found',
        'Update not possible: id not found'
      );
    debug('Member updated!');
    return updatedAikidoUser;
  }

  async erase(id: string): Promise<void> {
    const erasedAikidoUser = await AikidoUserModel.findByIdAndDelete(id).exec();
    if (!erasedAikidoUser)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: id not found'
      );
    debug('Bye bye =(');
  }
}
