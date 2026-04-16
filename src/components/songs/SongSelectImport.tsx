import { useState } from 'react';
import type { Song } from '../../types/song';
import { Button } from '../ui/Button';
import { Input } from '../ui/Field';

interface SongSelectImportProps {
  onImport: (metadata: Partial<Song>) => void;
}

export function SongSelectImport({ onImport }: SongSelectImportProps) {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [ccliNumber, setCcliNumber] = useState('');
  const [themes, setThemes] = useState('');
  const [tempo, setTempo] = useState('');
  const [defaultKey, setDefaultKey] = useState('');
  const [meter, setMeter] = useState('');
  const [scriptureRefs, setScriptureRefs] = useState('');

  return (
    <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-base font-semibold text-white">SongSelect Metadata Import</h3>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <Input value={authors} onChange={(e) => setAuthors(e.target.value)} placeholder="Authors" />
      <Input value={ccliNumber} onChange={(e) => setCcliNumber(e.target.value)} placeholder="CCLI Number" />
      <Input value={themes} onChange={(e) => setThemes(e.target.value)} placeholder="Themes" />
      <Input value={tempo} onChange={(e) => setTempo(e.target.value)} placeholder="Tempo" />
      <Input value={defaultKey} onChange={(e) => setDefaultKey(e.target.value)} placeholder="Key" />
      <Input value={meter} onChange={(e) => setMeter(e.target.value)} placeholder="Meter" />
      <Input value={scriptureRefs} onChange={(e) => setScriptureRefs(e.target.value)} placeholder="Scripture References" />
      <Button
        onClick={() =>
          onImport({
            title,
            authors: authors.split(',').map((item) => item.trim()).filter(Boolean),
            ccliNumber,
            themes: themes.split(',').map((item) => item.trim()).filter(Boolean),
            tempo: tempo ? Number(tempo) : undefined,
            defaultKey,
            meter,
            scriptureRefs: scriptureRefs.split(',').map((item) => item.trim()).filter(Boolean),
            importedFromSongSelect: true
          })
        }
      >
        Load Metadata into Song Form
      </Button>
    </div>
  );
}
