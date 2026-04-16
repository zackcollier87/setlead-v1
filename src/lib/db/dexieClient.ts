import Dexie, { type Table } from 'dexie';
import type { Song } from '../../types/song';
import type { PdfFile } from '../../types/pdf';
import type { Setlist } from '../../types/setlist';

export interface PdfBlobRecord {
  id: string;
  blob: Blob;
}

class SetLeadDatabase extends Dexie {
  songs!: Table<Song, string>;
  pdfFiles!: Table<PdfFile, string>;
  pdfBlobs!: Table<PdfBlobRecord, string>;
  setlists!: Table<Setlist, string>;

  constructor() {
    super('setlead-v1');
    this.version(1).stores({
      songs: 'id, title, updatedAt',
      pdfFiles: 'id, songId, updatedAt',
      pdfBlobs: 'id',
      setlists: 'id, name, updatedAt'
    });
  }
}

export const db = new SetLeadDatabase();
