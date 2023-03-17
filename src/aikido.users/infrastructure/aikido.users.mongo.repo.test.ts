import { AikidoUserModel } from '../../server/infrastructure/mongoose/aikido.user.model.js';
import { AikidoUser } from '../domain/aikido.user.js';
import AikidoUserMongoRepo from './aikido.users.mongo.repo.js';

jest.mock('../../server/infrastructure/mongoose/aikido.user.model');
const repo = new AikidoUserMongoRepo();
let popValue: unknown;

// Creo este mock para evitar el warning de Eslint de too many callback nesting
// Asignando una variable al mockResolvedValue puedo llevar a cabo distintos tests usando el mismo mock
const mockPopulateExec = () => ({
  populate: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockImplementation(() => ({
          exec: jest.fn().mockResolvedValue(popValue),
        })),
      })),
    })),
  })),
});

const mockLimit = () => ({
  skip: jest.fn().mockImplementation(() => ({
    limit: jest.fn().mockImplementation(mockPopulateExec),
  })),
});
let count = 0;

const mockCount = () => ({
  count: jest
    .fn()
    .mockImplementation(() => ({ exec: jest.fn().mockResolvedValue(count) })),
});
const mockExec = () => ({
  exec: jest.fn().mockResolvedValue(popValue),
});

describe('Given the AikidoUsersRepo', () => {
  describe('When call the Query method', () => {
    test('Then it should return the AikidoUsers array', async () => {
      popValue = [{}];
      (AikidoUserModel.find as jest.Mock).mockImplementation(mockPopulateExec);
      const result = await repo.query();
      expect(result).toEqual([{}]);
    });
  });

  describe('When call the queryById method', () => {
    describe('And the id returns a user', () => {
      test('Then it should return the user', async () => {
        popValue = {};
        (AikidoUserModel.findById as jest.Mock).mockImplementation(
          mockPopulateExec
        );
        const result = await repo.queryById('1');
        expect(result).toEqual({});
      });
    });

    describe('And the id not returns a user', () => {
      test('Then it should throw error', async () => {
        popValue = undefined;
        (AikidoUserModel.findById as jest.Mock).mockImplementation(
          mockPopulateExec
        );
        const result = repo.queryById('1');
        await expect(result).rejects.toThrow();
      });
    });
  });

  describe('When called the search method', () => {
    test('Then it should return the AikidoUsers array', async () => {
      popValue = [{}];
      (AikidoUserModel.find as jest.Mock).mockImplementation(mockPopulateExec);
      const result = await repo.search([
        { key: 'Test', value: 'testing' },
        { key: 'Test2', value: 'testing2' },
      ]);
      expect(result).toEqual([{}]);
    });
  });

  describe('When called the searchPaged method with page 0', () => {
    test('Then it should return the AikidoUsers array with page 1', async () => {
      popValue = [{}];
      (AikidoUserModel.find as jest.Mock).mockImplementationOnce(mockCount);

      (AikidoUserModel.find as jest.Mock).mockImplementationOnce(mockLimit);
      const result = await repo.searchPaged(
        [
          { key: 'Test', value: 'testing' },
          { key: 'Test2', value: 'testing2' },
        ],
        '0'
      );
      expect(result).toEqual({ members: [{}], number: 0 });
    });
  });

  describe('When called the searchPaged method with page 2', () => {
    test('Then it should return the AikidoUsers array skipping the first 6', async () => {
      popValue = [{}];
      (AikidoUserModel.find as jest.Mock).mockImplementationOnce(mockCount);

      (AikidoUserModel.find as jest.Mock).mockImplementationOnce(mockLimit);
      const result = await repo.searchPaged(
        [
          { key: 'Test', value: 'testing' },
          { key: 'Test2', value: 'testing2' },
        ],
        '2'
      );
      expect(result).toEqual({ members: [{}], number: 0 });
    });
  });

  describe('When called the searchPaged method with page 1', () => {
    describe('And there is more than 3 items', () => {
      test('Then it should return the AikidoUsers array without skipping', async () => {
        popValue = [{}];
        count = 5;
        (AikidoUserModel.find as jest.Mock).mockImplementationOnce(mockCount);

        (AikidoUserModel.find as jest.Mock).mockImplementationOnce(mockLimit);
        const result = await repo.searchPaged(
          [
            { key: 'Test', value: 'testing' },
            { key: 'Test2', value: 'testing2' },
          ],
          '1'
        );
        expect(result).toEqual({ members: [{}], number: 5 });
      });
    });
  });

  describe('When call the create method', () => {
    test('Then it should return the created AikidoUser', async () => {
      (AikidoUserModel.create as jest.Mock).mockResolvedValue({ name: 'Test' });
      const result = await repo.create({ name: 'Test' } as AikidoUser);
      expect(AikidoUserModel.create).toHaveBeenCalledWith({ name: 'Test' });
      expect(result).toEqual({ name: 'Test' });
    });
  });

  describe('When call the update method', () => {
    describe('And the user exists', () => {
      test('Then it should return the user updated', async () => {
        popValue = { name: 'Pedro', id: '1' };
        (AikidoUserModel.findByIdAndUpdate as jest.Mock).mockImplementation(
          mockExec
        );
        const entity = { name: 'Test', id: '1' };
        const result = await repo.update(entity);
        expect(AikidoUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
          entity.id,
          entity,
          {
            new: true,
          }
        );
        expect(result).toEqual({ id: '1', name: 'Pedro' });
      });
    });

    describe('And the id not returns a user', () => {
      test('Then it should throw error', async () => {
        popValue = undefined;
        (AikidoUserModel.findByIdAndUpdate as jest.Mock).mockImplementation(
          mockExec
        );
        const result = repo.update({ name: 'Pedro' });
        await expect(result).rejects.toThrow();
      });
    });
  });

  describe('When call the erase method', () => {
    describe('And the user exists', () => {
      test('Then it should delete the user', async () => {
        popValue = {};
        (AikidoUserModel.findByIdAndDelete as jest.Mock).mockImplementation(
          mockExec
        );
        await repo.erase('2');
        expect(AikidoUserModel.findByIdAndDelete).toHaveBeenCalledWith('2');
      });
    });

    describe('And the id not returns a user', () => {
      test('Then it should throw error', async () => {
        popValue = undefined;
        (AikidoUserModel.findByIdAndDelete as jest.Mock).mockImplementation(
          mockExec
        );
        const result = repo.erase('2');
        await expect(result).rejects.toThrow();
      });
    });
  });
});
