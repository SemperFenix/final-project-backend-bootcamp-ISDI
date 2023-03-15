import { mockTechRepo } from '../../common/mocks/test.mocks';
import { Tech } from '../domain/tech';
import TechUpdater from './techs.updater';

describe('Given the TechUpdater class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the update repo method', async () => {
      const techUpdater = new TechUpdater(mockTechRepo);
      await techUpdater.execute({ attack: 'Test' } as unknown as Tech);
      expect(mockTechRepo.update).toHaveBeenCalledWith({ attack: 'Test' });
    });
  });
});
