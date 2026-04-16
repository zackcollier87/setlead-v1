import type { Song } from '../../types/song';

interface SongListProps {
  songs: Song[];
  selectedSongId?: string;
  onSelect: (song: Song) => void;
}

export function SongList({ songs, selectedSongId, onSelect }: SongListProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {songs.map((song) => (
        <button
          key={song.id}
          onClick={() => onSelect(song)}
          className={`flex w-full items-center justify-between border-b border-slate-800 px-4 py-3 text-left transition last:border-b-0 ${selectedSongId === song.id ? 'bg-slate-800' : 'hover:bg-slate-800/60'}`}
        >
          <div>
            <div className="font-semibold text-white">{song.title}</div>
            <div className="text-xs text-slate-400">{song.defaultKey || 'No key'} · {song.tempo || '--'} BPM</div>
          </div>
          {song.importedFromSongSelect ? <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">SongSelect</span> : null}
        </button>
      ))}
      {!songs.length ? <div className="px-4 py-6 text-sm text-slate-400">No songs yet.</div> : null}
    </div>
  );
}
