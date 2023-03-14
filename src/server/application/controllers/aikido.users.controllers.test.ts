import {
  mockAikidoUsersController,
  count,
  mockAikidoUserRepo,
  mockNext,
  mockNoEmailReq,
  mockNoPassReq,
  mockReq,
  mockRes,
} from '../../../common/mocks/test.mocks';
import { Auth } from '../../../services/auth';

jest.mock('../../../../src/config.js', () => ({
  config: {
    secret: 'test',
  },
}));

jest.mock('../../../services/auth.js');

describe('Given the AikidoUsersController class', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When call the register method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockAikidoUserRepo.create as jest.Mock).mockResolvedValueOnce({
          name: 'TestOk',
        });
        await mockAikidoUsersController.register(mockReq, mockRes, mockNext);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    describe('And there is no email in body', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.register(
          mockNoEmailReq,
          mockRes,
          mockNext
        );
        expect(mockNext).toHaveBeenCalled();
      });
    });

    describe('And there is no password in body', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.register(
          mockNoPassReq,
          mockRes,
          mockNext
        );
        expect(mockNext).toHaveBeenCalled();
      });
    });
  });

  describe('When call the login method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        mockReq.body.password = count;
        (Auth.compareHash as jest.Mock).mockResolvedValueOnce(true);
        (mockAikidoUserRepo.search as jest.Mock).mockResolvedValueOnce(['a']);
        await mockAikidoUsersController.login(mockReq, mockRes, mockNext);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    describe('And there is no email in body', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.login(
          mockNoEmailReq,
          mockRes,
          mockNext
        );
        expect(mockNext).toHaveBeenCalled();
      });
    });

    describe('And there is no password in body', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.login(mockNoPassReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });
    });
    describe('And there is no user with the id', () => {
      test('Then it should call next', async () => {
        (mockAikidoUserRepo.search as jest.Mock).mockResolvedValueOnce(
          undefined
        );

        await mockAikidoUsersController.login(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });
    });
    describe('And the password not matches', () => {
      test('Then it should call next', async () => {
        (Auth.compareHash as jest.Mock).mockResolvedValueOnce(false);
        (mockAikidoUserRepo.search as jest.Mock).mockResolvedValueOnce(['a']);
        await mockAikidoUsersController.login(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
      });
    });
  });
});
