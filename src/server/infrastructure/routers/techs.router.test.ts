import { mockTechsController } from '../../../common/mocks/test.mocks';
import TechRouter from './techs.router';

describe('Given the TechsRouter', () => {
  describe('When instantiated', () => {
    test('Then it should call the registerControllers', () => {
      const router = new TechRouter(mockTechsController);
      expect(router).toBeInstanceOf(TechRouter);
    });
  });
});
