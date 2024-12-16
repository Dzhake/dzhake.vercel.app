import "server-only";
import useCodeProcessor from "./utils/useCodeProcessor";
import importHighlightLanguage from "./utils/importHighlightLanguage";
import CodeBlockContainer from "./Container";
import CodeBlockHighlightRenderer from "./Renderer/highlight";
import CodeBlockPlainRenderer from "./Renderer/plain";
import type { CodeBlockProps, PrismLanguage } from ".";

export type { CodeBlockProps, LanguageOrIconAlias, PrismLanguage } from ".";

export default async function CodeBlock(props: CodeBlockProps) {
  /**
   * Server CodeBlock suspends until the necessary syntax module is loaded,
   * and then renders the code as needed. (the modules are local, so it's quick)
   */

  const prismLang = await importHighlightLanguage(props.lang);
  return <CodeBlockInternal {...props} prismLang={prismLang} />;
}

function CodeBlockInternal({ nonums, children, prismLang, ...props }: CodeBlockProps & { prismLang?: PrismLanguage }) {
  const { code, highlightLines } = useCodeProcessor(children);
  const Renderer = prismLang ? CodeBlockHighlightRenderer : CodeBlockPlainRenderer;

  return (
    <CodeBlockContainer {...props}>
      <Renderer lang={prismLang!} code={code} highlightLines={highlightLines} nonums={nonums} />
    </CodeBlockContainer>
  );
}
