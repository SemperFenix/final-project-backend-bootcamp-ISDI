import { NextFunction, Request, Response } from 'express';

const count = 'TestPass';

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
