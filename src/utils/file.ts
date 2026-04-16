export async function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return await file.arrayBuffer();
}

export async function fileToBlob(file: File): Promise<Blob> {
  return new Blob([await file.arrayBuffer()], { type: file.type || 'application/pdf' });
}
