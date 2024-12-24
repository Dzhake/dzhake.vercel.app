"use client";
import { createBrowserClient } from "@supabase/ssr";
import type { Supabase } from "@lib/database/types";
export type { Supabase } from "@lib/database/types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getClientSupabase(): Supabase {
  return createBrowserClient(url, key);
}

const useSupabase = getClientSupabase;
export default useSupabase;
