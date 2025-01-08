import { NextRequest } from "next/server";
import { notFound, redirect } from "next/navigation";
import { createServerSupabase } from "@lib/database/server";
import { getBlogPostFromParams, getBlogPostUrl } from "@api/blog";

interface RouteProps {
  params: Promise<{ yyyy: string; MM: string; dd: string }>;
}

export async function GET(_request: NextRequest, { params: paramsPromise }: RouteProps) {
  const params = await paramsPromise;

  // Find the matching post (throw notFound on error)
  const supabase = createServerSupabase("anonymous", { revalidate: 300 });
  const post = (await getBlogPostFromParams(supabase, params)) || notFound();

  // Redirect to path with slug
  redirect(getBlogPostUrl(post));
}
