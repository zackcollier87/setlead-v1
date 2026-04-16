import { useMemo, useState } from 'react';
import { SongForm } from '../../components/songs/SongForm';
import { SongList } from '../../components/songs/SongList';
import { SongDetail } from '../../components/songs/SongDetail';
import { SongSelectImport } from '../../components/songs/SongSelectImport';
import { PdfUpload } from '../../components/pdf/PdfUpload';
import { useSongs } from '../../hooks/useSongs';
import type { Song } from '../../types/song';
import { pdfStore } from '../../lib/db/pdfStore';

export function LibraryPage() {
  const { songs, saveSong, refreshSongs } = useSongs();
  const [selectedSong, setSelectedSong] = useState<Song | undefined>();
  const [songPdfs, setSongPdfs] = useState<any[]>([]);
  const [prefill, setPrefill] = useState<Partial<Song> | undefined>();

  async function selectSong(song: Song) {
    setSelectedSong(song);
    setSongPdfs(await pdfStore.bySong(song.id));
  }

  const sortedSongs = useMemo(() => songs.slice().sort((a, b) => a.title.localeCompare(b.title)), [songs]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr_1fr]">
      <div className="grid gap-4">
        <SongSelectImport onImport={setPrefill} />
        <SongForm
          initial={prefill}
          onSave={async (input) => {
            const saved = await saveSong({ ...prefill, ...input });
            setPrefill(undefined);
            await selectSong(saved);
          }}
        />
      </div>
      <div className="grid gap-4">
        <SongList songs={sortedSongs} selectedSongId={selectedSong?.id} onSelect={(song) => void selectSong(song)} />
      </div>
      <div className="grid gap-4">
        <SongDetail song={selectedSong} pdfs={songPdfs} />
        {selectedSong ? (
          <PdfUpload
            song={selectedSong}
            onUploaded={async (pdf) => {
              await saveSong({ ...selectedSong, title: selectedSong.title, pdfIds: [...selectedSong.pdfIds, pdf.id] });
              await refreshSongs();
              await selectSong({ ...selectedSong, pdfIds: [...selectedSong.pdfIds, pdf.id] });
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
