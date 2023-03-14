import AikidoUserCreator from './aikido.users/application/aikido.users.creator.js';
import AikidoUserEraser from './aikido.users/application/aikido.users.eraser.js';
import AikidoUserQuerier from './aikido.users/application/aikido.users.querier.js';
import AikidoUserQuerierId from './aikido.users/application/aikido.users.querier.id.js';
import AikidoUserSearcher from './aikido.users/application/aikido.users.searcher.js';
import AikidoUserUpdater from './aikido.users/application/aikido.users.updater.js';
import AikidoUserMongoRepo from './aikido.users/infrastructure/aikido.users.mongo.repo.js';
import { AikidoUsersController as AikidoUserController } from './server/infrastructure/controllers/aikido.users.controllers.js';
import ExpressServer from './server/infrastructure/express.server.js';
import AikidoUserRouter from './server/infrastructure/routers/aikido.users.router.js';
import { PORT } from './config.js';
import { TechsController } from './server/infrastructure/controllers/techs.controllers.js';
import TechSearcher from './techniques/application/techs.searcher.js';
import TechQuerier from './techniques/application/techs.querier.js';
import TechQuerierId from './techniques/application/techs.querier.id.js';
import TechCreator from './techniques/application/techs.creator.js';
import TechUpdater from './techniques/application/techs.updater.js';
import TechEraser from './techniques/application/techs.eraser.js';
import TechMongoRepo from './techniques/infrastructure/techs.mongo.repo.js';
import TechRouter from './server/infrastructure/routers/techs.router.js';

const bootstrap = async () => {
  const aikidoUsersRepository = new AikidoUserMongoRepo();

  const aikidoUserSearcher = new AikidoUserSearcher(aikidoUsersRepository);
  const aikidoUserQuerier = new AikidoUserQuerier(aikidoUsersRepository);
  const aikidoUserQuerierId = new AikidoUserQuerierId(aikidoUsersRepository);
  const aikidoUserCreator = new AikidoUserCreator(aikidoUsersRepository);
  const aikidoUserUpdater = new AikidoUserUpdater(aikidoUsersRepository);
  const aikidoUserEraser = new AikidoUserEraser(aikidoUsersRepository);

  const aikidoUserController = new AikidoUserController(
    aikidoUserSearcher,
    aikidoUserQuerier,
    aikidoUserQuerierId,
    aikidoUserCreator,
    aikidoUserUpdater,
    aikidoUserEraser
  );

  const techsRepository = new TechMongoRepo();

  const techSearcher = new TechSearcher(techsRepository);
  const techQuerier = new TechQuerier(techsRepository);
  const techQuerierId = new TechQuerierId(techsRepository);
  const techCreator = new TechCreator(techsRepository);
  const techUpdater = new TechUpdater(techsRepository);
  const techEraser = new TechEraser(techsRepository);

  const techsController = new TechsController(
    techSearcher,
    techQuerier,
    techQuerierId,
    techCreator,
    techUpdater,
    techEraser
  );

  const aikidoUserRouter = new AikidoUserRouter(aikidoUserController);
  const techRouter = new TechRouter(techsController);

  const server = new ExpressServer([aikidoUserRouter, techRouter]);

  server.start(PORT);
};

bootstrap();
