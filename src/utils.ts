/**
 * Utility for handling professional file downloads for Mubin Roshan's portfolio.
 */
export function handleDownloadResume() {
  const link = document.createElement('a');
  link.href = '/mubin_resume.pdf';
  link.download = 'mubin_resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Calculates estimated reading time based on word count.
 * Assumes average speaking/reading speed of 200 words per minute.
 */
export function getReadingTime(content: string): string {
  if (!content) return '1 min read';
  const wordsCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordsCount / 200));
  return `${minutes} min read`;
}
