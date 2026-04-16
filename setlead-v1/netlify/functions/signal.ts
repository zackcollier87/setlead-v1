import type { Handler } from '@netlify/functions';

type StoredMessage = {
  targetPeerId?: string;
  payload: unknown;
  createdAt: number;
};

const sessions = new Map<string, { peers: Set<string>; messages: StoredMessage[] }>();

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const body = JSON.parse(event.body || '{}') as {
    action: string;
    sessionCode: string;
    peerId: string;
    targetPeerId?: string;
    payload?: unknown;
  };

  const session = sessions.get(body.sessionCode) ?? { peers: new Set<string>(), messages: [] };
  sessions.set(body.sessionCode, session);

  if (body.action === 'create') {
    session.peers.add(body.peerId);
    return { statusCode: 200, body: JSON.stringify({ ok: true, sessionCode: body.sessionCode }) };
  }

  if (body.action === 'join') {
    session.peers.add(body.peerId);
    return { statusCode: 200, body: JSON.stringify({ ok: true, peers: Array.from(session.peers) }) };
  }

  if (body.action === 'send') {
    session.messages.push({ targetPeerId: body.targetPeerId, payload: body.payload, createdAt: Date.now() });
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  if (body.action === 'poll') {
    const outgoing = session.messages.filter((message) => !message.targetPeerId || message.targetPeerId === body.peerId);
    session.messages = session.messages.filter((message) => message.targetPeerId && message.targetPeerId !== body.peerId);
    return { statusCode: 200, body: JSON.stringify({ ok: true, messages: outgoing.map((entry) => entry.payload) }) };
  }

  return { statusCode: 400, body: JSON.stringify({ error: 'Unsupported action' }) };
};
