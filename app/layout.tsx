import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.scss";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
