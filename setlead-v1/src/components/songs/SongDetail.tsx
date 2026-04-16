import type { Song } from '../../types/song';
import type { PdfFile } from '../../types/pdf';

interface SongDetailProps {
  song?: Song;
  pdfs: PdfFile[];
}

export function SongDetail({ song, pdfs }: SongDetailProps) {
  if (!song) return <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-sm text-slate-400">Select a song to view details.</div>;

  return (
    <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div>
        <h3 className="text-xl font-semibold text-white">{song.title}</h3>
        <p className="mt-1 text-sm text-slate-400">Key: {song.defaultKey || '—'} · Tempo: {song.tempo || '—'} · Meter: {song.meter || '—'}</p>
      </div>
      <div className="grid gap-2 text-sm text-slate-300">
        <div><span className="font-semibold text-slate-100">CCLI:</span> {song.ccliNumber || '—'}</div>
        <div><span className="font-semibold text-slate-100">Authors:</span> {song.authors.join(', ') || '—'}</div>
        <div><span className="font-semibold text-slate-100">Themes:</span> {song.themes.join(', ') || '—'}</div>
        <div><span className="font-semibold text-slate-100">Scripture:</span> {song.scriptureRefs.join(', ') || '—'}</div>
        <div><span className="font-semibold text-slate-100">Notes:</span> {song.notes || '—'}</div>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">Attached PDFs</h4>
        <div className="grid gap-2">
          {pdfs.map((pdf) => (
            <div key={pdf.id} className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-300">
              {pdf.name} · {pdf.pageCount} pages
            </div>
          ))}
          {!pdfs.length ? <div className="text-sm text-slate-500">No PDFs uploaded for this song.</div> : null}
        </div>
      </div>
    </div>
  );
}
