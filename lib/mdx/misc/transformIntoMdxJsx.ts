import type { Node } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

/**
 * Creates (or transforms an existing) node to a MDX JSX component.
 */
export default function transformIntoMdxJsx(
  node: Node | null | undefined,
  componentName: string | null,
  attributes?: Record<string, string>,
) {
  const mdxJsx = (node ?? {}) as MdxJsxFlowElement;

  mdxJsx.type = "mdxJsxFlowElement";
  mdxJsx.name = componentName;
  mdxJsx.attributes = attributes ? Object.entries(attributes).map(mapAttribute) : [];
  mdxJsx.children = [];

  return mdxJsx;
}

function mapAttribute([name, value]: [name: string, value: string]) {
  return { type: "mdxJsxAttribute" as const, name, value };
}
