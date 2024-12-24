import { useMemo } from "react";
import NextLink from "next/link";
import { getBlogPostUrl } from "@api/blog/helper";
import type { DbBlogPostShallow } from "@lib/database/types";
import { getRelativeTimeInDays } from "@lib/utils/relativeTime";
import styles from "./index.module.scss";
import clsx from "clsx";

export interface BlogPaginationProps {
  cur: DbBlogPostShallow;
  prev?: DbBlogPostShallow;
  next?: DbBlogPostShallow;
}

export default function BlogPagination({ prev, cur, next }: BlogPaginationProps) {
  return (
    <nav className={styles.container}>
      {prev ? <BlogNavButton post={prev} current={cur} className={styles.prev} /> : <div />}
      {next ? <BlogNavButton post={next} current={cur} className={styles.next} /> : <div />}
    </nav>
  );
}

interface BlogNavButtonProps {
  post: DbBlogPostShallow;
  className: string;
  current: DbBlogPostShallow;
}
function BlogNavButton({ post, className, current }: BlogNavButtonProps) {
  const relativeTime = useMemo(() => getRelativeTimeInDays(post, current), [post, current]);

  return (
    <NextLink href={getBlogPostUrl(post)} className={clsx(styles.button, className)}>
      <div className={styles.label}>{relativeTime}</div>
      <div className={styles.title}>{post.title}</div>
    </NextLink>
  );
}
