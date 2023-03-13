import AikidoUserRepo from '../domain/aikido.user.repository';
import createDebug from 'debug';
import AikidoUser from '../domain/aikido.user';
import { AikidoUserModel } from '../../mongoose/infrastructure/aikido.user.model';
import { HTTPError } from '../../errors/http.error';

const debug = createDebug('AiJo:AiUsMongoRepo');

export default class AikidoUserMongoRepository implements AikidoUserRepo {
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

  async create(entity: AikidoUser): Promise<void> {
    await AikidoUserModel.create(entity);
    debug('Hey, you! ;)');
  }

  async update(entity: Partial<AikidoUser>): Promise<void> {
    const updatedAikidoUser = await AikidoUserModel.findByIdAndUpdate(
      entity.id,
      entity,
      { new: true }
    ).exec();
    if (!updatedAikidoUser)
      throw new HTTPError(
        404,
        'Not found',
        'Update not possible: id not found'
      );
    debug('Member updated!');
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
