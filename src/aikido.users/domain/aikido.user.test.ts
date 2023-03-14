import { AikidoUser } from './aikido.user.js';

describe('Given the AikidoUser class', () => {
  describe('When instantiated', () => {
    test('Then it should create a new object of the class', () => {
      const aikidoUser = new AikidoUser(
        'TestMail',
        'TestPass',
        'TestName',
        'TestName',
        '1º kyu',
        [],
        [],
        'user',
        'TestTechId',
        'TestId'
      );
      expect(aikidoUser).toBeInstanceOf(AikidoUser);
    });
  });
});
