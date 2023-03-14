import { Tech } from './tech.js';

describe('Given the AikidoUser class', () => {
  describe('When instantiated', () => {
    test('Then it should create a new object of the class', () => {
      const tech = new Tech(
        'TestId',
        'TestAtt',
        'TestTech',
        'TestSta',
        '1º kyu',
        [],
        [],
        [],
        'TestVid'
      );
      expect(tech).toBeInstanceOf(Tech);
    });
  });
});
