import Tech from './tech';

export default interface TechRepo {
  create: (_entity: Tech) => Promise<void>;
  update: (_entity: Partial<Tech>) => Promise<void>;
  erase: (_id: string) => Promise<void>;
  query: () => Promise<Tech[]>;
  queryById: (_id: string) => Promise<Tech>;
  search: (_queries: { key: string; value: unknown }[]) => Promise<Tech[]>;
}
