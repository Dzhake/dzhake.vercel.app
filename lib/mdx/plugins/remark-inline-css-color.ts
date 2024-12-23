import type { Transformer } from "unified";
import type { InlineCode, Nodes } from "mdast";
import { visit } from "unist-util-visit";
import transformIntoMdxJsx from "@lib/mdx/misc/transformIntoMdxJsx";

/**
 * Converts inline code nodes containing CSS colors into <InlineCssColor> JSX nodes.
 */
export default function remarkInlineCssColor(_options?: unknown): Transformer<Nodes> {
  return tree => {
    visit(tree, "inlineCode", (node: InlineCode) => {
      if (!ColorRegex.test(node.value)) return;
      transformIntoMdxJsx(node, "InlineCssColor", { color: node.value });
    });
  };
}

// See for more info: https://www.w3.org/TR/css-color-4/#color-syntax

const num = String.raw`\d*(?:\.\d*)?`;
const percent = `(?:${num}%|0)`;
const numOrPercent = `${num}%?`;
const alpha = numOrPercent;
const hue = `${num}(?:deg|grad|rad|turn)?`;

const colorFuncs = [
  // Hex colors: #000, #0000, #000000, #00000000
  `#(?:[0-9a-fA-F]{3}){1,2}`,
  `#(?:[0-9a-fA-F]{4}){1,2}`,
  // Legacy rgb/rgba: rgba(1,2,3,0.5)
  String.raw`rgba?\(\s*${num}\s*,\s*${num}\s*,\s*${num}\s*(?:,\s*${alpha}\s*)?\)`,
  String.raw`rgba?\(\s*${percent}\s*,\s*${percent}\s*,\s*${percent}\s*(?:,\s*${alpha}\s*)?\)`,
  // Modern rgb/rgba: rgba(1 2 3/0.5)
  String.raw`rgba?\(\s*${numOrPercent}\s+${numOrPercent}\s+${numOrPercent}\s*(?:/\s*${alpha}\s*)?\)`,
  // Legacy hsl/hsla: hsl(1deg,2%,3%,0.5)
  String.raw`hsla?\(\s*${hue}\s*,\s*${percent}\s*,\s*${percent}\s*(?:,\s*${alpha}\s*)?\)`,
  // Modern hsl/hsla/hwb: hsla(1deg 2% 3%/0.5)
  String.raw`h(?:sla?|wb)\(\s*${hue}\s+${numOrPercent}\s+${numOrPercent}\s*(?:/\s*${alpha}\s*)?\)`,
];

export const ColorRegex = new RegExp(`^(${colorFuncs.join("|")})$`);
