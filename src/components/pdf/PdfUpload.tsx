import { useState } from 'react';
import type { Song } from '../../types/song';
import type { PdfFile } from '../../types/pdf';
import { pdfStore } from '../../lib/db/pdfStore';
import { createId, nowIso } from '../../utils/id';
import { fileToBlob } from '../../utils/file';
import { validatePdf } from '../../utils/validation';
import { loadPdfDocument } from '../../lib/pdf/pdfLoader';
import { Button } from '../ui/Button';

interface PdfUploadProps {
  song: Song;
  onUploaded: (pdf: PdfFile) => Promise<void> | void;
}

export function PdfUpload({ song, onUploaded }: PdfUploadProps) {
  const [error, setError] = useState<string | null>(null);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const validationError = validatePdf(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    const blob = await fileToBlob(file);
    const doc = await loadPdfDocument(blob);
    const timestamp = nowIso();
    const pdf: PdfFile = {
      id: createId(),
      createdAt: timestamp,
      updatedAt: timestamp,
      name: file.name,
      size: file.size,
      type: file.type,
      pageCount: doc.numPages,
      songId: song.id
    };
    await pdfStore.save(pdf, blob);
    setError(null);
    await onUploaded(pdf);
    event.target.value = '';
  }

  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-slate-300">Upload PDF</label>
      <input type="file" accept="application/pdf" onChange={handleChange} className="text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-600 file:px-3 file:py-2 file:text-white" />
      {error ? <div className="text-sm text-rose-400">{error}</div> : null}
      <Button type="button" className="w-fit" onClick={() => {}}>PDF upload ready</Button>
    </div>
  );
}
