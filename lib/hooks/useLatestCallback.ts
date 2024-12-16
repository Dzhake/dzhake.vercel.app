/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { useState } from "react";

export default function useLatestCallback<T extends Function>(func: T): T {
  const [latest] = useState(() => {
    function result(this: unknown, ...args: unknown[]) {
      result.current.apply(this, args);
    }
    result.current = func;
    return result;
  });

  latest.current = func;
  return latest as Function as T;
}
