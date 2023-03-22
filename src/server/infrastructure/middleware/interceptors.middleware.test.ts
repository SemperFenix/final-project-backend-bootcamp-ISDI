import { NextFunction, Response } from 'express';
import { HTTPError } from '../../../common/errors/http.error.js';
import { Auth, TokenPayload } from '../../../services/auth.js';
import { CustomRequest, Interceptors } from './interceptors.middleware.js';

jest.mock('../../../services/auth.js');

const mockReq = {
  get: jest.fn(),
} as unknown as CustomRequest;
const mockResp = {} as Response;
const next = jest.fn() as NextFunction;

jest.mock('../../../config.js', () => ({
  _dirname: 'test',
  config: {
    secret: 'test',
  },
}));

describe('Given the interceptors class', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When call the logged method', () => {
    describe('And called with correct parameters', () => {
      test('Then it should call next function', () => {
        (mockReq.get as jest.Mock).mockReturnValue('Bearer test');
        (Auth.getTokenInfo as jest.Mock).mockResolvedValue({
          id: 'Test',
        } as TokenPayload);
        Interceptors.logged(mockReq, mockResp, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('And called with no Authorization header', () => {
      test('Then it should call next function (error)', () => {
        (mockReq.get as jest.Mock).mockReturnValue(undefined);
        const error = new HTTPError(
          498,
          'Token expired/invalid',
          'No authorization header found'
        );
        Interceptors.logged(mockReq, mockResp, next);
        expect(next).toHaveBeenCalledWith(error);
      });
    });

    describe('And Authorization header not start with "Bearer"', () => {
      test('Then it should call next function (error)', () => {
        (mockReq.get as jest.Mock).mockReturnValue('Test token');
        const error = new HTTPError(
          498,
          'Token expired/invalid',
          'No Bearer in auth header'
        );
        Interceptors.logged(mockReq, mockResp, next);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the authorized method', () => {
    describe('And called with correct parameters', () => {
      test('Then it should call next function', () => {
        mockReq.body = { id: '1', userId: '1' };
        mockReq.credentials = { id: '1' } as unknown as TokenPayload;
        Interceptors.authorized(mockReq, mockResp, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('And called with no req body userId', () => {
      test('Then it should take req params id and call next if matches', () => {
        mockReq.body = { name: 'Test' };
        mockReq.params = { id: '1' };
        mockReq.credentials = { id: '1' } as unknown as TokenPayload;
        Interceptors.authorized(mockReq, mockResp, next);
        expect(next).toHaveBeenCalledWith();
      });
    });

    describe('And called with no matching ids', () => {
      test('Then it should call next (error)', () => {
        mockReq.body = { id: '2', userId: '2' };
        mockReq.credentials = { id: '1' } as unknown as TokenPayload;
        const error = new HTTPError(401, 'Unauthorized', 'Not allowed action');
        Interceptors.authorized(mockReq, mockResp, next);
        expect(next).toHaveBeenCalledWith(error);
      });
    });

    describe('And called with no req.credentials', () => {
      test('Then it should call next function (error)', () => {
        delete mockReq.credentials;
        const error = new HTTPError(
          498,
          'Token not found',
          'No member in the request'
        );
        Interceptors.authorized(mockReq, mockResp, next);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });

  describe('When call the admin method', () => {
    describe('And called with correct parameters', () => {
      test('Then it should call next function', () => {
        mockReq.body = { id: '1', userId: '1' };
        mockReq.credentials = { role: 'sensei' } as unknown as TokenPayload;
        Interceptors.admin(mockReq, mockResp, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('And called with no req credentials', () => {
      test('Then it should take req params id and call next if matches', () => {
        mockReq.body = { name: 'Test' };
        mockReq.params = { id: '1' };
        mockReq.credentials = { role: 'sensei' } as unknown as TokenPayload;
        Interceptors.admin(mockReq, mockResp, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('And called with no admin credentials role', () => {
      test('Then it should call next (error)', () => {
        mockReq.body = { id: '2', userId: '1' };
        mockReq.credentials = { role: 'user' } as unknown as TokenPayload;
        const error = new HTTPError(401, 'Unauthorized', 'Not allowed action');
        Interceptors.admin(mockReq, mockResp, next);
        expect(next).toHaveBeenCalledWith(error);
      });
    });

    describe('And called with no req.credentials', () => {
      test('Then it should call next function (error)', () => {
        delete mockReq.credentials;
        const error = new HTTPError(
          498,
          'Token not found',
          'No member in the request'
        );
        Interceptors.admin(mockReq, mockResp, next);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
