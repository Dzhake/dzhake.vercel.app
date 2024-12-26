import { NextRequest, NextResponse } from "next/server";
import { findSetiIcon } from "@lib/data/languageIconAliases";
import { notFound } from "next/navigation";

interface RouteProps {
  params: Promise<{ icon: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteProps) {
  // Resolve icon name, or throw 404 on error
  let icon = (await params).icon;
  icon = (icon.endsWith(".svg") && findSetiIcon(icon.slice(0, -4))) || notFound();

  // At this point, `icon` is defined in languageIconAliases file, so it should exist
  const url = `https://raw.githubusercontent.com/jesseweed/seti-ui/master/icons/${icon}.svg`;
  const res = await fetch(url, { next: { revalidate: false } });
  if (!res.ok) throw new Error(`seti-ui icon "${icon}" (${res.status} ${res.statusText})`);

  return new NextResponse(await res.text(), {
    headers: {
      // Serve as SVG, cache for 1 day
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
      Etag: res.headers.get("Etag")!,
    },
  });
}
