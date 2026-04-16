import type { Setlist } from '../../types/setlist';

interface SetlistListProps {
  setlists: Setlist[];
  selectedId?: string;
  onSelect: (setlist: Setlist) => void;
}

export function SetlistList({ setlists, selectedId, onSelect }: SetlistListProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {setlists.map((setlist) => (
        <button
          key={setlist.id}
          onClick={() => onSelect(setlist)}
          className={`flex w-full items-center justify-between border-b border-slate-800 px-4 py-3 text-left transition last:border-b-0 ${selectedId === setlist.id ? 'bg-slate-800' : 'hover:bg-slate-800/60'}`}
        >
          <div>
            <div className="font-semibold text-white">{setlist.name}</div>
            <div className="text-xs text-slate-400">{setlist.items.length} items</div>
          </div>
        </button>
      ))}
      {!setlists.length ? <div className="px-4 py-6 text-sm text-slate-400">No setlists yet.</div> : null}
    </div>
  );
}
