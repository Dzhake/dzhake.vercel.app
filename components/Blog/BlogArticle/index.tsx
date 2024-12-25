import { useMemo } from "react";
import { extractFrontmatter } from "@lib/mdx/frontmatter";
import type { DbBlogPostWithAuthors } from "@lib/database/types";
import { markdownClass } from "@components/Specialized/MarkdownWrapper";
import DateTime from "@components/Specialized/DateTime";
import Link from "@components/Common/Link";
import NextLink from "next/link";
import styles from "./index.module.scss";
import Avatar from "@components/Common/Avatar";

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

      <header>
        <h1 itemProp="headline" className={styles.headline}>
          {post.title}
        </h1>
        <div className={styles.headerInfo}>
          <div>
            <DateTime itemProp="datePublished" dateTime={post.created_at} format="date" />
            {" ⋅ "}
            <ReadingTime content={post.content} wordsPerMinute={200} />
          </div>
          <div className={styles.authorsList}>
            {post.authors.map(author => {
              const url = `/user/${author.user?.slug ?? author.user_id}`;

              return (
                <div className={styles.author} key={author.id}>
                  <NextLink href={url} className={styles.authorAvatarLink}>
                    <Avatar size={32} src={author.user?.avatar_url ?? undefined} />
                  </NextLink>
                  <div className={styles.authorInfo}>
                    <Link href={url}>{author.user?.username}</Link>
                    {author.label && <span>{author.label}</span>}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.tagsRow}>
            {post.tags.length ? (
              <>
                <b>{"Tags:"}</b>
                <ul className={styles.tagsList}>
                  {post.tags.map(tag => (
                    <li key={tag}>
                      <NextLink href="#" className={styles.tagLink}>
                        {tag}
                      </NextLink>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </header>
      <section itemProp="articleBody" id="__blogPostContainer" className={markdownClass}>
        {mdxContent}
      </section>
      <footer></footer>
    </article>
  );
}

interface ReadingTimeProps {
  content: string;
  wordsPerMinute: number;
}
function ReadingTime({ content, wordsPerMinute }: ReadingTimeProps) {
  const wordCount = useMemo(() => content.split(/[\s\r\n]+/g).length, [content]);

  return (
    <span title={`Approx. ${wordCount} words, at ${wordsPerMinute} words per minute.`}>
      {Math.ceil(wordCount / wordsPerMinute)}
      {" min read"}
    </span>
  );
}
