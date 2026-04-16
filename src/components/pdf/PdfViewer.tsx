import type { PdfFile } from '../../types/pdf';
import { useEffect } from 'react';
import { usePdfViewer } from '../../hooks/usePdfViewer';
import { Button } from '../ui/Button';

interface PdfViewerProps {
  pdf?: PdfFile;
  forcedPage?: number;
  onPageChange?: (page: number) => void;
  chromeHidden?: boolean;
}

export function PdfViewer({ pdf, forcedPage, onPageChange, chromeHidden = false }: PdfViewerProps) {
  const { canvasRef, page, pageCount, zoom, setPage, nextPage, prevPage, zoomIn, zoomOut } = usePdfViewer(pdf);

  useEffect(() => {
    if (typeof forcedPage === 'number' && forcedPage !== page) setPage(forcedPage);
  }, [forcedPage, page, setPage]);

  useEffect(() => {
    onPageChange?.(page);
  }, [onPageChange, page]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') nextPage();
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') prevPage();
      if (event.key === '+') zoomIn();
      if (event.key === '-') zoomOut();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextPage, prevPage, zoomIn, zoomOut]);

  if (!pdf) return <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">No PDF selected.</div>;

  return (
    <div className="grid gap-3">
      {!chromeHidden ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-3">
          <div>
            <div className="font-semibold text-white">{pdf.name}</div>
            <div className="text-xs text-slate-400">Page {page} of {pageCount || pdf.pageCount} · Zoom {Math.round(zoom * 100)}%</div>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" onClick={prevPage}>Prev</Button>
            <Button type="button" onClick={nextPage}>Next</Button>
            <Button type="button" onClick={zoomOut}>-</Button>
            <Button type="button" onClick={zoomIn}>+</Button>
          </div>
        </div>
      ) : null}
      <div className="overflow-auto rounded-2xl border border-slate-800 bg-slate-950 p-4" onClick={() => nextPage()}>
        <canvas ref={canvasRef} className="mx-auto max-w-full rounded-lg bg-white shadow-2xl" />
      </div>
    </div>
  );
}
