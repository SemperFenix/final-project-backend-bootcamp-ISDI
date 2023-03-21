import { mockTechRepo } from '../../common/mocks/test.mocks.js';
import TechSearcherPaged from './techs.searcher.paged.js';

describe('Given the TechQuerier class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the query repo method', async () => {
      const techSearcherPaged = new TechSearcherPaged(mockTechRepo);
      await techSearcherPaged.execute(
        [
          {
            key: 'Test',
            value: 'TestVal',
          },
        ],
        '0'
      );
      expect(mockTechRepo.searchPaged).toHaveBeenCalledWith(
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
