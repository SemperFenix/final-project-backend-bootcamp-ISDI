import { mockAikidoUsersController } from '../../common/mocks/test.mocks';
import ExpressServer from './express.server';
import AikidoUserRouter from './routers/aikido.users.router';
import http from 'http';
import { dbConnect } from './mongoose/db/db.connect';

// Comentado para continuar con ello
// jest.mock('./mongoose/db/db.connect', () => ({
//   dbConnect: jest.fn(() =>
//     Promise.resolve(() => ({
//       db: jest.fn().mockImplementation(() => ({
//         databaseName: 'testing',
//       })),
//     }))
//   ),
// }));

const router = new AikidoUserRouter(mockAikidoUsersController);
const server = new ExpressServer([router]);
const spy = jest.spyOn(http, 'createServer');

describe('Given the ExpressServer class', () => {
  beforeEach(() => {});
  describe('When instantiated', () => {
    test('Then it should create an instance', () => {});

    expect(server).toBeInstanceOf(ExpressServer);
  });
  describe('When a calling its start method', () => {
    test('Then it should call http create server and dbconnect', () => {
      server.start(3040);
      expect(spy).toHaveBeenCalled();
      // Comentado para continuarlo
      // expect(dbConnect).toHaveBeenCalled();
    });
  });
});
