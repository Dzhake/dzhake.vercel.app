import { SpriteProps } from "@components/Common/Sprite";
import styles from "./index.module.scss";
import clsx from "clsx";

export interface IconProps extends Omit<SpriteProps, "src" | "color" | "crisp"> {
  type: IconType;
  alt?: string;
}

export default function Icon({ type, alt, className, width, height, size, style, alpha, ...props }: IconProps) {
  const Element = alt ? "img" : "span";

  return (
    <Element
      role="icon"
      src={alt ? tiniestEmptyGif : undefined}
      alt={alt || undefined}
      draggable={alt ? "false" : undefined}
      className={clsx(styles.icon, className)}
      style={{
        width: width ?? size,
        height: height ?? size,
        opacity: alpha,
        backgroundPosition: getIconPosition(type),
        ...style,
      }}
      {...props}
    />
  );
}

// https://stackoverflow.com/a/15960901 (35 bytes, spec-compliant GIF)
const tiniestEmptyGif = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIBAAA=";
// comment under https://stackoverflow.com/a/14115340 (22 bytes, but maybe browser-specific)
// const tiniestEmptyGif = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAA";

function getIconPosition(type: IconType) {
  for (let row = 0; row < iconsLookup.length; row++) {
    const index = (iconsLookup[row] as readonly IconType[]).indexOf(type);
    if (~index) return `-${index}00% -${row}00%`;
  }
}

const iconsLookup = [
  ["not_found", "add", "edit", "copy", "save", "visibility", "visibility_off", "undo"],
  ["download", "upload", "options", "options_vert", "door", "link", "bell", "person"],
  ["check", "cross"],
] as const;

export type IconType = (typeof iconsLookup)[number][number];
