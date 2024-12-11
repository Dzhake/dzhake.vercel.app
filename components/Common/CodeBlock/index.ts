import type { LanguageOrIconAlias } from "@lib/data/languageIconAliases";

export type { LanguageOrIconAlias, PrismLanguage } from "@lib/data/languageIconAliases";

export interface CodeBlockProps {
  lang?: LanguageOrIconAlias | (string & {});
  nonums?: boolean;
  children?: React.ReactNode;
  // ...props
  title?: string;
  nocopy?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
