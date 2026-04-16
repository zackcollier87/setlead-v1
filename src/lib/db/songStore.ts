import { db } from './dexieClient';
import type { Song } from '../../types/song';

export const songStore = {
  list: () => db.songs.orderBy('title').toArray(),
  get: (id: string) => db.songs.get(id),
  save: (song: Song) => db.songs.put(song),
  remove: (id: string) => db.songs.delete(id)
};
