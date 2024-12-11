import "server-only";
import useCodeProcessor from "./utils/useCodeProcessor";
import importHighlightLanguage from "./utils/importHighlightLanguage";
import CodeBlockContainer from "./Container";
import CodeBlockHighlightRenderer from "./Renderer/highlight";
import CodeBlockPlainRenderer from "./Renderer/plain";
import type { CodeBlockProps } from ".";
export type { CodeBlockProps };

export default async function CodeBlock(props: CodeBlockProps) {
  // Server CodeBlock suspends until the necessary syntax module is loaded,
  // and then renders the code as needed. (the modules are local, so it's quick)

  await importHighlightLanguage(props.lang);
  return <CodeBlockInternal {...props} />;
}

function CodeBlockInternal({ lang, nonums, children, ...props }: CodeBlockProps) {
  const { code, highlightLines } = useCodeProcessor(children);
  const Renderer = lang ? CodeBlockHighlightRenderer : CodeBlockPlainRenderer;

  return (
    <CodeBlockContainer lang={lang} {...props}>
      <Renderer lang={lang!} code={code} highlightLines={highlightLines} nonums={nonums} />
    </CodeBlockContainer>
  );
}
