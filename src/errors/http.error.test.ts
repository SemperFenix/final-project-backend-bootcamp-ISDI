import { HTTPError } from './http.error';

describe('Given the AikidoUser class', () => {
  describe('When instantiated', () => {
    test('Then it should create a new object of the class', () => {
      const httpError = new HTTPError(200, 'Test', 'Test');
      expect(httpError).toBeInstanceOf(HTTPError);
    });
  });
});
