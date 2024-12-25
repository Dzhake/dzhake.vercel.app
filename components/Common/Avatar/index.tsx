import styles from "./index.module.scss";
import clsx from "clsx";

export interface AvatarProps {
  size: string | number;
  src: string | undefined;
  className?: string;
  alt?: string;
  // ...props
  style?: React.CSSProperties;
}

export default function Avatar({ src, size, className, alt, ...props }: AvatarProps) {
  return (
    <img src={src} alt={alt || ""} className={clsx(styles.avatar, className)} width={size} height={size} {...props} />
  );
}
