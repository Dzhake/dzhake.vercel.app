import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { type ForwardedRef, forwardRef } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

type AppRouterLinkProps = Pick<NextLinkProps, "href" | "replace" | "scroll" | "prefetch">;

export interface LinkProps extends Omit<AppRouterLinkProps, "href"> {
  href?: string;
  className?: string;
  blank?: boolean;
  // ...props
  style?: React.CSSProperties;
  children?: React.ReactNode;
  tabIndex?: number;
  draggable?: "false";
}

const Link = forwardRef(function Link(
  { href, className, blank, ...props }: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  // If href is not specified, use <span> instead of <a>
  const Component = href ? NextLink : "span";

  return (
    <Component
      ref={ref}
      className={clsx(styles.link, className)}
      href={href!}
      // Automatically set external links to open in new tabs
      target={(blank ?? href?.startsWith("http")) ? "_blank" : undefined}
      {...props}
    />
  );
});

export default Link;
