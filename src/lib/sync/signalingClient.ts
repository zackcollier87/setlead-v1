export interface SignalRequest {
  action: string;
  sessionCode: string;
  peerId: string;
  targetPeerId?: string;
  payload?: unknown;
}

export async function sendSignal(request: SignalRequest) {
  const response = await fetch('/.netlify/functions/signal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error('Signaling request failed.');
  }

  return await response.json();
}
