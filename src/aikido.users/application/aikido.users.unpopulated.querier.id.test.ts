import { mockAikidoUserRepo } from '../../common/mocks/test.mocks.js';
import AikidoUserUnpopulatedQuerierId from './aikido.users.unpopulated.querier.id.js';

describe('Given the AikidoUserQuerierId class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the unpopulatedQueryById repo method', async () => {
      const aikidoUserQuerierId = new AikidoUserUnpopulatedQuerierId(
        mockAikidoUserRepo
      );
      await aikidoUserQuerierId.execute('2');
      expect(mockAikidoUserRepo.unpopulatedQueryById).toHaveBeenCalledWith('2');
    });
  });
});
