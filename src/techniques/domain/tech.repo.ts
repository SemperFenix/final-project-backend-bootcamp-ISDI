import { ProtoTech, Tech } from './tech.js';

export default interface TechRepo {
  create: (_entity: ProtoTech) => Promise<Tech>;
  update: (_entity: Partial<Tech>) => Promise<Tech>;
  erase: (_id: string) => Promise<void>;
  query: () => Promise<Tech[]>;
  queryById: (_id: string) => Promise<Tech>;
  search: (_queries: { key: string; value: unknown }[]) => Promise<Tech[]>;
  searchPaged: (
    _queries: { key: string; value: unknown }[],
    _page: string
  ) => Promise<{ techs: Tech[]; number: number }>;
}
