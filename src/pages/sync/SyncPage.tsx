import { useContext } from 'react';
import { SyncContext } from '../../context/SyncContext';
import { HostControls } from '../../components/sync/HostControls';
import { FollowerJoin } from '../../components/sync/FollowerJoin';
import { Card } from '../../components/ui/Card';

export function SyncPage() {
  const sync = useContext(SyncContext);
  if (!sync) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <HostControls sessionCode={sync.host.sessionCode} onStartSession={sync.host.startSession} connectedPeers={sync.host.connectedPeers} />
      <FollowerJoin onJoin={sync.follower.joinSession} connected={sync.follower.connected} />
      <Card>
        <h3 className="mb-3 text-base font-semibold text-white">Follower State</h3>
        <div className="grid gap-2 text-sm text-slate-300">
          <div>Connected: {sync.follower.connected ? 'Yes' : 'No'}</div>
          <div>Current Page: {sync.follower.currentPage}</div>
          <div>Current Item: {sync.follower.currentItemId || 'None'}</div>
          <div>Shared Setlist: {sync.follower.sharedSetlist?.name || 'None'}</div>
        </div>
      </Card>
    </div>
  );
}
