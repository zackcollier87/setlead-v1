export class RtcFollowerManager {
  connection: RTCPeerConnection;
  channel?: RTCDataChannel;

  constructor(
    private onMessage: (data: string) => void,
    private onDisconnect: () => void,
    private onOpen?: () => void
  ) {
    this.connection = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    this.connection.ondatachannel = (event) => {
      this.channel = event.channel;
      this.channel.onmessage = (message) => this.onMessage(String(message.data));
      this.channel.onopen = () => this.onOpen?.();
      this.channel.onclose = () => this.onDisconnect();
    };
    this.connection.onconnectionstatechange = () => {
      if (['failed', 'disconnected', 'closed'].includes(this.connection.connectionState)) {
        this.onDisconnect();
      }
    };
  }

  send(data: unknown) {
    if (this.channel?.readyState === 'open') {
      this.channel.send(JSON.stringify(data));
    }
  }

  close() {
    this.channel?.close();
    this.connection.close();
  }
}
