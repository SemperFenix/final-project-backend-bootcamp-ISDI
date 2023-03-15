import { mockAikidoUserRepo } from '../../common/mocks/test.mocks.js';
import AikidoUserEraser from './aikido.users.eraser';

describe('Given the AikidoUserEraser class', () => {
  describe('When call its execute method', () => {
    test('Then it should call the erase repo method', async () => {
      const aikidoUserEraser = new AikidoUserEraser(mockAikidoUserRepo);
      await aikidoUserEraser.execute('2');
      expect(mockAikidoUserRepo.erase).toHaveBeenCalledWith('2');
    });
  });
});
