import { Children, useMemo } from "react";
import extractHighlightDirectives from "./extractHighlightDirectives";

function stringifyChildren(children: React.ReactNode, results: string[] = []) {
  Children.forEach(children, child => {
    if ((child as React.ReactElement).type === "code") {
      stringifyChildren((child as React.ReactElement<React.PropsWithChildren>).props.children, results);
    } else {
      results.push(...("" + (child || "")).split("\n"));
    }
  });
  if (!results.at(-1)) results.pop();
  return results;
}

/**
 * Transforms a node into a string of code, and extracts line-highlighting directives from it.
 */
export default function useCodeProcessor(children: React.ReactNode) {
  return useMemo(() => {
    const lines = stringifyChildren(children);
    const nums = extractHighlightDirectives(lines);

    return {
      code: lines.join("\n"),
      highlightLines: nums,
    };
  }, [children]);
}
