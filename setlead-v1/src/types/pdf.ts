export interface PdfFile {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  size: number;
  type: string;
  pageCount: number;
  songId?: string;
}
