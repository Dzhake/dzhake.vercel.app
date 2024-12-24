import type { Transformer } from "unified";
import type { Nodes } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { visit } from "unist-util-visit";

export interface AnalysisData {
  usesCode: boolean;
  usesMath: boolean;
  usesComponents: string[];
}
export interface RemarkAnalyzeOptions {
  data?: AnalysisData;
}

/**
 * Determines what markdown features and components are used in the file.
 *
 * Unfortunately, for some reason, dynamic code-splitting doesn't work in Next.js, so it does nothing right now.
 *
 * Related issues/discussions:
 * - https://github.com/vercel/next.js/issues/69865
 * - https://github.com/vercel/next.js/issues/61066
 * - https://github.com/vercel/next.js/issues/54935
 * - https://github.com/vercel/next.js/discussions/69563
 * - https://github.com/vercel/next.js/discussions/69594
 */
export default function remarkAnalyze(options: RemarkAnalyzeOptions): Transformer<Nodes> {
  options.data ??= { usesCode: false, usesMath: false, usesComponents: [] };
  const data = options.data;

  return tree => {
    visit(tree, "code", () => {
      data.usesCode = true;
      return false;
    });

    visit(tree, "math", () => {
      data.usesMath = true;
      return false;
    });
    visit(tree, "inlineMath", () => {
      data.usesMath = true;
      return false;
    });

    visit(tree, "mdxJsxFlowElement", (node: MdxJsxFlowElement) => {
      if (!data.usesComponents.includes(node.name!)) {
        data.usesComponents.push(node.name!);
      }
    });
  };
}
