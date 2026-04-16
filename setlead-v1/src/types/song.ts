export interface Song {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  defaultKey?: string;
  tempo?: number;
  ccliNumber?: string;
  authors: string[];
  themes: string[];
  meter?: string;
  scriptureRefs: string[];
  notes?: string;
  pdfIds: string[];
  importedFromSongSelect?: boolean;
}
