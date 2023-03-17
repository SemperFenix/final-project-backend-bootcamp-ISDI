import {
  mockDefaultController,
  mockNext,
  mockReq,
  mockRes,
} from '../../../common/mocks/test.mocks';

jest.mock('../../../../src/config.js', () => ({
  config: {
    secret: 'test',
  },
}));

describe('Given the DefaultController class', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When call the register method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', () => {
        mockDefaultController.default(mockReq, mockRes, mockNext);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });
  });
});
