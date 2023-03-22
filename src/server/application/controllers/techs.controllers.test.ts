import { HTTPError } from '../../../common/errors/http.error.js';
import {
  mockCustomReq,
  mockNext,
  mockNoPageReq,
  mockNoParamsReq,
  mockNoTechBodyReq,
  mockRes,
  mockTechRepo,
  mockTechReq,
  mockTechsController,
} from '../../../common/mocks/test.mocks.js';

jest.mock('../../../../src/config.js', () => ({
  config: {
    secret: 'test',
  },
}));

jest.mock('../../../services/auth.js');

describe('Given the TechsController class', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When call the create method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockTechRepo.create as jest.Mock).mockResolvedValueOnce({
          name: 'TestOk',
        });
        await mockTechsController.create(mockTechReq, mockRes, mockNext);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    describe('And there is no body', () => {
      test('Then it should call next (error)', async () => {
        (mockTechRepo.create as jest.Mock).mockResolvedValueOnce({
          name: 'TestOk',
        });
        const error = new HTTPError(
          406,
          'No data provided',
          'No data provided'
        );
        await mockTechsController.create(mockNoTechBodyReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the queryById method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockTechRepo.queryById as jest.Mock).mockResolvedValueOnce({
          name: 'TestOk',
        });
        await mockTechsController.queryById(mockCustomReq, mockRes, mockNext);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    describe('And there is no id in params', () => {
      test('Then it should call next (error)', async () => {
        const error = new HTTPError(400, 'Bad request', 'No user provided');
        await mockTechsController.queryById(mockNoParamsReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When update method is called', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockTechRepo.update as jest.Mock).mockResolvedValueOnce({
          name: 'TestOk',
        });
        await mockTechsController.update(mockCustomReq, mockRes, mockNext);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    describe('And there is no id in req.params', () => {
      test('Then it should call next (error)', async () => {
        const error = new HTTPError(
          406,
          'No data provided',
          'No data provided'
        );
        await mockTechsController.update(mockNoParamsReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });

    describe('And there is no tech updated', () => {
      test('Then it should call next (error)', async () => {
        (mockTechRepo.update as jest.Mock).mockResolvedValueOnce(undefined);
        const error = new HTTPError(404, 'Not found', 'Tech not found');
        await mockTechsController.update(mockCustomReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When queryCategorized method is called', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockTechRepo.search as jest.Mock).mockResolvedValueOnce({
          name: 'TestOk',
        });
        await mockTechsController.queryCategorized(
          mockCustomReq,
          mockRes,
          mockNext
        );
        expect(mockRes.json).toHaveBeenCalled();
      });
    });

    describe('And there is no page in query', () => {
      test('Then it should call res.json', async () => {
        (mockTechRepo.search as jest.Mock).mockResolvedValueOnce({
          name: 'TestOk',
        });
        const error = new HTTPError(400, 'Bad request', 'No page provided');
        await mockTechsController.queryCategorized(
          mockNoPageReq,
          mockRes,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(error);
      });
    });
  });
});
