import { NextRequest, NextResponse } from "next/server";
import { fetchDefaultProviders } from ".";

export async function GET(_request: NextRequest) {
  const providers = await fetchDefaultProviders().catch(() => []);

  return NextResponse.json(providers, {
    headers: {
      // Cache for 1 hour
      "Cache-Control": "public, max-age=3600",
    },
  });
}
