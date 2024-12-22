import markdown from "./content.mdx";
import { compileMdx } from "@lib/mdx";
import configurePlugins from "@lib/mdx/configure-plugins";
import configureComponents from "@lib/mdx/configure-components";
import { markdownClass } from "@components/Specialized/MarkdownWrapper";

export default async function AboutPage() {
  const { content } = await compileMdx(markdown, {
    format: "mdx",
    ...configurePlugins(),
    components: configureComponents(),
  });

  return (
    <div className={markdownClass} style={{ maxWidth: 700, margin: "2rem auto 4rem" }}>
      {content}
    </div>
  );
}
