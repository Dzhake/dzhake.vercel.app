import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createServerSupabase } from "@lib/database/server";
import { getAllBlogPostsShallow, getBlogPostFromParams, getBlogPostSlug, getBlogPostUrl } from "@api/blog";
import { compileMdx } from "@lib/mdx";
import { extractFrontmatter } from "@lib/mdx/frontmatter";
import configurePlugins, { MdxPluginConfigs } from "@lib/mdx/configure-plugins";
import configureComponents from "@lib/mdx/configure-components";
import BlogLayout from "@components/Blog/BlogLayout";
import { markdownClass } from "@components/Specialized/MarkdownWrapper";
import BlogPagination from "@components/Blog/BlogPagination";
import BlogSidebar from "@components/Blog/BlogSidebar";
import BlogToc from "@components/Blog/BlogToc";

interface PageProps {
  params: Promise<{ yyyy: string; MM: string; dd: string; slug: string }>;
}

export default async function BlogPostPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;

  // Find the matching post (throw notFound on error)
  const supabase = createServerSupabase("anonymous", { revalidate: 300 });
  const post = (await getBlogPostFromParams(supabase, params)) || notFound();

  // If no slug is specified, redirect to URL with the slug
  if (!params.slug) redirect(getBlogPostUrl(post));

  // Get the latest blog posts (shallow) to display in the sidebar (throw notFound on error)
  const recent = (await getAllBlogPostsShallow(supabase)) || notFound();
  const curIndex = recent.findIndex(p => p.id === post.id);

  // Configure and compile the markdown
  const mdxOptions: MdxPluginConfigs = { embedSize: [480, 270] };

  const { content } = await compileMdx(post.content, {
    format: "mdx",
    ...configurePlugins(mdxOptions),
    components: configureComponents(),
  });

  return (
    <BlogLayout
      sidebar={<BlogSidebar posts={recent} />}
      article={
        <>
          <div id="__blogPostContainer" className={markdownClass}>
            <h1>{post.title}</h1>
            {content}
          </div>
          <BlogPagination cur={post} prev={recent[curIndex + 1]} next={recent[curIndex - 1]} />
        </>
      }
      toc={<BlogToc toc={mdxOptions.toc!} />}
    />
  );
}

export async function generateStaticParams(): Promise<Awaited<PageProps["params"]>[]> {
  // Get the latest blog posts (shallow) to pre-render (throw notFound on error)
  const supabase = createServerSupabase("anonymous", { revalidate: 300 });
  const recent = (await getAllBlogPostsShallow(supabase)) || [];

  // Map existing posts into params
  return recent.map(post => {
    const parts = getBlogPostSlug(post);
    return { yyyy: parts[0], MM: parts[1], dd: parts[2], slug: parts[3] };
  });
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const params = await paramsPromise;

  // Find the matching post (throw notFound on error)
  const supabase = createServerSupabase("anonymous", { revalidate: 300 });
  const post = (await getBlogPostFromParams(supabase, params)) || notFound();

  // If no slug is specified, redirect to URL with the slug
  if (!params.slug) redirect(getBlogPostUrl(post));

  // Extract metadata from frontmatter
  type Frontmatter = { title?: string; description?: string };
  const { frontmatter } = extractFrontmatter<Frontmatter>(post.content);

  const title = frontmatter?.title ?? post.title;
  const description = frontmatter?.description;

  return {
    title,
    description,
    authors: post.authors.map(a => ({ name: a.user?.username, url: `/user/${a.user?.slug ?? a.user_id}` })),
    category: "Blog posts",

    openGraph: {
      type: "article",
      section: "Blog posts",
      title,
      description,
      url: getBlogPostUrl(post),
      authors: post.authors.map(a => a.user?.username).filter(a => a != null),
      publishedTime: post.created_at,
      modifiedTime: post.edited_at ?? undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
