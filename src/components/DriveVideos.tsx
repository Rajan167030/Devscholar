import { useEffect, useState } from 'react';
import { listFilesInFolder, getDriveFileDownloadUrl, DriveFile } from '../utils/drive';

interface DriveVideosProps {
  folderId?: string;
  apiKey?: string; // Vite env: VITE_GOOGLE_DRIVE_API_KEY
}

export default function DriveVideos({ folderId, apiKey }: DriveVideosProps) {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (!folderId) return;
      setLoading(true);
      setError(null);
      try {
        const items = await listFilesInFolder(folderId, apiKey);
        // filter video mime types if provided, otherwise try to guess by extension
        const videos = items.filter((f) => (f.mimeType || '').startsWith('video/'));
        setFiles(videos.length ? videos : items);
      } catch (err: any) {
        setError(err.message || 'Failed to load Drive files');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [folderId, apiKey]);

  if (!folderId) return null;

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-4">Course Videos</h2>
      {loading && <p className="text-gray-400">Loading videos...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && files.length === 0 && (
        <p className="text-gray-400">No video files found in the folder.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {files.map((file) => (
          <div key={file.id} className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">{file.name}</h3>
            <video
              controls
              className="w-full h-48 bg-black rounded-md"
              src={getDriveFileDownloadUrl(file.id, apiKey)}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}
