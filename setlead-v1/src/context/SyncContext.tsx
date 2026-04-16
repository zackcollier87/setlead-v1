import { createContext, useMemo, type PropsWithChildren } from 'react';
import { useSyncHost } from '../hooks/useSyncHost';
import { useSyncFollower } from '../hooks/useSyncFollower';

export const SyncContext = createContext<{
  host: ReturnType<typeof useSyncHost>;
  follower: ReturnType<typeof useSyncFollower>;
} | null>(null);

export function SyncProvider({ children }: PropsWithChildren) {
  const host = useSyncHost();
  const follower = useSyncFollower();
  const value = useMemo(() => ({ host, follower }), [host, follower]);
  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
}
