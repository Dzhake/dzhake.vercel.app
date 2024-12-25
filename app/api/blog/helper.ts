import type { DbBlogPost } from "@lib/database/types";

export function getBlogPostUrl(post: Pick<DbBlogPost, "created_at" | "slug">) {
  return `/blog/${getBlogPostSlug(post)}`;
}

export function getBlogPostSlug(post: Pick<DbBlogPost, "created_at" | "slug">) {
  const date = new Date(post.created_at);
  return [
    date.getUTCFullYear(),
    ("" + (date.getUTCMonth() + 1)).padStart(2, "0"),
    ("" + date.getUTCDate()).padStart(2, "0"),
    post.slug,
  ].join("/");
}
