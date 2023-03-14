import { TechModel } from '../../server/infrastructure/mongoose/tech.model.js';
import { Tech } from '../domain/tech.js';
import TechMongoRepo from './techs.mongo.repo.js';

jest.mock('../../server/infrastructure/mongoose/tech.model');
const repo = new TechMongoRepo();
let popTechValue: unknown;

const mockTechPopulExec = () => ({
  populate: jest.fn().mockImplementation(() => ({
    populate: jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(popTechValue),
      })),
    })),
  })),
});

const mockExec = () => ({
  exec: jest.fn().mockResolvedValue(popTechValue),
});

describe('Given the TechsRepo', () => {
  describe('When call the Query method', () => {
    test('Then it should return the Techs array', async () => {
      popTechValue = [{}];
      (TechModel.find as jest.Mock).mockImplementation(mockTechPopulExec);
      const result = await repo.query();
      expect(result).toEqual([{}]);
    });
  });

  describe('When call the queryById method', () => {
    describe('And the id returns a user', () => {
      test('Then it should return the user', async () => {
        popTechValue = {};
        (TechModel.findById as jest.Mock).mockImplementation(mockTechPopulExec);
        const result = await repo.queryById('1');
        expect(result).toEqual({});
      });
    });

    describe('And the id not returns a user', () => {
      test('Then it should throw error', async () => {
        popTechValue = undefined;
        (TechModel.findById as jest.Mock).mockImplementation(mockTechPopulExec);
        const result = repo.queryById('1');
        await expect(result).rejects.toThrow();
      });
    });
  });

  describe('When called the search method', () => {
    test('Then it should return the Techs array', async () => {
      popTechValue = [{}];
      (TechModel.find as jest.Mock).mockImplementation(mockTechPopulExec);
      const result = await repo.search([
        { key: 'Test', value: 'testing' },
        { key: 'Test2', value: 'testing2' },
      ]);
      expect(result).toEqual([{}]);
    });
  });

  describe('When call the create method', () => {
    test('Then it should return the created Tech', async () => {
      (TechModel.create as jest.Mock).mockResolvedValue({});
      await repo.create({ attack: 'Test' } as Tech);
      expect(TechModel.create).toHaveBeenCalledWith({ attack: 'Test' });
    });
  });

  describe('When call the update method', () => {
    describe('And the user exists', () => {
      test('Then it should return the user updated', async () => {
        popTechValue = { attack: 'Test' };
        (TechModel.findByIdAndUpdate as jest.Mock).mockImplementation(mockExec);
        const entity = { attack: 'Test', id: '1' };
        await repo.update(entity);
        expect(TechModel.findByIdAndUpdate).toHaveBeenCalledWith(
          entity.id,
          entity,
          {
            new: true,
          }
        );
      });
    });

    describe('And the id not returns a user', () => {
      test('Then it should throw error', async () => {
        popTechValue = undefined;
        (TechModel.findByIdAndUpdate as jest.Mock).mockImplementation(mockExec);
        const result = repo.update({ attack: 'Test' });
        await expect(result).rejects.toThrow();
      });
    });
  });

  describe('When call the erase method', () => {
    describe('And the user exists', () => {
      test('Then it should delete the user', async () => {
        popTechValue = {};
        (TechModel.findByIdAndDelete as jest.Mock).mockImplementation(mockExec);
        await repo.erase('2');
        expect(TechModel.findByIdAndDelete).toHaveBeenCalledWith('2');
      });
    });

    describe('And the id not returns a user', () => {
      test('Then it should throw error', async () => {
        popTechValue = undefined;
        (TechModel.findByIdAndDelete as jest.Mock).mockImplementation(mockExec);
        const result = repo.erase('2');
        await expect(result).rejects.toThrow();
      });
    });
  });
});
