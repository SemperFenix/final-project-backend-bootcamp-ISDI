import { mockTechsController } from '../../../common/mocks/test.mocks.js';
import TechRouter from './techs.router.js';

describe('Given the TechsRouter', () => {
  describe('When instantiated', () => {
    test('Then it should call the registerControllers', () => {
      const router = new TechRouter(mockTechsController);
      expect(router).toBeInstanceOf(TechRouter);
    });
  });
});
