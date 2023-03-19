import { HTTPError } from '../../../common/errors/http.error.js';
import {
  mockAikidoUsersController,
  count,
  mockAikidoUserRepo,
  mockNext,
  mockNoEmailReq,
  mockNoPassReq,
  mockReq,
  mockRes,
  mockCustomReq,
  mockNoPageReq,
} from '../../../common/mocks/test.mocks.js';
import { Auth } from '../../../services/auth.js';

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
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{ name: 'TestOk' }],
        });
      });
    });

    describe('And there is no email in body', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.register(
          mockNoEmailReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(
          401,
          'Unathorized',
          'No email or pass provided'
        );

        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no password in body', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.register(
          mockNoPassReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(
          401,
          'Unathorized',
          'No email or pass provided'
        );
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the login method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        mockReq.body.password = count;
        (Auth.compareHash as jest.Mock).mockResolvedValueOnce(true);
        (mockAikidoUserRepo.search as jest.Mock).mockResolvedValueOnce([
          'Test',
        ]);
        (Auth.createToken as jest.Mock).mockReturnValue('TestToken');

        await mockAikidoUsersController.login(mockReq, mockRes, mockNext);
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{ token: 'TestToken' }],
        });
      });
    });

    describe('And there is no email in body', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.login(
          mockNoEmailReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(
          401,
          'Unauthorized',
          'Invalid email or password'
        );

        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no password in body', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.login(mockNoPassReq, mockRes, mockNext);
        const error = new HTTPError(
          401,
          'Unauthorized',
          'Invalid email or password'
        );
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
    describe('And there is no user with the id', () => {
      test('Then it should call next', async () => {
        (mockAikidoUserRepo.search as jest.Mock).mockResolvedValueOnce(
          undefined
        );
        const error = new HTTPError(
          401,
          'Unauthorized',
          'Invalid email or password'
        );
        await mockAikidoUsersController.login(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
    describe('And the password not matches', () => {
      test('Then it should call next', async () => {
        (Auth.compareHash as jest.Mock).mockResolvedValueOnce(false);
        (mockAikidoUserRepo.search as jest.Mock).mockResolvedValueOnce(['a']);
        const error = new HTTPError(401, 'Unauthorized', 'Password not match');

        await mockAikidoUsersController.login(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the getSenseisCategorized method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockAikidoUserRepo.searchPaged as jest.Mock).mockResolvedValueOnce({
          members: [{}],
          number: 0,
        });

        await mockAikidoUsersController.getSenseisCategorized(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{ users: [{}], number: 0 }],
        });
      });
    });

    describe('And there is no page in query', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.getSenseisCategorized(
          mockNoPageReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No page provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no password in body', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.getSenseisCategorized(
          mockNoPassReq,
          mockRes,
          mockNext
        );
        expect(mockNext).toHaveBeenCalled();
      });
    });
  });

  describe('When call the getStudentsCategorized method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockAikidoUserRepo.searchPaged as jest.Mock).mockResolvedValueOnce({
          members: [{}],
          number: 0,
        });

        await mockAikidoUsersController.getStudentsCategorized(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{ users: [{}], number: 0 }],
        });
      });
    });

    describe('And there is no page in query', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.getStudentsCategorized(
          mockNoPageReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No page provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no password in body', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.getStudentsCategorized(
          mockNoPassReq,
          mockRes,
          mockNext
        );
        expect(mockNext).toHaveBeenCalled();
      });
    });
  });
});
