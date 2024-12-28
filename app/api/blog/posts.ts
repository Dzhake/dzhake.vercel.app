import "server-only";
import type { DbBlogPostShallow, DbBlogPostWithAuthors, DbUser } from "@lib/database/types";

function newPost(title:string, content:string, id:number, is_public:boolean,
created_at:string, edited_at:string | null, tags:string[], slug:string | null,
authors:(DbBlogPostAuthor & {user: DbUser | null})[] |null):DbBlogPostWithAuthors {
  is_public = is_public ?? true;
  slug = slug ?? title.toLowerCase().replaceAll(" ", "-");
  authors = authors ?? []
  return {
    id: id,
    created_at: created_at,
    edited_at: edited_at,
    title: title,
    content: content,
    is_public: is_public,
    tags: tags,
    slug: slug,
    authors: authors,
  };
}

//id: number, created_at:string, edited_at:string, title, content, is_public, tags:string[], slug:string,
export const posts: DbBlogPostWithAuthors[] = [
  newPost("Making the site", "foisauooo!!-=fsa", 0, true, "2024-12-28T08:00:00Z", null, ["test", "website"], null, null),
];
