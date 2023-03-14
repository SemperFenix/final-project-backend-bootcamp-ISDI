import { mockNext, mockReq, mockRes } from '../../../common/mocks/test.mocks';
import TechCreator from '../../../techniques/application/techs.creator';
import TechEraser from '../../../techniques/application/techs.eraser';
import TechQuerier from '../../../techniques/application/techs.querier';
import TechQuerierId from '../../../techniques/application/techs.querier.id';
import TechSearcher from '../../../techniques/application/techs.searcher';
import TechUpdater from '../../../techniques/application/techs.updater';
import TechMongoRepo from '../../../techniques/infrastructure/techs.mongo.repo';
import { TechsController } from './techs.controllers';

jest.mock('../../../../src/config.js', () => ({
  config: {
    secret: 'test',
  },
}));

jest.mock('../../../services/auth.js');

describe('Given the TechsController class', () => {
  const mockRepo: TechMongoRepo = {
    query: jest.fn(),
    queryById: jest.fn(),
    create: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
    erase: jest.fn(),
  };

  const mockSearcher = new TechSearcher(mockRepo);
  const mockQuerier = new TechQuerier(mockRepo);
  const mockQuerierId = new TechQuerierId(mockRepo);
  const mockCreator = new TechCreator(mockRepo);
  const mockUpdater = new TechUpdater(mockRepo);
  const mockEraser = new TechEraser(mockRepo);

  const controller = new TechsController(
    mockSearcher,
    mockQuerier,
    mockQuerierId,
    mockCreator,
    mockUpdater,
    mockEraser
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When call the register method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockRepo.create as jest.Mock).mockResolvedValueOnce({
          name: 'TestOk',
        });
        await controller.create(mockReq, mockRes, mockNext);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });
  });
});
