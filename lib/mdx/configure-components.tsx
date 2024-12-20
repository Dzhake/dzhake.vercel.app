import type { MdxOptions } from "@lib/mdx";
import Link from "@components/Common/Link";
import Code from "@components/Common/Code";
import CodeBlock from "@components/Common/CodeBlock/server";
import InlineCssColor from "@components/Specialized/InlineCssColor";

export default function configureComponents(_config?: unknown): MdxOptions["components"] {
  return {
    em: "i",
    strong: "b",
    a: Link,
    code: Code,
    pre: CodeBlock,
    // h1: makeHeading(1),
    // h2: makeHeading(2),
    // h3: makeHeading(3),
    // h4: makeHeading(4),
    // h5: makeHeading(5),
    // h6: makeHeading(6),
    InlineCssColor,
  };
}
