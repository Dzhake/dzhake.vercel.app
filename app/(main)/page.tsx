import Link from "@components/Common/Link";
import CodeBlock from "@components/Common/CodeBlock/server";

export default function HomePage() {
  return (
    <div style={{ maxWidth: 600, margin: "2rem auto 4rem" }}>
      <Link>{"Hello world!"}</Link>
      <br />
      <br />
      <CodeBlock title="/project/my-csharp-file.cs" lang="csharp">
        {csharpSample}
      </CodeBlock>
      <br />
      <br />
      <CodeBlock lang="svg">{svgSample}</CodeBlock>
      <br />
      <br />
      <CodeBlock title="/project/my-svg-file.svg" lang="svg">
        {svgSample}
      </CodeBlock>
    </div>
  );
}

const csharpSample = `using System;

// highlight start
namespace TestNamespace
{
    public class TestClass(string name) { }
}
// highlight end`;

const svgSample = `<svg fill="#a074c4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M11.5 11.4H17c0-2-2.3-4.9-5.1-4.9s-5.3 2.4-5.3 5.2 2.9 5.2 4.9 5.2v-5.5z"/><path d="M13.6 13.7h11.8v11.8H13.6z"/></svg>`;
