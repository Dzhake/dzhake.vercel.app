"use client";
import useLatest from "@lib/hooks/useLatest";
import { useCallback, useRef, useState } from "react";

export default function useDebounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  waitMs: number,
): [waiting: boolean, start: (...args: Args) => void, reset: () => void] {
  const callbackRef = useLatest(callback);
  const timeoutRef = useRef<NodeJS.Timeout | number>(0);

  const [waiting, setWaiting] = useState(false);

  const start = useCallback(
    (...args: Args) => {
      // If already debouncing, clear the timeout; otherwise, set waiting to true
      timeoutRef.current ? clearTimeout(timeoutRef.current) : setWaiting(true);

      // Re-set/start the timeout
      timeoutRef.current = setTimeout(() => {
        setWaiting(false);
        timeoutRef.current = 0;
        callbackRef.current(...args);
      }, waitMs);
    },
    [waitMs],
  );

  const reset = useCallback(() => {
    // If debouncing, reset everything
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = 0;
      setWaiting(false);
    }
  }, []);

  return [waiting, start, reset];
}
