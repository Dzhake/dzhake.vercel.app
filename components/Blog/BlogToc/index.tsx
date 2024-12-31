import type { TocHeading, TocHeadingData } from "@lib/mdx/plugins/remark-toc-headings";
import NextLink from "next/link";
import BlogTocClient from "./client";
import styles from "./index.module.scss";

export default function BlogToc({ toc }: { toc: TocHeadingData }) {
  return (
    <BlogTocClient>
      <TocLinkList list={toc.tree} />
    </BlogTocClient>
  );
}

function TocLinkList({ list }: { list?: TocHeading[] }) {
  return (
    <ul className={styles.items}>
      {list?.map((item, index) => (
        <li className={styles.item} key={item.id || index}>
          <TocLink item={item} />
          {(item.children || item.depth <= 2) && <TocLinkList list={item.children} />}
        </li>
      ))}
    </ul>
  );
}

function TocLink({ item }: { item: TocHeading }) {
  return (
    <NextLink className={styles.link} href={"#" + item.id}>
      {item.title}
    </NextLink>
  );
}
