import { Button } from '../ui/Button';

interface HostControlsProps {
  sessionCode: string;
  onStartSession: () => Promise<void>;
  connectedPeers: string[];
}

export function HostControls({ sessionCode, onStartSession, connectedPeers }: HostControlsProps) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-base font-semibold text-white">Host Session</h3>
      <Button onClick={() => void onStartSession()}>Start Session</Button>
      <div className="text-sm text-slate-300">Session Code: <span className="font-mono text-white">{sessionCode || 'Not started'}</span></div>
      <div className="text-sm text-slate-300">Followers Connected: {connectedPeers.length}</div>
    </div>
  );
}
