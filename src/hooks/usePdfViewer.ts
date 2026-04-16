import { useCallback, useEffect, useRef, useState } from 'react';
import type { PdfFile } from '../types/pdf';
import { pdfStore } from '../lib/db/pdfStore';
import { loadPdfDocument } from '../lib/pdf/pdfLoader';
import { renderPdfPage } from '../lib/pdf/pdfRenderer';

export function usePdfViewer(pdf?: PdfFile) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1.25);
  const [pageCount, setPageCount] = useState(pdf?.pageCount ?? 0);

  const render = useCallback(async () => {
    if (!pdf || !canvasRef.current) return;
    const blob = await pdfStore.getBlob(pdf.id);
    if (!blob) return;
    const doc = await loadPdfDocument(blob);
    setPageCount(doc.numPages);
    const safePage = Math.max(1, Math.min(page, doc.numPages));
    if (safePage !== page) setPage(safePage);
    await renderPdfPage(doc, safePage, canvasRef.current, zoom);
  }, [page, pdf, zoom]);

  useEffect(() => {
    void render();
  }, [render]);

  useEffect(() => {
    setPage(1);
    setPageCount(pdf?.pageCount ?? 0);
  }, [pdf?.id]);

  return {
    canvasRef,
    page,
    pageCount,
    zoom,
    setPage,
    nextPage: () => setPage((current) => Math.min(current + 1, pageCount || current + 1)),
    prevPage: () => setPage((current) => Math.max(1, current - 1)),
    zoomIn: () => setZoom((current) => Math.min(current + 0.15, 3)),
    zoomOut: () => setZoom((current) => Math.max(current - 0.15, 0.5)),
    setZoom
  };
}
