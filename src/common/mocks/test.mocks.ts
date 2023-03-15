import { NextFunction, Request, Response } from 'express';
import AikidoUserCreator from '../../aikido.users/application/aikido.users.creator';
import AikidoUserEraser from '../../aikido.users/application/aikido.users.eraser';
import AikidoUserQuerier from '../../aikido.users/application/aikido.users.querier';
import AikidoUserQuerierId from '../../aikido.users/application/aikido.users.querier.id';
import AikidoUserSearcher from '../../aikido.users/application/aikido.users.searcher';
import AikidoUserUpdater from '../../aikido.users/application/aikido.users.updater';
import AikidoUserMongoRepo from '../../aikido.users/infrastructure/aikido.users.mongo.repo';
import { AikidoUsersController } from '../../server/application/controllers/aikido.users.controllers';
import { TechsController } from '../../server/application/controllers/techs.controllers';
import TechCreator from '../../techniques/application/techs.creator';
import TechEraser from '../../techniques/application/techs.eraser';
import TechQuerier from '../../techniques/application/techs.querier';
import TechQuerierId from '../../techniques/application/techs.querier.id';
import TechSearcher from '../../techniques/application/techs.searcher';
import TechUpdater from '../../techniques/application/techs.updater';
import TechMongoRepo from '../../techniques/infrastructure/techs.mongo.repo';

export const count = 'TestPass';

export const mockTechRepo: TechMongoRepo = {
  query: jest.fn(),
  queryById: jest.fn(),
  create: jest.fn(),
  search: jest.fn(),
  update: jest.fn(),
  erase: jest.fn(),
};

export const mockAikidoUserRepo: AikidoUserMongoRepo = {
  query: jest.fn(),
  queryById: jest.fn(),
  create: jest.fn(),
  search: jest.fn(),
  update: jest.fn(),
  erase: jest.fn(),
};

export const mockSearcher = new AikidoUserSearcher(mockAikidoUserRepo);
export const mockQuerier = new AikidoUserQuerier(mockAikidoUserRepo);
export const mockQuerierId = new AikidoUserQuerierId(mockAikidoUserRepo);
export const mockCreator = new AikidoUserCreator(mockAikidoUserRepo);
export const mockUpdater = new AikidoUserUpdater(mockAikidoUserRepo);
export const mockEraser = new AikidoUserEraser(mockAikidoUserRepo);

export const mockAikidoUsersController = new AikidoUsersController(
  mockSearcher,
  mockQuerier,
  mockQuerierId,
  mockCreator,
  mockUpdater,
  mockEraser
);

export const mockTechSearcher = new TechSearcher(mockTechRepo);
export const mockTechQuerier = new TechQuerier(mockTechRepo);
export const mockTechQuerierId = new TechQuerierId(mockTechRepo);
export const mockTechCreator = new TechCreator(mockTechRepo);
export const mockTechUpdater = new TechUpdater(mockTechRepo);
export const mockTechEraser = new TechEraser(mockTechRepo);

export const mockTechsController = new TechsController(
  mockTechSearcher,
  mockTechQuerier,
  mockTechQuerierId,
  mockTechCreator,
  mockTechUpdater,
  mockTechEraser
);

export const mockReq = {
  body: {
    id: 'TestId',
    email: 'TestMail',
    password: count,
    name: 'TestName',
    lastName: 'TestLast',
    grade: '2º kyu',
  },
} as unknown as Request;

export const mockNoEmailReq = {
  body: {
    password: count,
    name: 'TestName',
  },
} as unknown as Request;

export const mockNoPassReq = {
  body: {
    email: 'TestMail',
    name: 'TestName',
  },
} as unknown as Request;

export const mockRes = {
  status: jest.fn(),
  json: jest.fn(),
} as unknown as Response;

export const mockNext = jest.fn() as NextFunction;