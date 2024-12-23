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
import remarkEmbed, { RemarkEmbedOptions } from "@lib/mdx/plugins/remark-embed";
import remarkAnalyze, { RemarkAnalyzeOptions } from "./plugins/remark-analyze";
// Rehype plugins
import rehypeKatex from "./plugins/rehype-katex";
import rehypeOverrideJsx from "./plugins/rehype-override-jsx";
import rehypeCodeMeta from "./plugins/rehype-code-meta";
// Miscellaneous stuff
import KatexCopyHandler from "@lib/mdx/misc/KatexCopyHandler";

export interface MdxPluginConfigs {
  toc?: RemarkTocHeadingsOptions["data"];
  analysis?: RemarkAnalyzeOptions["data"];
  embedSize?: [width: number, height: number];
}

export default function configurePlugins(config: MdxPluginConfigs = {}) {
  const tocOptions: RemarkTocHeadingsOptions = {};
  const analysisOptions: RemarkAnalyzeOptions = {};
  const embedOptions: RemarkEmbedOptions = { size: config?.embedSize };

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
      [remarkEmbed, embedOptions],
      [remarkAnalyze, analysisOptions],
    ],
    rehypePlugins: [
      [rehypeKatex, { throwOnError: false, errorColor: "#FF0000" }],
      [rehypeOverrideJsx, {}],
      [rehypeCodeMeta, {}],
    ],
    extraOutputComponents: [KatexCopyHandler],
  };

  config.toc = tocOptions.data!;
  config.analysis = analysisOptions.data!;

  return options;
}
