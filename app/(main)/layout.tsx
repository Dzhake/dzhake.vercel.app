import type { Metadata } from "next";
import Link from "@components/Common/Link";
import styles from "./layout.module.scss";
import { createServerSupabase } from "@lib/database/server";
import { SupabaseProvider } from "@lib/hooks/useSupabaseSession";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <SupabaseAuth>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.navbarLinks}>
            <h1>{"Dzhake"}</h1>
            <Link href="/">{"Main page"}</Link>
            <Link href="/blog">{"Blog"}</Link>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <div>
            <h4>{"Information"}</h4>
            <Link href="/about">{"About site"}</Link>
            <Link href="https://github.com/Dzhake/dzhake.vercel.app">{"GitHub repo"}</Link>
          </div>
          <div>
            <h4>{"Tools and utilities"}</h4>
            <Link href="/markdown">{"Markdown demo"}</Link>
          </div>
        </div>
        <div className={styles.footerCopyright}>
          {"Copyright © 2024 Chasmical, Dzhake"}
          <div />
        </div>
      </footer>
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

const title = "Dzhake";
const description = "";

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${title}` },
  description,
  generator: "Next.js",
  applicationName: title,
  keywords: [],
  authors: [{ name: "Chasmical", url: "/user/Chasmical" }, { name: "Dzhake", url: "/user/Dzhake" }],
  creator: "Dzhake",
  formatDetection: { email: false, address: false, telephone: false },

  openGraph: {
    type: "website",
    title: "",
    description,
    locale: "en",
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: "",
    description,
    images: [],
  },
};
