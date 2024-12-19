import type { Transformer } from "unified";
import { visit } from "unist-util-visit";

/**
 * Allows overriding native elements created through JSX syntax in markdown with custom components.
 *
 * By default, MDX only converts markdown nodes into custom components, and leaves JSX as is.
 *
 * https://github.com/mdx-js/mdx/pull/2052#issuecomment-1140519087
 */
export default function rehypeOverrideJsx(_options?: unknown): Transformer {
  return tree => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, (node: any) => void delete node.data?._mdxExplicitJsx);
  };
}
