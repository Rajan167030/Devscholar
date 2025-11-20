export interface DriveFile {
  id: string;
  name: string;
  mimeType?: string;
}

export async function listFilesInFolder(folderId: string, apiKey?: string): Promise<DriveFile[]> {
  if (!folderId) return [];

  // If no apiKey is provided, we cannot use Google Drive API. Caller should provide it.
  if (!apiKey) return [];

  const q = encodeURIComponent(`'${folderId}' in parents and trashed=false`);
  const fields = encodeURIComponent('files(id,name,mimeType)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Drive API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return (data.files || []) as DriveFile[];
}

export function getDriveFileDownloadUrl(fileId: string, apiKey?: string) {
  if (!apiKey) return `https://drive.google.com/uc?id=${fileId}&export=download`;
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
}
