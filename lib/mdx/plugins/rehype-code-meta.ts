import type { Transformer } from "unified";
import type { Element } from "hast";
import { visit } from "unist-util-visit";

/**
 * Parses and assigns code blocks' metadata to the nodes' properties.
 *
 * Used to pass the `lang` property and other options to custom code block components.
 */
export default function rehypeCodeMeta(_options?: unknown): Transformer {
  return tree => {
    visit(tree, "element", (codeNode: Element, _index: number, preNode?: Element) => {
      // Select <pre> nodes with a <code> child
      if (codeNode.tagName !== "code" || preNode?.tagName !== "pre") return;

      // Parse the metadata and assign it to properties
      Object.assign((preNode.properties ??= {}), parseMeta(codeNode.data?.meta as string | undefined));

      // Extract and set the language from className
      const className = String([codeNode.properties?.className].flat()[0]);
      if (className) {
        preNode.properties.lang = className?.replace(/lang(?:uage)?-/, "");
      }
    });
  };
}

const MetaAttributeRegex = /([^\s=]+)(?:="([^"]+)"|=([^\s]+))?/g;

function parseMeta(meta: string | undefined): Record<string, unknown> | undefined {
  meta = meta?.trim();
  if (meta) {
    const matches = [...meta.matchAll(MetaAttributeRegex)];
    const entries = matches.map(([, key, quoted, unquoted]) => [key, quoted ?? unquoted ?? true]);
    return Object.fromEntries(entries);
  }
}
