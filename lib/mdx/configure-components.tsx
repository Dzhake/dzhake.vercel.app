import type { MdxComponents } from "@lib/mdx";
import Link from "@components/Common/Link";
import Code from "@components/Common/Code";
import CodeBlock from "@components/Common/CodeBlock";
import Heading, { HeadingProps } from "@components/Common/Heading";
import InlineCssColor from "@components/Specialized/InlineCssColor";
import Embed from "@components/Specialized/Embed";
import Icon from "@components/Common/Icon";

function makeHeading(depth: 1 | 2 | 3 | 4 | 5 | 6) {
  // eslint-disable-next-line react/display-name
  return (props: HeadingProps) => <Heading {...props} level={depth} />;
}

export default function configureComponents(_config?: unknown): MdxComponents {
  return {
    em: "i",
    strong: "b",
    a: Link,
    code: Code,
    pre: CodeBlock,
    h1: makeHeading(1),
    h2: makeHeading(2),
    h3: makeHeading(3),
    h4: makeHeading(4),
    h5: makeHeading(5),
    h6: makeHeading(6),
    InlineCssColor,
    Embed,
    Icon,
    Admonition: "div", // TODO: add an Admonition component
  };
}
