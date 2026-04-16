// src/lib/db.ts
import Dexie, { Table } from 'dexie';

export interface Song {
  id?: number;
  title: string;
  artist?: string;
  key?: string; // e.g., "C", "Gm"
  capo?: number;
  tempo?: number;
  timeSig?: string;
  tags?: string[];
  pdfPath?: string; // blob key or url
  lyrics?: string; // ChordPro or plain
  createdAt: number;
  updatedAt: number;
}

export interface SetlistItem {
  songId: number;
  order: number;
  overrideKey?: string;
  startPage?: number;
  notes?: string;
  estimatedDuration?: number; // seconds
}

export interface Setlist {
  id?: number;
  name: string;
  items: SetlistItem[];
  createdAt: number;
  updatedAt: number;
}

class AppDB extends Dexie {
  songs!: Table<Song, number>;
  setlists!: Table<Setlist, number>;
  pageCache!: Table<{ id?: number; songId: number; pageNumber: number; dataUrl: string; updatedAt: number }, number>;

  constructor() {
    super('setleadDB');
    this.version(1).stores({
      songs: '++id, title, artist, tags',
      setlists: '++id, name, updatedAt',
      pageCache: '++id, songId, pageNumber, updatedAt'
    });
  }
}

export const db = new AppDB();
