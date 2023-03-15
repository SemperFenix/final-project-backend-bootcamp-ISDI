import { mockTechRepo } from '../../common/mocks/test.mocks';
import TechEraser from './techs.eraser';

describe('Given the TechEraser class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the erase repo method', async () => {
      const techEraser = new TechEraser(mockTechRepo);
      await techEraser.execute('2');
      expect(mockTechRepo.erase).toHaveBeenCalledWith('2');
    });
  });
});
