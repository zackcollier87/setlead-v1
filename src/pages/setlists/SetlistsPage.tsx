import { useMemo, useState } from 'react';
import { SetlistForm } from '../../components/setlists/SetlistForm';
import { SetlistList } from '../../components/setlists/SetlistList';
import { SetlistEditor } from '../../components/setlists/SetlistEditor';
import { useSetlists } from '../../hooks/useSetlists';
import { useSongs } from '../../hooks/useSongs';
import type { Setlist } from '../../types/setlist';
import { pdfStore } from '../../lib/db/pdfStore';
import type { PdfFile } from '../../types/pdf';

export function SetlistsPage() {
  const { setlists, saveSetlist } = useSetlists();
  const { songs } = useSongs();
  const [selectedSetlist, setSelectedSetlist] = useState<Setlist | undefined>();
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);

  async function hydrateSetlist(setlist: Setlist) {
    setSelectedSetlist(setlist);
    setPdfs(await pdfStore.list());
  }

  const sortedSetlists = useMemo(() => setlists.slice().sort((a, b) => a.name.localeCompare(b.name)), [setlists]);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_0.9fr_1.2fr]">
      <SetlistForm onSave={async (input) => { const saved = await saveSetlist(input); await hydrateSetlist(saved); }} />
      <SetlistList setlists={sortedSetlists} selectedId={selectedSetlist?.id} onSelect={(setlist) => void hydrateSetlist(setlist)} />
      <SetlistEditor setlist={selectedSetlist} songs={songs} pdfs={pdfs} onSave={async (updated) => { await saveSetlist(updated); await hydrateSetlist(updated); }} />
    </div>
  );
}
