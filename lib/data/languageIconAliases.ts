export type LanguageAliases = [prism: string | undefined, seti: string, ...aliases: string[]];

const languageAliases: LanguageAliases[] = [
  ["cfg", "config", "ini"],
  ["csharp", "c-sharp", "cs", "c#", "dotnet"],
  ["fsharp", "f-sharp", "fs", "f#"],
  ["c", "c", "h"],
  ["javascript", "javascript", "js"],
  ["typescript", "typescript", "ts"],
  ["markup", "xml", "csproj", "props", "targets"],
  ["markup", "html"],
  ["markup", "svg"], // custom purplish icon (see public/ folder)
  ["yaml", "yml"],
  ["markdown", "markdown", "md", "mdx"],
  [undefined, "git", "gitignore", "gitattributes"],
  ["bash", "shell", "sh", "bash"],
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
  ["jsx", "react", "jsx"],
  ["tsx", "react", "tsx"],
  ["rust", "rust", "rs"],
  ["json", "tsconfig"],
  ["java", "java"],
  ["latex", "tex", "katex"],
  // [undefined, "default"], // custom light-gray icon (see public/ folder)
];

export function findPrismLanguage(name: string) {
  return languageAliases.find(arr => arr.includes(name))?.[0];
}
export function findSetiIcon(name: string) {
  return languageAliases.find(arr => arr.includes(name))?.[1];
}

export default languageAliases;
