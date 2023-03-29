import { mockTechRepo } from '../../common/mocks/test.mocks.js';
import TechUnpopulatedQuerierId from './techs.unpopulated.querier.id.js';

describe('Given the TechQuerierId class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the unpopulatedQueryById repo method', async () => {
      const techQuerierId = new TechUnpopulatedQuerierId(mockTechRepo);
      await techQuerierId.execute('2');
      expect(mockTechRepo.unpopulatedQueryById).toHaveBeenCalledWith('2');
    });
  });
});
