import { mockTechRepo } from '../../common/mocks/test.mocks.js';
import TechQuerierId from './techs.querier.id.js';

describe('Given the TechQuerierId class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the queryById repo method', async () => {
      const techQuerierId = new TechQuerierId(mockTechRepo);
      await techQuerierId.execute('2');
      expect(mockTechRepo.queryById).toHaveBeenCalledWith('2');
    });
  });
});
