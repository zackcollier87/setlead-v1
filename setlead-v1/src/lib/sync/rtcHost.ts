import type { SyncMessage } from '../../types/sync';

export class RtcHostManager {
  private peers = new Map<string, RTCPeerConnection>();
  private channels = new Map<string, RTCDataChannel>();

  constructor(private onDataChannelOpen?: (peerId: string) => void) {}

  createPeer(peerId: string) {
    const connection = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    const channel = connection.createDataChannel('setlead-sync');
    channel.onopen = () => this.onDataChannelOpen?.(peerId);
    this.peers.set(peerId, connection);
    this.channels.set(peerId, channel);
    return { connection, channel };
  }

  getPeer(peerId: string) {
    return this.peers.get(peerId);
  }

  broadcast(message: SyncMessage) {
    const serialized = JSON.stringify(message);
    for (const channel of this.channels.values()) {
      if (channel.readyState === 'open') channel.send(serialized);
    }
  }

  closeAll() {
    this.channels.forEach((channel) => channel.close());
    this.peers.forEach((peer) => peer.close());
    this.channels.clear();
    this.peers.clear();
  }
}
