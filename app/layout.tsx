import type { Metadata } from "next";
import { inter, JetBrains_Mono_NL } from "@app/fonts";
import "./global.scss";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "chsm.dev",
  description: "A personal website for a bunch of stupid stuff",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, JetBrains_Mono_NL.variable)}>{children}</body>
    </html>
  );
}
