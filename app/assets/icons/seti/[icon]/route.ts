import { notFound } from "next/navigation";
import { findSetiIcon } from "@lib/data/languageIconAliases";

interface RouteProps {
  params: Promise<{ icon: string }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  // Resolve icon name, or throw 404 on error
  let icon: string | undefined = (await params).icon;
  icon = icon.endsWith(".svg") ? findSetiIcon(icon.slice(0, -4)) : notFound();

  const url = `https://raw.githubusercontent.com/jesseweed/seti-ui/master/icons/${icon}.svg`;
  const res = await fetch(url, { next: { revalidate: false } });
  if (res.status !== 200) notFound();

  return new Response(await res.text(), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" },
  });
}
