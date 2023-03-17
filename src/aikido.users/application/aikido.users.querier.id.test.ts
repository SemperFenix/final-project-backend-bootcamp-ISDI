import { mockAikidoUserRepo } from '../../common/mocks/test.mocks.js';
import AikidoUserQuerierId from './aikido.users.querier.id.js';

describe('Given the AikidoUserQuerierId class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the queryById repo method', async () => {
      const aikidoUserQuerierId = new AikidoUserQuerierId(mockAikidoUserRepo);
      await aikidoUserQuerierId.execute('2');
      expect(mockAikidoUserRepo.queryById).toHaveBeenCalledWith('2');
    });
  });
});
