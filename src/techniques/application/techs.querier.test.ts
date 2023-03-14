import { mockTechRepo } from '../../common/mocks/test.mocks';
import TechQuerier from './techs.querier.js';

describe('Given the TechQuerier class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the query repo method', async () => {
      const techQuerier = new TechQuerier(mockTechRepo);
      await techQuerier.execute();
      expect(mockTechRepo.query).toHaveBeenCalled();
    });
  });
});
