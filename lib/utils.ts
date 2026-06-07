/**
 * Utility for combining Tailwind CSS class names.
 */
export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
