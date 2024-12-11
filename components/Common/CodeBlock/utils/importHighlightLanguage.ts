import { refractor } from "refractor";

// TODO: combine prism/refractor language and seti icon lookups into one, and put it in @lib/
const prismLangAliases: Record<string, string | undefined> = {
  js: "javascript",
  ts: "typescript",
  cs: "csharp",
  csproj: "markup",
  xml: "markup",
  html: "markup",
  svg: "markup",
  yml: "yaml",
  cfg: "ini",
  md: "markdown",
  mdx: "markdown",
  sh: "bash",
  shell: "bash",
  ps: "powershell",
  py: "python",
};

export default async function importHighlightLanguage(languageName: string | undefined) {
  const lang = prismLangAliases[languageName!] ?? languageName;
  if (lang) {
    try {
      refractor.register((await import(`refractor/lang/${lang}.js`)).default);
      return lang;
    } catch {
      console.error(`"${lang}" is not a valid Refractor/PrismJS language.`);
    }
  }
}
