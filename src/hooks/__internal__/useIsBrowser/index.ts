import { useEffect, useState } from "react";

function canUseDOM() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/**
 * Hook that detects whether your React component is being rendered in a client-side or server-side environment.
 *
 * Useful for handling logic that should *only* be executed in the browser, such as DOM manipulations or accessing browser APIs.
 */
function useIsBrowser() {
  const [isBrowser, setIsBrowser] = useState(canUseDOM);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return { isBrowser };
}

export default useIsBrowser;
