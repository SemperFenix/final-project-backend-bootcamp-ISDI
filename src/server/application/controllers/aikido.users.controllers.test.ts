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
  mockNoParamsReq,
  mockUserReq,
  mockUserNoPageReq,
  mockSenseiReq,
  mockAikidoUser,
  mockNoBodyIdReq,
  mockAikidoUserWithUke,
  mockTechRepo,
  mockTech,
  mockNoBodyReq,
  mockUnpopulatedAikidoUser,
  mockUnpopulatedTech,
} from '../../../common/mocks/test.mocks.js';
import { Auth } from '../../../services/auth.js';

jest.mock('../../../../src/config.js', () => ({
  config: {
    secret: 'test',
  },
}));

jest.mock('../../../services/auth.js');
const arrangeTechs = () => {
  (mockAikidoUserRepo.unpopulatedQueryById as jest.Mock).mockResolvedValueOnce(
    mockUnpopulatedAikidoUser
  );
  (mockAikidoUserRepo.queryById as jest.Mock).mockResolvedValueOnce(
    mockAikidoUser
  );
  (mockTechRepo.queryById as jest.Mock).mockResolvedValueOnce(mockTech);
  (mockTechRepo.unpopulatedQueryById as jest.Mock).mockResolvedValueOnce(
    mockUnpopulatedTech
  );

  (mockTechRepo.update as jest.Mock).mockResolvedValue(mockTech);
  (mockAikidoUserRepo.update as jest.Mock).mockResolvedValueOnce({});
};

describe('Given the AikidoUsersController class', () => {
  beforeEach(() => {
    jest.resetAllMocks();
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
        mockReq.body.user.password = count;
        (Auth.compareHash as jest.Mock).mockResolvedValueOnce(true);
        (mockAikidoUserRepo.search as jest.Mock).mockResolvedValueOnce([
          'Test',
        ]);
        (Auth.createToken as jest.Mock).mockReturnValueOnce('TestToken');

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
        (mockAikidoUserRepo.search as jest.Mock).mockResolvedValueOnce([]);
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

  describe('When call the getUsersCategorized method', () => {
    describe('And all params are correct (param: user)', () => {
      test('Then it should call res.json', async () => {
        (mockAikidoUserRepo.searchPaged as jest.Mock).mockResolvedValueOnce({
          members: [{}],
          number: 0,
        });

        await mockAikidoUsersController.getUsersCategorized(
          mockUserReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{ users: [{}], number: 0 }],
        });
      });
    });

    describe('And all params are correct (param: sensei)', () => {
      test('Then it should call res.json (param:sensei)', async () => {
        (mockAikidoUserRepo.searchPaged as jest.Mock).mockResolvedValueOnce({
          members: [{}],
          number: 0,
        });

        await mockAikidoUsersController.getUsersCategorized(
          mockSenseiReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{ users: [{}], number: 0 }],
        });
      });
    });
    describe('And there is no id in params', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.getUsersCategorized(
          mockNoParamsReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No role provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no page in query', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.getUsersCategorized(
          mockUserNoPageReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No page provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And the id is not user nor sensei', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.getUsersCategorized(
          mockCustomReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(
          406,
          'Invalid data',
          mockCustomReq.params.id
        );
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the getUser method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockAikidoUserRepo.queryById as jest.Mock).mockResolvedValueOnce({});

        await mockAikidoUsersController.getUserById(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{}],
        });
      });
    });

    describe('And there is no id in the body', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.getUserById(
          mockNoParamsReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No user provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the updateSelfUser method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockAikidoUserRepo.update as jest.Mock).mockResolvedValueOnce({});

        await mockAikidoUsersController.updateSelfUser(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{}],
        });
      });
    });

    describe('And there is no id in params', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.updateSelfUser(
          mockNoParamsReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No user provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the updateAdmin method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockAikidoUserRepo.queryById as jest.Mock).mockResolvedValueOnce(
          mockAikidoUser
        );
        (mockAikidoUserRepo.update as jest.Mock).mockResolvedValueOnce({});
        (mockTechRepo.queryById as jest.Mock).mockResolvedValueOnce(mockTech);
        (mockTechRepo.update as jest.Mock).mockResolvedValueOnce({});

        await mockAikidoUsersController.updateAdmin(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{}],
        });
      });
    });

    describe('And there is no id in body.user', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.updateAdmin(
          mockNoParamsReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No user provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the deleteUser method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockAikidoUserRepo.erase as jest.Mock).mockResolvedValueOnce({});

        await mockAikidoUsersController.deleteUser(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{}],
        });
      });
    });

    describe('And there is no id in params', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.deleteUser(
          mockNoParamsReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No user provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the addUke method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockAikidoUserRepo.queryById as jest.Mock).mockResolvedValueOnce(
          mockAikidoUser
        );
        (mockAikidoUserRepo.queryById as jest.Mock).mockResolvedValueOnce(
          mockAikidoUser
        );
        (mockAikidoUserRepo.update as jest.Mock).mockResolvedValueOnce({});

        await mockAikidoUsersController.addUke(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{}],
        });
      });
    });

    describe('And there is no id in params', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.addUke(
          mockNoParamsReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No user provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no id in body', () => {
      test('Then it should call next(error)', async () => {
        await mockAikidoUsersController.addUke(
          mockNoBodyIdReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No user provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no user with that id', () => {
      test('Then it should call next(error)', async () => {
        (mockAikidoUserRepo.queryById as jest.Mock).mockResolvedValueOnce(
          undefined
        );
        await mockAikidoUsersController.addUke(
          mockCustomReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(404, 'Not found', 'User not found');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And the user already have an uke', () => {
      test('Then it should call next(error)', async () => {
        (mockAikidoUserRepo.queryById as jest.Mock).mockResolvedValueOnce(
          mockAikidoUserWithUke
        );
        (mockAikidoUserRepo.queryById as jest.Mock).mockResolvedValueOnce(
          mockAikidoUserWithUke
        );

        const error = new HTTPError(
          409,
          "Can't be more than one uke",
          'Field restricted to single value'
        );

        await mockAikidoUsersController.addUke(
          mockCustomReq,
          mockRes,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the removeUke method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockAikidoUserRepo.queryById as jest.Mock).mockResolvedValueOnce(
          mockAikidoUser
        );

        (mockAikidoUserRepo.update as jest.Mock).mockResolvedValueOnce({});

        await mockAikidoUsersController.removeUke(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{}],
        });
      });
    });

    describe('And there is no id in params', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.removeUke(
          mockNoParamsReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No user provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the addTech method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        arrangeTechs();

        await mockAikidoUsersController.addTech(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{}],
        });
      });
    });

    describe('And there is no id in params', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.addTech(
          mockNoParamsReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No user provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no id in body', () => {
      test('Then it should call next(error)', async () => {
        const error = new HTTPError(400, 'Bad request', 'No tech provided');

        await mockAikidoUsersController.addTech(
          mockNoBodyReq,
          mockRes,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no user with that Id', () => {
      test('Then it should call next(error)', async () => {
        (mockAikidoUserRepo.queryById as jest.Mock).mockResolvedValueOnce(
          undefined
        );

        const error = new HTTPError(404, 'Not found', 'User not found');

        await mockAikidoUsersController.addTech(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no tech with that Id', () => {
      test('Then it should call next(error)', async () => {
        (mockAikidoUserRepo.queryById as jest.Mock).mockResolvedValueOnce(
          mockAikidoUser
        );

        (mockTechRepo.queryById as jest.Mock).mockResolvedValue(undefined);

        const error = new HTTPError(404, 'Not found', 'Tech not found');

        await mockAikidoUsersController.addTech(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the removeTech method', () => {
    describe('And there is no tech with that Id', () => {
      test('Then it should call next(error)', async () => {
        (
          mockAikidoUserRepo.unpopulatedQueryById as jest.Mock
        ).mockResolvedValueOnce(mockAikidoUser);

        (mockTechRepo.unpopulatedQueryById as jest.Mock).mockResolvedValue(
          undefined
        );

        const error = new HTTPError(404, 'Not found', 'Tech not found');

        await mockAikidoUsersController.removeTech(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no user with that Id', () => {
      test('Then it should call next(error)', async () => {
        (
          mockAikidoUserRepo.unpopulatedQueryById as jest.Mock
        ).mockResolvedValueOnce(undefined);

        const error = new HTTPError(404, 'Not found', 'User not found');

        await mockAikidoUsersController.removeTech(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        arrangeTechs();

        await mockAikidoUsersController.removeTech(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalledWith({
          results: [{}],
        });
      });
    });

    describe('And there is no id in params', () => {
      test('Then it should call next', async () => {
        await mockAikidoUsersController.removeTech(
          mockNoParamsReq,
          mockRes,
          mockNext
        );
        const error = new HTTPError(400, 'Bad request', 'No user provided');
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no id in body', () => {
      test('Then it should call next(error)', async () => {
        const error = new HTTPError(400, 'Bad request', 'No tech provided');

        await mockAikidoUsersController.removeTech(
          mockNoBodyReq,
          mockRes,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });
});
