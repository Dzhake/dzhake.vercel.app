export interface CodeBlockProps {
  title?: string;
  lang?: string;
  nonums?: boolean;
  nocopy?: boolean;
  className?: string;
  children?: React.ReactNode;
  // ...props
  style?: React.CSSProperties;
}
