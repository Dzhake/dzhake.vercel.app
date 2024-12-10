import { createElement, useId, useMemo } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

export interface SpriteProps {
  src: string;
  color?: string;
  width?: number;
  height?: number;
  size?: number;
  crisp?: boolean;
  alpha?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Sprite(props: SpriteProps) {
  return createElement(props.color == null ? ImgSprite : SvgSprite, props);
}

export type ImgSpriteProps = Omit<SpriteProps, "color">;

export function ImgSprite({ src, size, crisp, alpha, className, style, ...props }: ImgSpriteProps) {
  props.width ??= size;
  props.height ??= size;

  return (
    <img
      src={src}
      alt=""
      className={clsx(crisp ? styles.crispSprite : styles.sprite, className)}
      style={alpha != null ? { opacity: alpha, ...style } : style}
      draggable="false"
      {...props}
    />
  );
}

export type SvgSpriteProps = SpriteProps;

export function SvgSprite({ src, color, size, crisp, alpha, className, style, ...props }: SvgSpriteProps) {
  props.width ??= size;
  props.height ??= size;

  const id = useId();
  const filterStyle = useMemo(() => ({ filter: `url(#${id})` }), []);

  return (
    <svg
      className={clsx(crisp ? styles.crispSprite : styles.sprite, className)}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      style={alpha != null ? { opacity: alpha, ...style } : style}
      {...props}
    >
      <filter id={id}>
        <feFlood result="color" floodColor={color ?? "white"} floodOpacity="1" />
        <feComposite in="color" in2="SourceGraphic" operator="arithmetic" k1="1" />
      </filter>

      <image xlinkHref={src} style={filterStyle} />
    </svg>
  );
}
