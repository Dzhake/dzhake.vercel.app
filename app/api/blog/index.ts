import "server-only";
import type { DbBlogPostShallow, DbBlogPostWithAuthors } from "@lib/database/types";
import { posts } from "./posts";
export { getBlogPostSlug, getBlogPostUrl } from "./helper";


/** Selects a single blog post with the specified id. */
export function getBlogPostById(id: number): DbBlogPostWithAuthors | undefined {
  return posts.find(post => post.id === id);
}

/** Searches for blog posts within the specified date range, and, optionally, with the specified slug. */
export function searchBlogPosts(range: Date | [start: Date, end: Date],  slug?: string): DbBlogPostWithAuthors[] | undefined {
  // If not an array, turn Date into a one-day range
  const [start, end] = Array.isArray(range) ? range : [range, new Date(+range + 24 * 3600 * 1000)];

  let found: DbBlogPostWithAuthors[] = [];
  for (const post of posts) {
    if (slug && slug == post.slug) return [post];
    const created:number = Date.parse(post.created_at);
    if (created > start.getTime() && created < end.getTime()) found.push(post);
  }

  return found;
}

/** Shallowly selects all blog posts, sorted from newest to oldest. */
export function getAllBlogPostsShallow(): DbBlogPostShallow[] | undefined {
  return posts.slice().reverse();
}

type BlogPostParams = { yyyy: string; MM: string; dd: string; slug?: string };

/** Searches for a blog post matching the specified route parameters. */
export function getBlogPostFromParams(params: BlogPostParams): DbBlogPostWithAuthors|null {
  const { yyyy, MM, dd, slug } = params;

  // Parse the date and ensure it's valid
  const date = new Date(`${yyyy}-${MM}-${dd}Z`);
  if (Number.isNaN(+date)) return null;

  // Select the matching post
  return (searchBlogPosts(date, slug))?.[0] ?? null;
}
