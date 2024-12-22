/**
 * Converts a string to a simple lowercase URL slug, that only uses `[0-9a-z-]` characters.
 */
export default function sluggify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^0-9a-z-]+/g, " ")
    .trim()
    .replaceAll(" ", "-");
}
