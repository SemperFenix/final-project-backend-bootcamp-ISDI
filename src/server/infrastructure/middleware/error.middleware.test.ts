import { CustomError } from '../../../common/errors/http.error.js';
import {
  mockNext,
  mockReq,
  mockRes,
} from '../../../common/mocks/test.mocks.js';
import { errorMiddleware } from './error.middleware.js';

describe('Given the errorMidleware function', () => {
  describe('When called with all values in custom Error', () => {
    test('Then it should call resp.json with values in the argument', () => {
      const error = { code: 200, outMsg: 'test' } as CustomError;

      errorMiddleware(error, mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(error.code);
      expect(mockRes.json).toHaveBeenCalled();
    });
  });

  describe('When called without values in custom error', () => {
    test('Then it should call resp.json with values in the argument', () => {
      const error = {} as CustomError;

      errorMiddleware(error, mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalled();
    });
  });
});
