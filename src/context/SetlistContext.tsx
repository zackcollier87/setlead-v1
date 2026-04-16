import { createContext, useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import type { Setlist } from '../types/setlist';
import { createId, nowIso } from '../utils/id';
import { setlistStore } from '../lib/db/setlistStore';

export interface SetlistContextValue {
  setlists: Setlist[];
  refreshSetlists: () => Promise<void>;
  saveSetlist: (input: Partial<Setlist> & { name: string }) => Promise<Setlist>;
  deleteSetlist: (id: string) => Promise<void>;
}

export const SetlistContext = createContext<SetlistContextValue | null>(null);

export function SetlistProvider({ children }: PropsWithChildren) {
  const [setlists, setSetlists] = useState<Setlist[]>([]);

  const refreshSetlists = useCallback(async () => {
    setSetlists(await setlistStore.list());
  }, []);

  useEffect(() => {
    void refreshSetlists();
  }, [refreshSetlists]);

  const saveSetlist = useCallback(async (input: Partial<Setlist> & { name: string }) => {
    const timestamp = nowIso();
    const setlist: Setlist = {
      id: input.id ?? createId(),
      createdAt: input.createdAt ?? timestamp,
      updatedAt: timestamp,
      name: input.name,
      description: input.description,
      items: input.items ?? []
    };
    await setlistStore.save(setlist);
    await refreshSetlists();
    return setlist;
  }, [refreshSetlists]);

  const deleteSetlist = useCallback(async (id: string) => {
    await setlistStore.remove(id);
    await refreshSetlists();
  }, [refreshSetlists]);

  const value = useMemo(() => ({ setlists, refreshSetlists, saveSetlist, deleteSetlist }), [setlists, refreshSetlists, saveSetlist, deleteSetlist]);
  return <SetlistContext.Provider value={value}>{children}</SetlistContext.Provider>;
}
