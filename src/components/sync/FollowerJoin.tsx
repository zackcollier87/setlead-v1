import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Field';

interface FollowerJoinProps {
  onJoin: (sessionCode: string) => Promise<void>;
  connected: boolean;
}

export function FollowerJoin({ onJoin, connected }: FollowerJoinProps) {
  const [sessionCode, setSessionCode] = useState('');

  return (
    <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-base font-semibold text-white">Join Session</h3>
      <Input value={sessionCode} onChange={(e) => setSessionCode(e.target.value)} placeholder="Enter session code" />
      <Button onClick={() => void onJoin(sessionCode)}>Join</Button>
      <div className="text-sm text-slate-300">Status: {connected ? 'Connected' : 'Disconnected'}</div>
    </div>
  );
}
