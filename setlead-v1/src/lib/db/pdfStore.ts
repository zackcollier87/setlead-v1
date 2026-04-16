import { db } from './dexieClient';
import type { PdfFile } from '../../types/pdf';

export const pdfStore = {
  list: () => db.pdfFiles.toArray(),
  bySong: (songId: string) => db.pdfFiles.where('songId').equals(songId).toArray(),
  getMeta: (id: string) => db.pdfFiles.get(id),
  getBlob: async (id: string) => (await db.pdfBlobs.get(id))?.blob,
  save: async (meta: PdfFile, blob: Blob) => {
    await db.transaction('rw', db.pdfFiles, db.pdfBlobs, async () => {
      await db.pdfFiles.put(meta);
      await db.pdfBlobs.put({ id: meta.id, blob });
    });
  },
  remove: async (id: string) => {
    await db.transaction('rw', db.pdfFiles, db.pdfBlobs, async () => {
      await db.pdfFiles.delete(id);
      await db.pdfBlobs.delete(id);
    });
  }
};
