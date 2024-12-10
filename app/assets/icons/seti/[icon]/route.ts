import { notFound } from "next/navigation";

interface RouteProps {
  params: Promise<{ icon: string }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  let icon = (await params).icon;

  // Resolve icon name, or throw 404 on error
  icon = icon.endsWith(".svg") ? icon.slice(0, -4) : notFound();
  icon = setiIcons.find(n => n.includes(icon!))?.[0] || notFound();

  const url = `https://raw.githubusercontent.com/jesseweed/seti-ui/master/icons/${icon}.svg`;
  const res = await fetch(url, { next: { revalidate: false } });
  if (res.status !== 200) notFound();

  return new Response(await res.text(), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" },
  });
}

// Allowed Seti UI icons: [iconName, ...aliases]
const setiIcons: readonly string[][] = [
  ["c-sharp", "cs", "csharp"],
  ["c", "h"],
  ["config", "cfg", "ini"],
  ["cpp"],
  ["css"],
  ["csv"],
  // ["default"], // custom light-gray icon (see public/ folder)
  ["docker"],
  ["editorconfig"],
  ["eslint"],
  ["f-sharp", "fs", "fsharp"],
  ["git", "gitignore", "gitattributes"],
  ["go"],
  ["hex"],
  ["html"],
  ["javascript", "js"],
  ["json"],
  ["kotlin"],
  ["less"],
  ["license"],
  ["lua"],
  ["makefile"],
  ["markdown", "md", "mdx"],
  ["php"],
  ["powershell", "ps", "ps1"],
  ["python", "py"],
  ["react", "jsx", "tsx"],
  ["rust", "rs"],
  ["sass", "scss"],
  ["shell", "sh", "bash"],
  // ["svg"], // custom purplish icon (see public/ folder)
  ["tsconfig"],
  ["typescript", "ts"],
  ["xml", "csproj", "props", "targets"],
  ["yml", "yaml"],
];
