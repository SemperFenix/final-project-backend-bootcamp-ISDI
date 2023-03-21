import { NextFunction, Request, Response } from 'express';
import AikidoUserCreator from '../../aikido.users/application/aikido.users.creator.js';
import AikidoUserEraser from '../../aikido.users/application/aikido.users.eraser.js';
import AikidoUserQuerier from '../../aikido.users/application/aikido.users.querier.js';
import AikidoUserQuerierId from '../../aikido.users/application/aikido.users.querier.id.js';
import AikidoUserSearcher from '../../aikido.users/application/aikido.users.searcher.js';
import AikidoUserUpdater from '../../aikido.users/application/aikido.users.updater.js';
import AikidoUserMongoRepo from '../../aikido.users/infrastructure/aikido.users.mongo.repo.js';
import { AikidoUsersController } from '../../server/application/controllers/aikido.users.controllers.js';
import { DefaultController } from '../../server/application/controllers/default.controller.js';
import { TechsController } from '../../server/application/controllers/techs.controllers.js';
import TechCreator from '../../techniques/application/techs.creator.js';
import TechEraser from '../../techniques/application/techs.eraser.js';
import TechQuerier from '../../techniques/application/techs.querier.js';
import TechQuerierId from '../../techniques/application/techs.querier.id.js';
import TechSearcher from '../../techniques/application/techs.searcher.js';
import TechUpdater from '../../techniques/application/techs.updater.js';
import TechMongoRepo from '../../techniques/infrastructure/techs.mongo.repo.js';
import AikidoUserSearcherPaged from '../../aikido.users/application/aikido.users.searcher.paged.js';
import TechSearcherPaged from '../../techniques/application/techs.searcher.paged.js';

export const count = 'TestPass';

export const mockTechRepo: TechMongoRepo = {
  query: jest.fn(),
  queryById: jest.fn(),
  create: jest.fn(),
  search: jest.fn(),
  searchPaged: jest.fn(),
  update: jest.fn(),
  erase: jest.fn(),
};

export const mockAikidoUserRepo: AikidoUserMongoRepo = {
  query: jest.fn(),
  queryById: jest.fn(),
  create: jest.fn(),
  search: jest.fn(),
  searchPaged: jest.fn(),
  update: jest.fn(),
  erase: jest.fn(),
};

export const mockSearcher = new AikidoUserSearcher(mockAikidoUserRepo);
export const mockQuerier = new AikidoUserQuerier(mockAikidoUserRepo);
export const mockQuerierId = new AikidoUserQuerierId(mockAikidoUserRepo);
export const mockCreator = new AikidoUserCreator(mockAikidoUserRepo);
export const mockUpdater = new AikidoUserUpdater(mockAikidoUserRepo);
export const mockEraser = new AikidoUserEraser(mockAikidoUserRepo);
export const mockSearcherPaged = new AikidoUserSearcherPaged(
  mockAikidoUserRepo
);

export const mockTechSearcher = new TechSearcher(mockTechRepo);
export const mockTechQuerier = new TechQuerier(mockTechRepo);
export const mockTechQuerierId = new TechQuerierId(mockTechRepo);
export const mockTechCreator = new TechCreator(mockTechRepo);
export const mockTechUpdater = new TechUpdater(mockTechRepo);
export const mockTechEraser = new TechEraser(mockTechRepo);
export const mockTechSearcherPaged = new TechSearcherPaged(mockTechRepo);

export const mockAikidoUsersController = new AikidoUsersController(
  mockSearcher,
  mockQuerier,
  mockQuerierId,
  mockCreator,
  mockUpdater,
  mockEraser,
  mockSearcherPaged,
  mockTechQuerierId,
  mockTechUpdater
);

export const mockTechsController = new TechsController(
  mockTechSearcher,
  mockTechQuerier,
  mockTechQuerierId,
  mockTechCreator,
  mockTechUpdater,
  mockTechEraser,
  mockTechSearcherPaged
);

export const mockDefaultController = new DefaultController();

export const mockTech = {
  id: 'TestId',
  usersLearnt: [''],
  usersInProgress: [''],
  usersToLearn: [''],
};

export const mockAikidoUser = {
  id: 'TestId',
  email: 'TestMail',
  password: count,
  name: 'TestName',
  lastName: 'TestLast',
  grade: '2º kyu',
  techsLearnt: [],
  techsInProgress: ['TestTech', 'TestId'],
  mainUke: '',
};

export const mockAikidoUserWithUke = {
  id: 'TestId',
  email: 'TestMail',
  password: count,
  name: 'TestName',
  lastName: 'TestLast',
  grade: '2º kyu',
  techsLearnt: [],
  techsInProgress: ['TestTech', 'TestId'],
  mainUke: 'TestId',
};

export const mockReq = {
  body: {
    id: 'TestId',
    email: 'TestMail',
    password: count,
    name: 'TestName',
    lastName: 'TestLast',
    grade: '2º kyu',
  },
  query: {
    page: '1',
  },
} as unknown as Request;

export const mockNoBodyIdReq = {
  query: {
    page: '1',
  },
  body: { id: undefined },
  params: {
    id: 'TestId',
  },
} as unknown as Request;

export const mockNoBodyReq = {
  query: {
    page: '1',
  },
  params: {
    id: 'TestId',
  },
} as unknown as Request;

export const mockCustomReq = {
  body: {
    id: 'TestId',
    email: 'TestMail',
    password: count,
    name: 'TestName',
    lastName: 'TestLast',
    grade: '2º kyu',
  },
  credentials: {
    role: 'user',
  },
  params: {
    id: 'TestId',
  },
  query: {
    page: '1',
    attack: 'test',
    stand: 'test',
  },
} as unknown as Request;

export const mockUserReq = {
  body: {
    id: 'TestId',
    email: 'TestMail',
    password: count,
    name: 'TestName',
    lastName: 'TestLast',
    grade: '2º kyu',
  },
  credentials: {
    role: 'user',
  },
  params: {
    id: 'user',
  },
  query: {
    page: '1',
  },
} as unknown as Request;

export const mockUserNoPageReq = {
  body: {
    id: 'TestId',
    email: 'TestMail',
    password: count,
    name: 'TestName',
    lastName: 'TestLast',
    grade: '2º kyu',
  },
  credentials: {
    role: 'user',
  },
  params: {
    id: 'user',
  },
  query: {
    page: undefined,
  },
} as unknown as Request;

export const mockSenseiReq = {
  body: {
    id: 'TestId',
    email: 'TestMail',
    password: count,
    name: 'TestName',
    lastName: 'TestLast',
    grade: '2º kyu',
  },
  credentials: {
    role: 'user',
  },
  params: {
    id: 'sensei',
  },
  query: {
    page: '1',
  },
} as unknown as Request;

export const mockNoParamsReq = {
  body: {
    email: 'TestMail',
    password: count,
    name: 'TestName',
    lastName: 'TestLast',
    grade: '2º kyu',
  },
  params: { id: undefined },
  credentials: {
    role: 'user',
  },
  query: {
    page: '1',
  },
} as unknown as Request;

export const mockNoEmailReq = {
  body: {
    password: count,
    name: 'TestName',
  },
} as unknown as Request;

export const mockNoPageReq = {
  body: {
    password: count,
    name: 'TestName',
  },
  query: {},
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
