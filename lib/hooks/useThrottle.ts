"use client";
import useLatest from "@lib/hooks/useLatest";
import { useCallback, useRef, useState } from "react";

export type ThrottleState = "idle" | "cooldown" | "queued";

export default function useThrottle<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs: number,
): [state: ThrottleState, start: (...args: Args) => void, reset: (executeQueued?: boolean) => void] {
  const callbackRef = useLatest(callback);
  const timeoutRef = useRef<NodeJS.Timeout | number>(0);
  const queuedArgsRef = useRef<Args>(null);

  const [state, setState] = useState<ThrottleState>("idle");

  // (no need to memo this func, since it only uses refs, and it's only referenced by `start`)
  const waitForNextOne = () => {
    // Start the "cooldown" state
    setState("cooldown");

    timeoutRef.current = setTimeout(() => {
      // If by the next time, there's another call queued, call it and wait again
      const queuedArgs = queuedArgsRef.current;
      if (queuedArgs) {
        queuedArgsRef.current = null;
        waitForNextOne();
        callbackRef.current(...queuedArgs); // Call callback last, in case it throws
      } else {
        // Otherwise, go back to "idle" state
        setState("idle");
        timeoutRef.current = 0;
      }
    }, delayMs);
  };

  const start = useCallback(
    (...args: Args) => {
      if (timeoutRef.current) {
        // If already throttling, just set or override the queued call's arguments
        setState("queued");
        queuedArgsRef.current = args;
      } else {
        // If not throttling, call the callback, and wait for the next one
        waitForNextOne();
        callbackRef.current(...args); // Call callback last, in case it throws
      }
    },
    [delayMs],
  );

  const reset = useCallback((executeQueued = true) => {
    // Go back to "idle" state, clear the timeout, stop the throttling
    setState("idle");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = 0;

    // Clear the queued arguments, and execute the queued call
    const queuedArgs = queuedArgsRef.current;
    if (queuedArgs) {
      queuedArgsRef.current = null;
      executeQueued && callbackRef.current(...queuedArgs); // Call callback last, in case it throws
    }
  }, []);

  return [state, start, reset];
}
