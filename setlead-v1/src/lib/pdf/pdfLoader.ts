import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';

GlobalWorkerOptions.workerSrc = workerSrc;

export async function loadPdfDocument(input: Blob | Uint8Array | ArrayBuffer): Promise<PDFDocumentProxy> {
  let data: Uint8Array | undefined;
  if (input instanceof Blob) {
    data = new Uint8Array(await input.arrayBuffer());
  } else if (input instanceof ArrayBuffer) {
    data = new Uint8Array(input);
  } else if (input instanceof Uint8Array) {
    data = input;
  }
  return await getDocument({ data }).promise;
}
