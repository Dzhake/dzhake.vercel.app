import { NextRequest } from "next/server";
import { redirect, unauthorized } from "next/navigation";
import { createServerSupabase } from "@lib/database/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const code = searchParams.get("code");
  let then = searchParams.get("then") ?? "/";
  if (!then.startsWith("/")) then = "/" + then;

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) unauthorized();
  }

  redirect(then);
}
