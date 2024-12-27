const languageIconAliasesConst = [
  ["cfg", "config", "ini"],
  ["csharp", "c-sharp", "cs", "dotnet"],
  ["fsharp", "f-sharp", "fs"],
  ["c", "c", "h"],
  ["javascript", "javascript", "js"],
  ["typescript", "typescript", "ts"],
  ["markup", "xml", "csproj", "props", "targets"],
  ["markup", "html"],
  ["markup", "svg"], // Custom purplish icon (see public/ folder)
  ["yaml", "yml"],
  ["markdown", "markdown", "md", "mdx"],
  [undefined, "git", "gitignore", "gitattributes"],
  ["bash", "shell", "sh"],
  ["powershell", "powershell", "ps", "ps1"],
  ["python", "python", "py"],
  [undefined, "editorconfig"],
  ["cpp", "cpp", "c++"],
  ["css", "css"],
  ["scss", "sass"],
  ["csv", "csv"],
  [undefined, "docker"],
  [undefined, "eslint"],
  ["go", "go2"], // Prefer "GO" logo over Gopher mascot
  [undefined, "hex"],
  ["json", "json"],
  ["kotlin", "kotlin", "kt", "ks"],
  ["less", "less"],
  [undefined, "license"],
  ["lua", "lua"],
  ["makefile", "makefile"],
  ["php", "php"],
  ["jsx", "react"],
  ["tsx", "react"],
  ["rust", "rust", "rs"],
  ["json", "tsconfig"],
  ["java", "java"],
  ["latex", "tex", "katex"],
  // [undefined, "default"], // Custom light-gray icon (see public/ folder)
] as const;

export type PrismLanguage = Exclude<(typeof languageIconAliasesConst)[number][0], undefined>;
export type SetiIcon = Exclude<(typeof languageIconAliasesConst)[number][1], undefined>;
export type LanguageOrIconAlias = Exclude<(typeof languageIconAliasesConst)[number][number], undefined>;

type LanguageIconAliases = [prism: string | undefined, seti: string, ...aliases: string[]];
const languageIconAliases = languageIconAliasesConst as readonly Readonly<LanguageIconAliases>[];

export function findPrismLanguage(name: string | undefined) {
  if (name) return languageIconAliases.find(aliases => aliases.includes(name))?.[0] as PrismLanguage | undefined;
}
export function findSetiIcon(name: string | undefined) {
  if (name) return languageIconAliases.find(aliases => aliases.includes(name))?.[1] as SetiIcon | undefined;
}

export default languageIconAliases;
