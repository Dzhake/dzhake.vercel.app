import React from "react";

/** Returns `true`, if invoked from a React Server Component; otherwise, `false`. */
export function isRSC() {
  if (typeof window !== "undefined") throw new Error("window must be checked before isRSC() call!");
  return !("useEffect" in React);
}

/** Returns `true`, if invoked during Server-Side Rendering; otherwise, `false`. */
export function isSSR() {
  if (typeof window !== "undefined") throw new Error("window must be checked before isSSR() call!");
  return "useEffect" in React;
}
