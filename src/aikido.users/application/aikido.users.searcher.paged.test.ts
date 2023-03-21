import { mockAikidoUserRepo } from '../../common/mocks/test.mocks.js';
import AikidoUserSearcherPaged from './aikido.users.searcher.paged.js';

describe('Given the AikidoUserSearcherPaged class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the update repo method', async () => {
      const aikidoUserSearcherPaged = new AikidoUserSearcherPaged(
        mockAikidoUserRepo
      );
      await aikidoUserSearcherPaged.execute(
        [
          {
            key: 'Test',
            value: 'TestVal',
          },
        ],
        '0'
      );
      expect(mockAikidoUserRepo.searchPaged).toHaveBeenCalledWith(
        [
          {
            key: 'Test',
            value: 'TestVal',
          },
        ],
        '0'
      );
    });
  });
});
