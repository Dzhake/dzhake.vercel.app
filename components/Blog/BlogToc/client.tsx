"use client";
import { useEffect, useRef } from "react";
import { useDocumentEvent } from "@lib/hooks/useEvent";
import styles from "./index.module.scss";

export default function BlogTocClient({ children }: React.PropsWithChildren) {
  const divRef = useRef<HTMLDivElement>(null);
  const lastActiveLink = useRef<HTMLAnchorElement>(null);

  function updateActiveHeading() {
    if (!divRef.current) return;
    const postContainer = document.getElementById("__blogPostContainer");
    if (!postContainer) return;

    const tocLinks = [...divRef.current.querySelectorAll<HTMLAnchorElement>("." + styles.link)];
    const headings = [...postContainer.querySelectorAll<HTMLHeadingElement>(":scope > :is(h1,h2,h3,h4,h5,h6)[id]")];

    const threshold = window.innerHeight * 0.35;
    const index = headings.findLastIndex(h => h.getBoundingClientRect().y < threshold);

    const newActiveLink = tocLinks[Math.max(index, 0)];
    if (lastActiveLink.current === newActiveLink) return;

    lastActiveLink.current?.classList.remove(styles.active);
    newActiveLink?.classList.add(styles.active);
    lastActiveLink.current = newActiveLink;
  }

  useEffect(updateActiveHeading, []);
  useDocumentEvent("scroll", updateActiveHeading);

  return (
    <div ref={divRef} className={styles.container}>
      {children}
    </div>
  );
}
