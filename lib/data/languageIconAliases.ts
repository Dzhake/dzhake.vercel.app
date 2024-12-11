const languageAliasesConst = [
  ["cfg", "config", "ini"],
  ["csharp", "c-sharp", "cs", "dotnet"],
  ["fsharp", "f-sharp", "fs"],
  ["c", "c", "h"],
  ["javascript", "javascript", "js"],
  ["typescript", "typescript", "ts"],
  ["markup", "xml", "csproj", "props", "targets"],
  ["markup", "html"],
  ["markup", "svg"], // custom purplish icon (see public/ folder)
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
  ["go", "go2"], // prefer "GO" logo over Gopher mascot
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
  // [undefined, "default"], // custom light-gray icon (see public/ folder)
] as const;

export type PrismLanguage = Exclude<(typeof languageAliasesConst)[number][0], undefined>;
export type SetiIcon = Exclude<(typeof languageAliasesConst)[number][1], undefined>;
export type LanguageOrIconAlias = Exclude<(typeof languageAliasesConst)[number][number], undefined>;

type LanguageAliases = [prism: string | undefined, seti: string, ...aliases: string[]];
const languageAliases = languageAliasesConst as readonly Readonly<LanguageAliases>[];

export function findPrismLanguage(name: string) {
  return languageAliases.find(aliases => aliases.includes(name))?.[0] as PrismLanguage | undefined;
}
export function findSetiIcon(name: string) {
  return languageAliases.find(aliases => aliases.includes(name))?.[1] as SetiIcon | undefined;
}

export default languageAliases;
