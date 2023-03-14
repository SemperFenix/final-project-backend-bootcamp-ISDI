import {
  mockNext,
  mockReq,
  mockRes,
  mockTechRepo,
} from '../../../common/mocks/test.mocks';
import TechCreator from '../../../techniques/application/techs.creator';
import TechEraser from '../../../techniques/application/techs.eraser';
import TechQuerier from '../../../techniques/application/techs.querier';
import TechQuerierId from '../../../techniques/application/techs.querier.id';
import TechSearcher from '../../../techniques/application/techs.searcher';
import TechUpdater from '../../../techniques/application/techs.updater';
import { TechsController } from './techs.controllers';

jest.mock('../../../../src/config.js', () => ({
  config: {
    secret: 'test',
  },
}));

jest.mock('../../../services/auth.js');

describe('Given the TechsController class', () => {
  const mockSearcher = new TechSearcher(mockTechRepo);
  const mockQuerier = new TechQuerier(mockTechRepo);
  const mockQuerierId = new TechQuerierId(mockTechRepo);
  const mockCreator = new TechCreator(mockTechRepo);
  const mockUpdater = new TechUpdater(mockTechRepo);
  const mockEraser = new TechEraser(mockTechRepo);

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
        (mockTechRepo.create as jest.Mock).mockResolvedValueOnce({
          name: 'TestOk',
        });
        await controller.create(mockReq, mockRes, mockNext);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });
  });
});
