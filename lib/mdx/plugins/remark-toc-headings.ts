import type { Transformer } from "unified";
import type { Heading as MdastHeading, HeadingData as MdastHeadingData } from "mdast";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import sluggify from "@lib/utils/sluggify";

export interface TocHeadingData {
  flat: Omit<TocHeading, "children">[];
  tree: TocHeading[];
}
export interface TocHeading {
  id?: string;
  title: string;
  depth: 1 | 2 | 3 | 4 | 5 | 6 | (number & {});
  children?: TocHeading[];
}

export interface RemarkTocHeadingsOptions {
  autoId?: boolean;
  data?: TocHeadingData;
}

interface Heading extends MdastHeading {
  data?: MdastHeadingData & { id?: string };
}

/**
 * Collects heading data for the table of contents, and generates ids for headings that are missing ids.
 */
export default function remarkTocHeadings(options: RemarkTocHeadingsOptions): Transformer {
  const autoId = options.autoId ?? true;
  options.data = { tree: [], flat: [] };
  const data = options.data;

  return tree => {
    const results: TocHeading[] = [];

    visit(tree, "heading", (node: Heading) => {
      // Stringify the heading's title
      const title = toString(node);

      // Get the heading's id, optionally generating one
      let id = node.data?.id;
      if (!id && autoId) {
        id = sluggify(title);

        (node.data ??= {}).id = id;
        (node.data.hProperties ??= {}).id = id;
      }

      const heading: TocHeading = { id, title, depth: node.depth };
      const parent = results.findLast(i => i.depth < node.depth);

      results.push(heading);
      parent && (parent.children ??= []).push(heading);
    });

    // Put all of the headings in `data.flat`
    data.flat = results;

    // Put only the top level headings in `data.tree`
    const topLevel = results.reduce((top, n) => Math.min(top, n.depth), 10);
    data.tree = results.filter(i => i.depth === topLevel);
    // TODO: handle inconsistently lower level headings in the beginning? (###, #, ##)
  };
}
