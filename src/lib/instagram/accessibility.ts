const ACCESSIBLE_LABEL_MAX_LENGTH = 80;

export function getInstagramPostAccessibleLabel(caption: string, fallback: string): string {
  const normalizedCaption = caption.replace(/\s+/g, ' ').trim();
  const captionWithoutHashtags = normalizedCaption
    .replace(/(^|\s)#[^\s#]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!captionWithoutHashtags) {
    return fallback;
  }

  if (captionWithoutHashtags.length <= ACCESSIBLE_LABEL_MAX_LENGTH) {
    return captionWithoutHashtags;
  }

  return `${captionWithoutHashtags.slice(0, ACCESSIBLE_LABEL_MAX_LENGTH - 1).trimEnd()}…`;
}
