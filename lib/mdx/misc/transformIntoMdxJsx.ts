import type { Node } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

/**
 * Creates (or transforms an existing) node to an MDX JSX component.
 */
export default function transformIntoMdxJsx(
  node: Node | null | undefined,
  componentName: string | null,
  attributes?: Record<string, string>,
) {
  const mdxJsx = (node ?? {}) as MdxJsxFlowElement;

  mdxJsx.type = "mdxJsxFlowElement";
  mdxJsx.name = componentName;

  // Transform node's attributes and provided attributes into MDX JSX attributes
  const attrObj = Object.assign((mdxJsx.attributes as unknown) ?? {}, attributes);
  mdxJsx.attributes = Object.entries(attrObj).map(([name, value]) => ({ type: "mdxJsxAttribute", name, value }));

  // Remove all the node's children; MDX JSX components probably don't need them,
  // unless they're directives, in which case it's handled in the directives plugin.
  mdxJsx.children = [];

  return mdxJsx;
}
