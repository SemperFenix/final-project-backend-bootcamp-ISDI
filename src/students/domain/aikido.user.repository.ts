import AikidoUser from './aikido.user';

export default interface AikidoUserRepo {
  create: (_user: AikidoUser) => Promise<void>;
  update: (_user: Partial<AikidoUser>) => Promise<void>;
  erase: (_id: string) => Promise<void>;
  query: () => Promise<AikidoUser[]>;
  queryById: (_id: string) => Promise<AikidoUser | null>;
  search: (
    _queries: { key: string; value: unknown }[]
  ) => Promise<AikidoUser[]>;
}
