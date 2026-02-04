import { useEffect, useState } from "react";
import { getWindow, getDocument } from "../../../__internal__/dom/globals";

/**
 * Hook that detects whether your React component is being rendered in a client-side or server-side environment.
 *
 * Useful for handling logic that should *only* be executed in the browser, such as DOM manipulations or accessing browser APIs.
 */
function useIsBrowser() {
  const canUseDOM = Boolean(getWindow() && getDocument());
  const [isBrowser, setIsBrowser] = useState(canUseDOM);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return { isBrowser };
}

export default useIsBrowser;
