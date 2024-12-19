import type { VFile } from "vfile";
import { load as yamlParse } from "js-yaml";

// Code adapted from:
// - https://github.com/vfile/vfile-matter (needed to add leading whitespace to the regex)

export type VFileLike = VFile | { value: string };

const frontmatterRegex = /^\s*---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/;

export function extractFrontmatter<T>(file: string): { frontmatter?: T; source?: string };
export function extractFrontmatter<T>(file: VFileLike, strip?: boolean): { frontmatter?: T; source?: string };
export function extractFrontmatter<T>(file: VFileLike | string, strip = false): { frontmatter?: T; source?: string } {
  const fileString = typeof file === "string" ? file : "dirname" in file ? String(file) : file.value;

  const match = frontmatterRegex.exec(fileString);
  if (match && strip) {
    (file as VFileLike).value = fileString.slice(match[0].length);
  }
  const source = match?.[1];
  const frontmatter = (source && (yamlParse(source) as T)) as T | undefined;

  return { frontmatter, source };
}
