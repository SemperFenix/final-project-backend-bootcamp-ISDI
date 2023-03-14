import { mockAikidoUserRepo } from '../../common/mocks/test.mocks';
import { AikidoUser } from '../domain/aikido.user';
import AikidoUserUpdater from './aikido.users.updater';

describe('Given the AikidoUserUpdater class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the update repo method', async () => {
      const aikidoUserUpdater = new AikidoUserUpdater(mockAikidoUserRepo);
      await aikidoUserUpdater.execute({
        attack: 'Test',
      } as unknown as AikidoUser);
      expect(mockAikidoUserRepo.update).toHaveBeenCalledWith({
        attack: 'Test',
      });
    });
  });
});
