import { mockDefaultController } from '../../../common/mocks/test.mocks';
import DefaultRouter from './default.router';

describe('Given the DefaultRouter', () => {
  describe('When instantiated', () => {
    test('Then it should call resp.json', () => {
      const router = new DefaultRouter(mockDefaultController);
      expect(router).toBeInstanceOf(DefaultRouter);
    });
  });
});
