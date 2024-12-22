import type { MdxOptions } from "@lib/mdx";
// Remark plugins
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-custom-heading-id";
import remarkTocHeadings, { RemarkTocHeadingsOptions } from "./plugins/remark-toc-headings";
import remarkDirective from "remark-directive";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import remarkInlineCssColor from "./plugins/remark-inline-css-color";
import remarkEmoji from "./plugins/remark-emoji";
import remarkAnalyze, { RemarkAnalyzeOptions } from "./plugins/remark-analyze";
// Rehype plugins
import rehypeKatex from "./plugins/rehype-katex";
import rehypeOverrideJsx from "./plugins/rehype-override-jsx";
import rehypeCodeMeta from "./plugins/rehype-code-meta";
// Miscellaneous stuff
import KatexCopyHandler from "@lib/mdx/misc/KatexCopyHandler";

export default function configurePlugins(_config?: unknown) {
  const tocOptions: RemarkTocHeadingsOptions = {};
  const analysisOptions: RemarkAnalyzeOptions = {};

  const options: Pick<MdxOptions, "remarkPlugins" | "rehypePlugins" | "extraOutputComponents"> = {
    remarkPlugins: [
      [remarkGfm, { singleTilde: false }],
      remarkHeadingId,
      [remarkTocHeadings, tocOptions],
      remarkDirective,
      remarkBreaks,
      [remarkMath, { singleDollarTextMath: false }],
      [remarkInlineCssColor, {}],
      [remarkEmoji, {}],
      [remarkAnalyze, analysisOptions],
    ],
    rehypePlugins: [
      [rehypeKatex, { throwOnError: false, errorColor: "#FF0000" }],
      [rehypeOverrideJsx, {}],
      [rehypeCodeMeta, {}],
    ],
    extraOutputComponents: [KatexCopyHandler],
  };

  // const analysis = analysisOptions.data!;
  // const toc = tocOptions.data!;

  return options;
}
