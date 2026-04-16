export interface Session {
  id: string;
  createdAt: string;
  updatedAt: string;
  code: string;
  role: 'host' | 'follower';
  peerId: string;
  hostPeerId?: string;
}

export interface SyncState {
  id: string;
  createdAt: string;
  updatedAt: string;
  currentSetlistId?: string;
  currentItemId?: string;
  currentPage: number;
  connected: boolean;
  lastPingAt?: string;
}

export type SyncMessageType =
  | 'INIT_STATE'
  | 'SET_CURRENT_ITEM'
  | 'SET_CURRENT_PAGE'
  | 'PING'
  | 'PONG';

export interface SyncMessage<T = unknown> {
  type: SyncMessageType;
  timestamp: string;
  payload: T;
}
