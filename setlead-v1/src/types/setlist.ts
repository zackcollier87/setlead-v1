export interface SetlistItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  songId: string;
  selectedPdfId?: string;
  order: number;
  notes?: string;
}

export interface Setlist {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description?: string;
  items: SetlistItem[];
}
