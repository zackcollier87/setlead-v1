import { useState } from 'react';
import type { Song } from '../../types/song';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Field';
import { requireTitle } from '../../utils/validation';

interface SongFormProps {
  initial?: Partial<Song>;
  onSave: (input: Partial<Song> & { title: string }) => Promise<void>;
}

export function SongForm({ initial, onSave }: SongFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [defaultKey, setDefaultKey] = useState(initial?.defaultKey ?? '');
  const [tempo, setTempo] = useState(initial?.tempo?.toString() ?? '');
  const [ccliNumber, setCcliNumber] = useState(initial?.ccliNumber ?? '');
  const [authors, setAuthors] = useState((initial?.authors ?? []).join(', '));
  const [themes, setThemes] = useState((initial?.themes ?? []).join(', '));
  const [meter, setMeter] = useState(initial?.meter ?? '');
  const [scriptureRefs, setScriptureRefs] = useState((initial?.scriptureRefs ?? []).join(', '));
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [importedFromSongSelect, setImportedFromSongSelect] = useState(initial?.importedFromSongSelect ?? false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const validationError = requireTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    await onSave({
      ...initial,
      title,
      defaultKey: defaultKey || undefined,
      tempo: tempo ? Number(tempo) : undefined,
      ccliNumber: ccliNumber || undefined,
      authors: authors.split(',').map((item) => item.trim()).filter(Boolean),
      themes: themes.split(',').map((item) => item.trim()).filter(Boolean),
      meter: meter || undefined,
      scriptureRefs: scriptureRefs.split(',').map((item) => item.trim()).filter(Boolean),
      notes: notes || undefined,
      importedFromSongSelect
    });
    setTitle('');
    setDefaultKey('');
    setTempo('');
    setCcliNumber('');
    setAuthors('');
    setThemes('');
    setMeter('');
    setScriptureRefs('');
    setNotes('');
    setImportedFromSongSelect(false);
  }

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Amazing Grace" />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Key</label>
          <Input value={defaultKey} onChange={(e) => setDefaultKey(e.target.value)} placeholder="G" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Tempo</label>
          <Input value={tempo} onChange={(e) => setTempo(e.target.value)} placeholder="72" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">CCLI</label>
          <Input value={ccliNumber} onChange={(e) => setCcliNumber(e.target.value)} placeholder="1234567" />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Authors</label>
          <Input value={authors} onChange={(e) => setAuthors(e.target.value)} placeholder="Author One, Author Two" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Themes</label>
          <Input value={themes} onChange={(e) => setThemes(e.target.value)} placeholder="Grace, Gospel" />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Meter</label>
          <Input value={meter} onChange={(e) => setMeter(e.target.value)} placeholder="4/4" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Scripture Refs</label>
          <Input value={scriptureRefs} onChange={(e) => setScriptureRefs(e.target.value)} placeholder="John 3:16, Romans 5:8" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">Notes</label>
        <TextArea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Arrangement notes" />
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input type="checkbox" checked={importedFromSongSelect} onChange={(e) => setImportedFromSongSelect(e.target.checked)} />
        Imported from SongSelect metadata
      </label>
      {error ? <div className="text-sm text-rose-400">{error}</div> : null}
      <Button type="submit">Save Song</Button>
    </form>
  );
}
