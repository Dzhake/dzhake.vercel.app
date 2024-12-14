"use client";
import { useRef } from "react";
import Icon from "@components/Common/Icon";
import styles from "./index.module.scss";
import clsx from "clsx";

export default function CodeBlockCopyButton({ float }: { float?: boolean }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const copyContents = () => {
    const parent = buttonRef.current!.parentElement!;
    const pre = parent.querySelector("pre") || parent.parentElement?.querySelector("pre");
    const content = pre?.textContent;
    if (content) navigator.clipboard.writeText(content);
  };

  return (
    <button ref={buttonRef} className={clsx(styles.copyButton, float && styles.floating)} onClick={copyContents}>
      <Icon type="copy" size={24} />
    </button>
  );
}
