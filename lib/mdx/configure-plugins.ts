import type { MdxOptions } from "@lib/mdx";
// Remark plugins
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-custom-heading-id";
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

export default function configurePlugins(_config?: unknown) {
  const analysisOptions: RemarkAnalyzeOptions = {};

  const options: Pick<MdxOptions, "remarkPlugins" | "rehypePlugins"> = {
    remarkPlugins: [
      [remarkGfm, { singleTilde: false }],
      remarkHeadingId,
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
  };

  // const analysis = analysisOptions.data!;

  return options;
}
