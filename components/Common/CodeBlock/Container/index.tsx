import type { LanguageOrIconAlias } from "@lib/data/languageIconAliases";
import Sprite from "@components/Common/Sprite";
import styles from "./index.module.scss";
import clsx from "clsx";

export interface CodeBlockContainerProps {
  lang?: LanguageOrIconAlias | (string & {});
  title?: string;
  nocopy?: boolean;
  className?: string;
  children?: React.ReactNode;
  // ...props
  style?: React.CSSProperties;
}

export default function CodeBlockContainer({
  title,
  lang,
  nocopy,
  className,
  children,
  ...props
}: CodeBlockContainerProps) {
  return (
    <div role="panel" className={clsx(styles.container, className)} {...props}>
      {title && (
        <div className={styles.header}>
          <Sprite className={styles.fileIcon} src={`/assets/icons/seti/${lang ?? "default"}.svg`} />
          {title}
        </div>
      )}
      <div className={styles.wrapper}>{children}</div>
      {/* TODO: Copy button */}
    </div>
  );
}
