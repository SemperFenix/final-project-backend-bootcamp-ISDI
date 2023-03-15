import { mockAikidoUsersController } from '../../../common/mocks/test.mocks.js';
import AikidoUserRouter from './aikido.users.router.js';

describe('Given the AikidoUsersRouter', () => {
  describe('When instantiated', () => {
    test('Then it should call the registerControllers', () => {
      const router = new AikidoUserRouter(mockAikidoUsersController);
      expect(router).toBeInstanceOf(AikidoUserRouter);
    });
  });
});
