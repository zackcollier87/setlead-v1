export function requireTitle(value: string): string | null {
  return value.trim() ? null : 'Title is required.';
}

export function validatePdf(file: File): string | null {
  if (file.type !== 'application/pdf') return 'Only PDF files are allowed.';
  if (file.size > 25 * 1024 * 1024) return 'PDF must be 25MB or smaller.';
  return null;
}
