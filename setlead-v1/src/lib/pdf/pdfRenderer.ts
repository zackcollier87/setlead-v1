import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

export async function renderPdfPage(doc: PDFDocumentProxy, pageNumber: number, canvas: HTMLCanvasElement, scale: number) {
  const page: PDFPageProxy = await doc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: ctx, viewport }).promise;
}
