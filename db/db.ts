import { Tab } from '@/types/Tab';
import Dexie, { type EntityTable } from 'dexie';

const db = new Dexie('Tabs') as Dexie & {
  tab: EntityTable<
    Tab,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  tab: '++id, currency, totalAmount, closed' // primary key "id" (for the runtime!)
});

export default db;