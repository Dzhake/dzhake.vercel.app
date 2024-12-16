import { useRef } from "react";

export interface LatestRefObject<T> {
  readonly current: T;
}

export default function useLatest<T>(value: T): LatestRefObject<T> {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
