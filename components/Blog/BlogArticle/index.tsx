import { useMemo } from "react";
import { extractFrontmatter } from "@lib/mdx/frontmatter";
import type { DbBlogPostWithAuthors } from "@lib/database/types";
import { markdownClass } from "@components/Specialized/MarkdownWrapper";
import BlogArticleHeader from "./Header";
import styles from "./index.module.scss";

export interface BlogArticleProps {
  post: DbBlogPostWithAuthors;
  mdxContent: React.ReactNode;
}

export default function BlogArticle({ post, mdxContent }: BlogArticleProps) {
  const description = useMemo(() => {
    const { frontmatter } = extractFrontmatter<{ description?: string }>(post.content);
    return frontmatter?.description;
  }, [post.content]);

  return (
    <article itemProp="blogPost" className={styles.article} itemScope itemType="https://schema.org/BlogPosting">
      <meta itemProp="description" content={description || ""} />

      <BlogArticleHeader post={post} />

      <section itemProp="articleBody" id="__blogPostContainer" className={markdownClass}>
        {mdxContent}
      </section>

      <footer></footer>
    </article>
  );
}
