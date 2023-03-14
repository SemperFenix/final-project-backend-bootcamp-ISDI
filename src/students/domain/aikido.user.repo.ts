import { AikidoUser } from './aikido.user.js';

export default interface AikidoUserRepo {
  create: (_entity: AikidoUser) => Promise<void>;
  update: (_entity: Partial<AikidoUser>) => Promise<void>;
  erase: (_id: string) => Promise<void>;
  query: () => Promise<AikidoUser[]>;
  queryById: (_id: string) => Promise<AikidoUser>;
  search: (
    _queries: { key: string; value: unknown }[]
  ) => Promise<AikidoUser[]>;
}
