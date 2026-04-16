import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createId, nowIso } from '../utils/id';
import { RtcFollowerManager } from '../lib/sync/rtcFollower';
import { sendSignal } from '../lib/sync/signalingClient';
import type { Setlist } from '../types/setlist';
import type { SyncMessage } from '../types/sync';

export function useSyncFollower() {
  const peerId = useMemo(() => createId(), []);
  const managerRef = useRef<RtcFollowerManager | null>(null);
  const [connected, setConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItemId, setCurrentItemId] = useState<string | undefined>();
  const [sharedSetlist, setSharedSetlist] = useState<Setlist | undefined>();

  const handleMessage = useCallback((raw: string) => {
    const message = JSON.parse(raw) as SyncMessage<any>;
    if (message.type === 'INIT_STATE') {
      setSharedSetlist(message.payload.setlist);
      setCurrentItemId(message.payload.currentItemId);
      setCurrentPage(message.payload.currentPage ?? 1);
    }
    if (message.type === 'SET_CURRENT_ITEM') setCurrentItemId(message.payload.currentItemId);
    if (message.type === 'SET_CURRENT_PAGE') setCurrentPage(message.payload.currentPage);
    if (message.type === 'PING') {
      managerRef.current?.send({ type: 'PONG', timestamp: nowIso(), payload: { peerId } });
    }
  }, [peerId]);

  const handleDisconnect = useCallback(() => setConnected(false), []);
  if (!managerRef.current) {
    managerRef.current = new RtcFollowerManager(handleMessage, handleDisconnect, () => setConnected(true));
  }

  const joinSession = useCallback(async (sessionCode: string) => {
    await sendSignal({ action: 'join', sessionCode, peerId, payload: {} });
  }, [peerId]);

  useEffect(() => () => managerRef.current?.close(), []);

  return {
    peerId,
    connected,
    currentPage,
    currentItemId,
    sharedSetlist,
    joinSession,
    followerManager: managerRef.current
  };
}
