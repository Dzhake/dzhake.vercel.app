import type { Metadata } from "next";
import Link from "@components/Common/Link";
import styles from "./layout.module.scss";
import { SupabaseProvider } from "@lib/hooks/useSupabaseSession";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <ClientProviders>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.navbarLinks}>
            <h1>{"Dzhake"}</h1>
            <Link href="/">{"Main page"}</Link>
            {/* <Link href="/subtext">{"Subtext"}</Link> */}
            <Link href="/blog">{"Blog"}</Link>
          </div>
        </nav>
      </header>

      {children}

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <div>
            <h4>{"Information"}</h4>
            <Link href="/about">{"About chsm.dev"}</Link>
            <Link href="https://github.com/Dzhake/dzhake.vercel.app">{"GitHub repo"}</Link>
          </div>
          <div>
            <h4>{"Subtext"}</h4>
            {"Work-In-Progress"}
            {/* <Link href="/subtext">{"About Subtext"}</Link>
            <Link href="/subtext/packs/6">{"Sub packs"}</Link>
            <Link href="/subtext/collections/1">{"Sub collections"}</Link> */}
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
    </ClientProviders>
  );
}

async function ClientProviders({ children }: React.PropsWithChildren) {
  return <SupabaseProvider>{children}</SupabaseProvider>;
}

const title = "Dzhake";
const description = "A personal website for a bunch of stupid stuff";

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${title}` },
  description,
  generator: "Next.js",
  applicationName: title,
  keywords: [],
  authors: [{ name: "Chasmical", url: "/user/Chasmical" }, { name: "Dzhake", url: "/user/Dzhake" }],
  creator: "Dzhake",
  formatDetection: { email: false, address: false, telephone: false },
};
