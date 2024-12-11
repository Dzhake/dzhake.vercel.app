import { memo } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

export interface CodeBlockPlainRendererProps {
  code: string;
  highlightLines?: number[];
  nonums?: boolean;
}

const CodeBlockPlainRenderer = memo(function CodeBlockPlainRenderer(props: CodeBlockPlainRendererProps) {
  const { code, highlightLines, nonums } = props;

  const getLineClass = (index: number) => {
    return highlightLines?.includes(index) ? styles.highlighted : undefined;
  };

  return (
    <pre className={styles.pre}>
      <code className={clsx(styles.code, nonums && styles.nonums)}>
        {code.split("\n").map((line, index) => (
          <span key={index} className={getLineClass(index)}>
            {line}
            {"\n"}
          </span>
        ))}
      </code>
    </pre>
  );
});

export default CodeBlockPlainRenderer;
