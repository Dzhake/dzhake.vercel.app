import type { RefractorRoot, RefractorElement as RfElem, Text } from "refractor";

export type RefractorElement = RfElem & {
  properties: { className: string[] };
  children: (RefractorElement | Text)[];
};

export type RefractorToken = RefractorElement | Text;

// The following code is adapted from the prism-react-renderer package:
// - https://github.com/FormidableLabs/prism-react-renderer/blob/master/packages/prism-react-renderer/src/utils/normalizeTokens.ts

const newLineRegex = /\r\n|\r|\n/;

function normalizeEmptyLines(line: RefractorToken[]) {
  if (line.length === 0) {
    line.push({
      type: "element",
      tagName: "span",
      properties: { className: ["plain"] },
      children: [{ type: "text", value: "\n" }],
    });
  } else if (line.length === 1 && (line[0] as Text).value === "") {
    line[0] = {
      type: "element",
      tagName: "span",
      properties: { className: ["plain"] },
      children: [{ type: "text", value: "\n" }],
    };
  }
}

function appendClasses(classes: string[], add: string[] | string): string[] {
  if (Array.isArray(add) && add[0] === "token") return add;
  if (classes.length > 0 && classes[classes.length - 1] === add) return classes;
  return classes.concat(add);
}

/**
 * Transforms the Refractor's AST into a flattened array of tokens, grouped by line.
 */
export default function normalizeTokens(ast: RefractorRoot): RefractorToken[][] {
  const tokens = ast.children as RefractorToken[];

  const typeArrStack: string[][] = [[]];
  const tokenArrStack = [tokens];
  const tokenArrIndexStack = [0];
  const tokenArrSizeStack = [tokens.length];

  let i = 0;
  let stackIndex = 0;
  let currentLine: RefractorToken[] = [];
  const acc = [currentLine];

  while (stackIndex > -1) {
    while ((i = tokenArrIndexStack[stackIndex]++) < tokenArrSizeStack[stackIndex]) {
      let classes = typeArrStack[stackIndex];
      const token = tokenArrStack[stackIndex][i];

      // Determine type, and append to classNames if necessary
      if (token.type === "text") {
        classes = stackIndex > 0 ? classes : ["plain"];
      } else {
        classes = appendClasses(classes, token.properties.className);
        // if (token.alias) types = appendTypes(types, token.alias);

        // If the token contains children, increase the stack depth and repeat this while-loop
        stackIndex++;
        typeArrStack.push(classes);
        tokenArrStack.push(token.children);
        tokenArrIndexStack.push(0);
        tokenArrSizeStack.push(token.children.length);
        continue;
      }

      // Split the text token by new-lines
      const splitByNewlines = token.value.split(newLineRegex);
      currentLine.push({
        type: "element",
        tagName: "span",
        properties: { className: classes },
        children: [{ type: "text", value: splitByNewlines[0] }],
      });

      // Create a new line for split string
      for (let i = 1; i < splitByNewlines.length; i++) {
        normalizeEmptyLines(currentLine);
        acc.push((currentLine = []));

        currentLine.push({
          type: "element",
          tagName: "span",
          properties: { className: classes },
          children: [{ type: "text", value: splitByNewlines[i] }],
        });
      }
    }

    // Decrease the stack depth
    stackIndex--;
    typeArrStack.pop();
    tokenArrStack.pop();
    tokenArrIndexStack.pop();
    tokenArrSizeStack.pop();
  }

  normalizeEmptyLines(currentLine);
  return acc;
}
