import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { createServerSupabase } from "@lib/database/server";
import { SupabaseProvider } from "@lib/hooks/useSupabaseSession";
import "./global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "chsm.dev",
  description: "A personal website for a bunch of stupid stuff",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <SupabaseAuth>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SupabaseAuth>
  );
}

async function SupabaseAuth({ children }: React.PropsWithChildren) {
  const supabase = await createServerSupabase();
  supabase.auth["suppressGetSessionWarning"] = true;
  // getSession() gets an unverified session, so it's pretty quick, 3-10 ms
  const session = (await supabase.auth.getSession()).data.session;

  return <SupabaseProvider initialSession={session}>{children}</SupabaseProvider>;
}
