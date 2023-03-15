import { mockTechRepo } from '../../common/mocks/test.mocks';
import TechSearcher from './techs.searcher';

describe('Given the TechSearcher class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the search repo method', async () => {
      const techSearcher = new TechSearcher(mockTechRepo);
      await techSearcher.execute([{ key: 'test', value: 'test' }]);
      expect(mockTechRepo.search).toHaveBeenCalledWith([
        { key: 'test', value: 'test' },
      ]);
    });
  });
});
