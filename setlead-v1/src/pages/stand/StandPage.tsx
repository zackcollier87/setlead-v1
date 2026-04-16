import { useEffect, useMemo, useState } from 'react';
import { useSetlists } from '../../hooks/useSetlists';
import { useSongs } from '../../hooks/useSongs';
import { pdfStore } from '../../lib/db/pdfStore';
import type { PdfFile } from '../../types/pdf';
import { PdfViewer } from '../../components/pdf/PdfViewer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useContext } from 'react';
import { SyncContext } from '../../context/SyncContext';

export function StandPage() {
  const { setlists } = useSetlists();
  const { songs } = useSongs();
  const sync = useContext(SyncContext);
  const [selectedSetlistId, setSelectedSetlistId] = useState<string>('');
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentPdf, setCurrentPdf] = useState<PdfFile | undefined>();
  const [currentPage, setCurrentPage] = useState(1);

  const selectedSetlist = useMemo(() => setlists.find((item) => item.id === selectedSetlistId) ?? setlists[0], [selectedSetlistId, setlists]);
  const currentItem = selectedSetlist?.items.slice().sort((a, b) => a.order - b.order)[currentItemIndex];
  const currentSong = songs.find((song) => song.id === currentItem?.songId);

  useEffect(() => {
    const loadPdf = async () => {
      if (!currentItem?.selectedPdfId) {
        setCurrentPdf(undefined);
        return;
      }
      const meta = await pdfStore.getMeta(currentItem.selectedPdfId);
      setCurrentPdf(meta);
    };
    void loadPdf();
  }, [currentItem?.selectedPdfId]);

  useEffect(() => {
    if (sync && selectedSetlist) {
      sync.host.sendInitState(selectedSetlist, currentItem?.id, currentPage);
    }
  }, [currentItem?.id, currentPage, selectedSetlist, sync]);

  function changeItem(delta: number) {
    if (!selectedSetlist) return;
    const items = selectedSetlist.items.slice().sort((a, b) => a.order - b.order);
    const nextIndex = Math.max(0, Math.min(items.length - 1, currentItemIndex + delta));
    setCurrentItemIndex(nextIndex);
    setCurrentPage(1);
    sync?.host.sendCurrentItem(items[nextIndex]?.id);
    sync?.host.sendCurrentPage(1);
  }

  return (
    <div className="grid gap-4">
      <Card>
        <div className="flex flex-wrap items-center gap-3">
          <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100" value={selectedSetlist?.id ?? ''} onChange={(e) => { setSelectedSetlistId(e.target.value); setCurrentItemIndex(0); setCurrentPage(1); }}>
            {setlists.map((setlist) => <option key={setlist.id} value={setlist.id}>{setlist.name}</option>)}
          </select>
          <Button type="button" onClick={() => changeItem(-1)}>Previous Song</Button>
          <Button type="button" onClick={() => changeItem(1)}>Next Song</Button>
          <div className="text-sm text-slate-300">{currentSong?.title || 'No song selected'}</div>
        </div>
      </Card>
      <div className="min-h-[70vh] rounded-2xl border border-slate-800 bg-black p-3">
        <PdfViewer pdf={currentPdf} forcedPage={currentPage} onPageChange={(page) => { setCurrentPage(page); sync?.host.sendCurrentPage(page); }} chromeHidden />
      </div>
    </div>
  );
}
