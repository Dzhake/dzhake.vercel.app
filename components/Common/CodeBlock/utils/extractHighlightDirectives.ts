const commentRegex = /\s*(?:\/\*(.+?)\*\/|\/\/(.+)|{\/\*(.+?)\*\/}|<!--(.+?)-->)\s*/g;

/**
 * Extracts indices of the lines to highlight, and removes the highlight directives from the array.
 *
 * Supported comment types:
 * - `// highlight`
 * - `/* highlight * /`
 * - `{/* highlight * /}`
 * - `<!-- highlight -->`
 */
export default function extractHighlightDirectives(lines: string[]): number[] {
  const nums: number[] = [];
  let highlightStart: number | null = null;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Find all potential directives on every line
    for (const match of line.matchAll(commentRegex)) {
      const text = match.find((e, i) => e && i);

      if (text?.trimStart().startsWith("highlight")) {
        const directive = text.trim().slice("highlight ".length);
        // When the directive is extracted, the highlight position may need to be decremented once
        let decrementOnEmpty = false;

        switch (directive.replace(" ", "-")) {
          case "":
          case "this":
          case "this-line":
            nums.push(i);
            break;
          case "next":
          case "next-line":
            nums.push(i + 1);
            decrementOnEmpty = true;
            break;
          case "begin":
          case "start":
            if (highlightStart !== null) continue;
            highlightStart = i;
            break;
          case "end":
          case "finish":
            if (highlightStart === null) continue;
            for (let j = highlightStart; j <= i; j++) nums.push(j);
            highlightStart = null;
            decrementOnEmpty = true;
            break;
          default:
            continue;
        }

        // Extract the directive from the line
        line = line.replace(match[0], "");
        if (line.trim()) {
          // If there's still something on it, keep it
          lines[i] = line;
        } else {
          // Otherwise, remove the line completely
          lines.splice(i--, 1);
          if (decrementOnEmpty) nums[nums.length - 1]--;
        }
      }
    }
  }

  return nums;
}
