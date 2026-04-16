import type { SyncMessage } from '../../types/sync';
import type { Setlist } from '../../types/setlist';

export interface InitStatePayload {
  setlist?: Setlist;
  currentItemId?: string;
  currentPage: number;
}

export interface CurrentItemPayload {
  currentItemId?: string;
}

export interface CurrentPagePayload {
  currentPage: number;
}

export interface PingPayload {
  peerId: string;
}

export type SetLeadSyncMessage =
  | SyncMessage<InitStatePayload>
  | SyncMessage<CurrentItemPayload>
  | SyncMessage<CurrentPagePayload>
  | SyncMessage<PingPayload>;
