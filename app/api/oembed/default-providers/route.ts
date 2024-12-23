import { NextRequest, NextResponse } from "next/server";
import { fetchDefaultProviders } from "@api/oembed/default-providers";

export async function GET(_request: NextRequest) {
  return NextResponse.json(await fetchDefaultProviders().catch(() => []));
}
