"use client";
import useCodeProcessor from "./utils/useCodeProcessor";
import useHighlightLanguage from "./utils/useHighlightLanguage";
import CodeBlockContainer from "./Container";
import CodeBlockHighlightRenderer from "./Renderer/highlight";
import CodeBlockPlainRenderer from "./Renderer/plain";
import type { CodeBlockProps } from ".";

export type { CodeBlockProps, LanguageOrIconAlias, PrismLanguage } from ".";

export default function CodeBlock({ lang, nonums, children, ...props }: CodeBlockProps) {
  /**
   * Client CodeBlock renders plain text at first, but after loading
   * all the necessary syntax modules renders the code properly.
   */

  const prismLang = useHighlightLanguage(lang);
  const { code, highlightLines } = useCodeProcessor(children);
  const Renderer = prismLang ? CodeBlockHighlightRenderer : CodeBlockPlainRenderer;

  return (
    <CodeBlockContainer lang={lang} {...props}>
      <Renderer lang={prismLang!} code={code} highlightLines={highlightLines} nonums={nonums} />
    </CodeBlockContainer>
  );
}
