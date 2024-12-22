import Link from "@components/Common/Link";

export default function HomePage() {
  return (
    <div style={{ maxWidth: 700, margin: "2rem auto 4rem" }}>
      <p>{"This is the landing page."}</p>
      <p>
        <Link href="/markdown">{"⇒ Go to Markdown demo"}</Link>
      </p>
    </div>
  );
}
