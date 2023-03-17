import { mockTechRepo } from '../../common/mocks/test.mocks.js';
import { Tech } from '../domain/tech.js';
import TechUpdater from './techs.updater.js';

describe('Given the TechUpdater class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the update repo method', async () => {
      const techUpdater = new TechUpdater(mockTechRepo);
      await techUpdater.execute({ attack: 'Test' } as unknown as Tech);
      expect(mockTechRepo.update).toHaveBeenCalledWith({ attack: 'Test' });
    });
  });
});
