import "server-only";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"], style: ["normal", "italic"] });

export const JetBrains_Mono_NL = localFont({
  src: "./JetBrains Mono NL.ttf",
  variable: "--mono-font",
  adjustFontFallback: false,
  preload: false,

  fallback: [
    "JetBrains Mono NL",
    "JetBrains Mono",
    "Cascadia Mono",
    "Consolas",
    "Courier New Mono",
    "Segoe UI Mono",
    "Roboto Mono",
    "Oxygen Mono",
    "Ubuntu Monospace",
    "Source Code Pro",
    "Fira Mono",
    "Droid Sans Mono",
    "ui-monospace",
    "monospace",
  ],
});
