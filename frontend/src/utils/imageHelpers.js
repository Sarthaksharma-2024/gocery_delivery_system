export const BACKEND_URL = 'http://localhost:4000';

export const resolveImageSrc = (image, imageUrl) => {
  const raw = image || imageUrl;
  if (!raw || typeof raw !== 'string') return '';

  if (raw.startsWith('http')) return raw;
  if (raw.startsWith('/')) return encodeURI(raw);
  return `${BACKEND_URL}/uploads/${encodeURIComponent(raw)}`;
};
