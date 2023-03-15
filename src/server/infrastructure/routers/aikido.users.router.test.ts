import { mockAikidoUsersController } from '../../../common/mocks/test.mocks';
import AikidoUserRouter from './aikido.users.router';

describe('Given the AikidoUsersRouter', () => {
  describe('When instantiated', () => {
    test('Then it should call the registerControllers', () => {
      const router = new AikidoUserRouter(mockAikidoUsersController);
      expect(router).toBeInstanceOf(AikidoUserRouter);
    });
  });
});
