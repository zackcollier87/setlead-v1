import { db } from './dexieClient';
import type { Setlist } from '../../types/setlist';

export const setlistStore = {
  list: () => db.setlists.orderBy('updatedAt').reverse().toArray(),
  get: (id: string) => db.setlists.get(id),
  save: (setlist: Setlist) => db.setlists.put(setlist),
  remove: (id: string) => db.setlists.delete(id)
};
