import AikidoUserCreator from '../../../aikido.users/application/aikido.users.creator';
import AikidoUserEraser from '../../../aikido.users/application/aikido.users.eraser';
import AikidoUserQuerier from '../../../aikido.users/application/aikido.users.querier';
import AikidoUserQuerierId from '../../../aikido.users/application/aikido.users.querier.id';
import AikidoUserSearcher from '../../../aikido.users/application/aikido.users.searcher';
import AikidoUserUpdater from '../../../aikido.users/application/aikido.users.updater';
import AikidoUserMongoRepo from '../../../aikido.users/infrastructure/aikido.users.mongo.repo';
import {
  mockNext,
  mockNoEmailReq,
  mockNoPassReq,
  mockReq,
  mockRes,
} from '../../../common/mocks/test.mocks';
import { Auth } from '../../../services/auth';

import { AikidoUsersController } from './aikido.users.controllers';

jest.mock('../../../../src/config.js', () => ({
  config: {
    secret: 'test',
  },
}));

jest.mock('../../../services/auth.js');

describe('Given the AikidoUsersController class', () => {
  const mockRepo: AikidoUserMongoRepo = {
    query: jest.fn(),
    queryById: jest.fn(),
    create: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
    erase: jest.fn(),
  };

  const mockSearcher = new AikidoUserSearcher(mockRepo);
  const mockQuerier = new AikidoUserQuerier(mockRepo);
  const mockQuerierId = new AikidoUserQuerierId(mockRepo);
  const mockCreator = new AikidoUserCreator(mockRepo);
  const mockUpdater = new AikidoUserUpdater(mockRepo);
  const mockEraser = new AikidoUserEraser(mockRepo);
  const count = 'TestPass';

  const controller = new AikidoUsersController(
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
        await controller.register(mockReq, mockRes, mockNext);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    describe('And there is no email in body', () => {
      test('Then it should call next', async () => {
        await controller.register(mockNoEmailReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });
    });

    describe('And there is no password in body', () => {
      test('Then it should call next', async () => {
        await controller.register(mockNoPassReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });
    });
  });

  describe('When call the login method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        mockReq.body.password = count;
        (Auth.compareHash as jest.Mock).mockResolvedValueOnce(true);
        (mockRepo.search as jest.Mock).mockResolvedValueOnce(['a']);
        await controller.login(mockReq, mockRes, mockNext);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    describe('And there is no email in body', () => {
      test('Then it should call next', async () => {
        await controller.login(mockNoEmailReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });
    });

    describe('And there is no password in body', () => {
      test('Then it should call next', async () => {
        await controller.login(mockNoPassReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });
    });
    describe('And there is no user with the id', () => {
      test('Then it should call next', async () => {
        (mockRepo.search as jest.Mock).mockResolvedValueOnce(undefined);

        await controller.login(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });
    });
    describe('And the password not matches', () => {
      test('Then it should call next', async () => {
        (Auth.compareHash as jest.Mock).mockResolvedValueOnce(false);
        (mockRepo.search as jest.Mock).mockResolvedValueOnce(['a']);
        await controller.login(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });
    });
  });
});
