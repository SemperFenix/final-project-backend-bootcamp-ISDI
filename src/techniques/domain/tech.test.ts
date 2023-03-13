import Tech from './tech';

describe('Given the AikidoUser class', () => {
  describe('When instantiated', () => {
    test('Then it should create a new object of the class', () => {
      const tech = new Tech('Test', 'Test', 'Test', '1º kyu', [], [], []);
      expect(tech).toBeInstanceOf(Tech);
    });
  });
});
