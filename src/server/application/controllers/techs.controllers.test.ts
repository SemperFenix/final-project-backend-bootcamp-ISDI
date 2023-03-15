import {
  mockNext,
  mockReq,
  mockRes,
  mockTechRepo,
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

  describe('When call the register method', () => {
    describe('And all params are correct', () => {
      test('Then it should call res.json', async () => {
        (mockTechRepo.create as jest.Mock).mockResolvedValueOnce({
          name: 'TestOk',
        });
        await mockTechsController.create(mockReq, mockRes, mockNext);
        expect(mockRes.json).toHaveBeenCalled();
      });
    });
  });
});
