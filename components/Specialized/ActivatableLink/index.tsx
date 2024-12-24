"use client";
import NextLink from "next/link";
import type { LinkProps } from "@components/Common/Link";
import { usePathname } from "next/navigation";
import styles from "./index.module.scss";
import clsx from "clsx";

// Note: paths must be exact

export interface ActivatableLinkProps extends LinkProps {
  href: string;
  children?: React.ReactNode;
}

export default function ActivatableLink({ href, className, ...props }: ActivatableLinkProps) {
  const pathname = usePathname();

  if (process.env.NODE_ENV === "development") {
    if (!href.startsWith("/")) throw new Error("ActivatableLink's href must be absolute and be on the same host!");
  }

  return (
    <NextLink href={href} className={clsx(styles.link, pathname === href && styles.active, className)} {...props} />
  );
}
