import markdown from "./content.mdx";
import { compileMdx } from "@lib/mdx";
import configurePlugins from "@lib/mdx/configure-plugins";
import configureComponents from "@lib/mdx/configure-components";
import { markdownClass } from "@components/Specialized/MarkdownWrapper";

export default async function MarkdownPage() {
  const { content } = await compileMdx(markdown, {
    format: "mdx",
    ...configurePlugins({ embedSize: [480, 270] }),
    components: configureComponents(),
  });

  return (
    <main className={markdownClass} style={{ maxWidth: "60vw", margin: "2rem auto 4rem" }}>
      {content}
    </main>
  );
}
