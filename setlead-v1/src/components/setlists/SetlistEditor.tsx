import type { Setlist, SetlistItem } from '../../types/setlist';
import type { Song } from '../../types/song';
import type { PdfFile } from '../../types/pdf';
import { Button } from '../ui/Button';
import { createId, nowIso } from '../../utils/id';

interface SetlistEditorProps {
  setlist?: Setlist;
  songs: Song[];
  pdfs: PdfFile[];
  onSave: (setlist: Setlist) => Promise<void>;
}

export function SetlistEditor({ setlist, songs, pdfs, onSave }: SetlistEditorProps) {
  if (!setlist) return <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-sm text-slate-400">Select a setlist to edit it.</div>;

  const addSong = async (songId: string) => {
    const timestamp = nowIso();
    const item: SetlistItem = {
      id: createId(),
      createdAt: timestamp,
      updatedAt: timestamp,
      songId,
      selectedPdfId: pdfs.find((pdf) => pdf.songId === songId)?.id,
      order: setlist.items.length,
      notes: ''
    };
    await onSave({ ...setlist, updatedAt: timestamp, items: [...setlist.items, item] });
  };

  const removeItem = async (itemId: string) => {
    const timestamp = nowIso();
    const nextItems = setlist.items
      .filter((item) => item.id !== itemId)
      .map((item, index) => ({ ...item, order: index, updatedAt: timestamp }));
    await onSave({ ...setlist, updatedAt: timestamp, items: nextItems });
  };

  return (
    <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{setlist.name}</h3>
        <p className="text-sm text-slate-400">{setlist.description || 'No description'}</p>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100" defaultValue="" onChange={(e) => { if (e.target.value) { void addSong(e.target.value); e.currentTarget.value=''; } }}>
          <option value="" disabled>Add song to setlist</option>
          {songs.map((song) => <option key={song.id} value={song.id}>{song.title}</option>)}
        </select>
      </div>
      <div className="grid gap-2">
        {setlist.items
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((item, index) => {
            const song = songs.find((entry) => entry.id === item.songId);
            return (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-sm">
                <div>
                  <div className="font-semibold text-white">{index + 1}. {song?.title || 'Missing song'}</div>
                  <div className="text-xs text-slate-400">PDF: {pdfs.find((pdf) => pdf.id === item.selectedPdfId)?.name || 'None'}</div>
                </div>
                <Button type="button" className="bg-rose-600 hover:bg-rose-700" onClick={() => void removeItem(item.id)}>Remove</Button>
              </div>
            );
          })}
        {!setlist.items.length ? <div className="text-sm text-slate-400">No songs in this setlist yet.</div> : null}
      </div>
    </div>
  );
}
