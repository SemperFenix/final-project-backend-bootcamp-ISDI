import { NextFunction, Request, Response } from 'express';
import AikidoUserMongoRepo from '../../aikido.users/infrastructure/aikido.users.mongo.repo';
import TechMongoRepo from '../../techniques/infrastructure/techs.mongo.repo';

const count = 'TestPass';

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
