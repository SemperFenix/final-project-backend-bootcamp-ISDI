import AikidoUser from './aikido.user';

describe('Given the AikidoUser class', () => {
  describe('When instantiated', () => {
    test('Then it should create a new object of the class', () => {
      const aikidoUser = new AikidoUser(
        'Test',
        'Test',
        'Test',
        'Test',
        '1º kyu',
        [],
        [],
        'user',
        'Test'
      );
      expect(aikidoUser).toBeInstanceOf(AikidoUser);
    });
  });
});
