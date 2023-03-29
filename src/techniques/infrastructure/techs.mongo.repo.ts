import createDebug from 'debug';
import { HTTPError } from '../../common/errors/http.error.js';
import { TechModel } from '../../server/infrastructure/mongoose/tech.model.js';
import { ProtoTech, Tech } from '../domain/tech.js';
import TechRepo from '../domain/tech.repo.js';

const debug = createDebug('AiJo:AiUsMongoRepo');

export default class TechMongoRepo implements TechRepo {
  constructor() {
    debug('Aikido User Repo instantiated...');
  }

  async query(): Promise<Tech[]> {
    const techs = await TechModel.find()
      .populate('usersLearnt')
      .populate('usersInProgress')
      .populate('usersToLearn')
      .exec();
    debug('Techs found!');
    return techs;
  }

  async unpopulatedQueryById(id: string): Promise<Tech> {
    const tech = await TechModel.findById(id).exec();
    if (!tech) throw new HTTPError(404, 'Not found', 'User Id not found in DB');
    debug('Tech found!');

    return tech;
  }

  async queryById(id: string): Promise<Tech> {
    const tech = await TechModel.findById(id)
      .populate('usersLearnt')
      .populate('usersInProgress')
      .populate('usersToLearn')
      .exec();
    if (!tech) throw new HTTPError(404, 'Not found', 'User Id not found in DB');
    debug('Tech found!');

    return tech;
  }

  async search(queries: { key: string; value: unknown }[]): Promise<Tech[]> {
    const protoQuery = queries.map((item) => ({ [item.key]: item.value }));
    const myQueries = protoQuery.reduce((obj, item) => ({ ...obj, ...item }));
    const techs = await TechModel.find({ ...myQueries })
      .populate('usersLearnt')
      .populate('usersInProgress')
      .populate('usersToLearn')
      .exec();

    debug('Search completed! =)');
    return techs;
  }

  async searchPaged(
    queries: { key: string; value: unknown }[],
    page: string
  ): Promise<{ techs: Tech[]; number: number }> {
    if (Number(page) < 1) page = '1';
    const limit = 3;
    const skipNumber = page === '1' ? 0 : (Number(page) - 1) * limit;
    const protoQuery = queries.map((item) => ({ [item.key]: item.value }));
    const myQueries = protoQuery.reduce((obj, item) => ({ ...obj, ...item }));
    const number = await TechModel.find({ ...myQueries })
      .count()
      .exec();

    const techs = await TechModel.find({ ...myQueries })
      .skip(number <= limit ? 0 : skipNumber)
      .limit(limit)
      .populate('usersLearnt')
      .populate('usersInProgress')
      .populate('usersToLearn')
      .exec();

    debug('Search completed! =)');
    return { techs, number };
  }

  async create(entity: ProtoTech): Promise<Tech> {
    const newTech = await TechModel.create(entity);
    debug('Hey, nice tech! ;)');
    return newTech;
  }

  async update(entity: Partial<Tech>): Promise<Tech> {
    const updatedTech = await TechModel.findByIdAndUpdate(entity.id, entity, {
      new: true,
    }).exec();
    if (!updatedTech)
      throw new HTTPError(
        404,
        'Not found',
        'Update not possible: id not found'
      );
    debug('Tech updated!');
    return updatedTech;
  }

  async erase(id: string): Promise<void> {
    const erasedTech = await TechModel.findByIdAndDelete(id).exec();
    if (!erasedTech)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: id not found'
      );
    debug('Was not good enough =(');
  }
}
