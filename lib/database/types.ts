import type { Database, Tables } from "@site/supabase/generated-types";
import type { SupabaseClient } from "@supabase/supabase-js";

export type { Database };
export type { Session as SupabaseSession, User as SupabaseUser } from "@supabase/supabase-js";

export interface Supabase extends SupabaseClient<Database> {}

export type DbUser = Tables<"users">;
export type DbLanguage = Tables<"languages">;

export type DbBlogPost = Tables<"blog_posts">;
export type DbBlogPostAuthor = Tables<"blog_post_authors">;

export interface DbBlogPostWithAuthors extends DbBlogPost {
  authors: (DbBlogPostAuthor & { user: DbUser | null })[];
}
