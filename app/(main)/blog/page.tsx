import { notFound } from "next/navigation";
import { createServerSupabase } from "@lib/database/server";
import { getAllBlogPostsShallow, getBlogPostById } from "@api/blog";
import { compileMdx } from "@lib/mdx";
import configurePlugins, { MdxPluginConfigs } from "@lib/mdx/configure-plugins";
import configureComponents from "@lib/mdx/configure-components";
import BlogLayout from "@components/Blog/BlogLayout";
import BlogSidebar from "@components/Blog/BlogSidebar";
import BlogArticle from "@components/Blog/BlogArticle";
import BlogPagination from "@components/Blog/BlogPagination";
import BlogToc from "@components/Blog/BlogToc";

export default async function BlogLandingPage() {
  // Select all blog posts (shallow) and then the most recent one (throw notFound on errors)
  const supabase = createServerSupabase("anonymous", { revalidate: 300 });
  const recent = (await getAllBlogPostsShallow(supabase)) || notFound();
  const newest = (await getBlogPostById(supabase, recent![0].id)) || notFound();

  // Configure and compile the markdown
  const mdxOptions: MdxPluginConfigs = { embedSize: [480, 270] };

  const { content } = await compileMdx(newest.content, {
    format: "mdx",
    ...configurePlugins(mdxOptions),
    components: configureComponents(),
  });

  return (
    <BlogLayout
      sidebar={<BlogSidebar posts={recent} />}
      article={
        <>
          <BlogArticle mdxContent={content} post={newest} />
          <BlogPagination cur={newest} prev={recent[1]} />
        </>
      }
      toc={<BlogToc toc={mdxOptions.toc!} />}
    />
  );
}
