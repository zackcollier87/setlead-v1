import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createId, nowIso } from '../utils/id';
import { RtcHostManager } from '../lib/sync/rtcHost';
import { sendSignal } from '../lib/sync/signalingClient';
import type { Setlist } from '../types/setlist';
import type { SyncMessage } from '../types/sync';

export function useSyncHost() {
  const peerId = useMemo(() => createId(), []);
  const hostRef = useRef<RtcHostManager | null>(null);
  const [sessionCode, setSessionCode] = useState('');
  const [connectedPeers, setConnectedPeers] = useState<string[]>([]);

  if (!hostRef.current) {
    hostRef.current = new RtcHostManager((openedPeerId) => {
      setConnectedPeers((current) => Array.from(new Set([...current, openedPeerId])));
    });
  }

  const send = useCallback((message: SyncMessage) => {
    hostRef.current?.broadcast(message);
  }, []);

  const sendInitState = useCallback((setlist?: Setlist, currentItemId?: string, currentPage = 1) => {
    send({
      type: 'INIT_STATE',
      timestamp: nowIso(),
      payload: { setlist, currentItemId, currentPage }
    });
  }, [send]);

  const sendCurrentItem = useCallback((currentItemId?: string) => {
    send({ type: 'SET_CURRENT_ITEM', timestamp: nowIso(), payload: { currentItemId } });
  }, [send]);

  const sendCurrentPage = useCallback((currentPage: number) => {
    send({ type: 'SET_CURRENT_PAGE', timestamp: nowIso(), payload: { currentPage } });
  }, [send]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      send({ type: 'PING', timestamp: nowIso(), payload: { peerId } });
    }, 8000);
    return () => window.clearInterval(interval);
  }, [peerId, send]);

  const startSession = useCallback(async () => {
    const code = Math.random().toString().slice(2, 8);
    setSessionCode(code);
    await sendSignal({ action: 'create', sessionCode: code, peerId, payload: {} });
  }, [peerId]);

  return {
    peerId,
    sessionCode,
    connectedPeers,
    startSession,
    sendInitState,
    sendCurrentItem,
    sendCurrentPage,
    hostManager: hostRef.current
  };
}
