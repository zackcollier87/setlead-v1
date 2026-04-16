import { createContext, useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import type { Song } from '../types/song';
import { songStore } from '../lib/db/songStore';
import { createId, nowIso } from '../utils/id';

export interface SongContextValue {
  songs: Song[];
  refreshSongs: () => Promise<void>;
  saveSong: (input: Partial<Song> & { title: string }) => Promise<Song>;
  deleteSong: (id: string) => Promise<void>;
}

export const SongContext = createContext<SongContextValue | null>(null);

export function SongProvider({ children }: PropsWithChildren) {
  const [songs, setSongs] = useState<Song[]>([]);

  const refreshSongs = useCallback(async () => {
    setSongs(await songStore.list());
  }, []);

  useEffect(() => {
    void refreshSongs();
  }, [refreshSongs]);

  const saveSong = useCallback(async (input: Partial<Song> & { title: string }) => {
    const timestamp = nowIso();
    const song: Song = {
      id: input.id ?? createId(),
      createdAt: input.createdAt ?? timestamp,
      updatedAt: timestamp,
      title: input.title,
      defaultKey: input.defaultKey,
      tempo: input.tempo,
      ccliNumber: input.ccliNumber,
      authors: input.authors ?? [],
      themes: input.themes ?? [],
      meter: input.meter,
      scriptureRefs: input.scriptureRefs ?? [],
      notes: input.notes,
      pdfIds: input.pdfIds ?? [],
      importedFromSongSelect: input.importedFromSongSelect ?? false
    };
    await songStore.save(song);
    await refreshSongs();
    return song;
  }, [refreshSongs]);

  const deleteSong = useCallback(async (id: string) => {
    await songStore.remove(id);
    await refreshSongs();
  }, [refreshSongs]);

  const value = useMemo(() => ({ songs, refreshSongs, saveSong, deleteSong }), [songs, refreshSongs, saveSong, deleteSong]);
  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
}
