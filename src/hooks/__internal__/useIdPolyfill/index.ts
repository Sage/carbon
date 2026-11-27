import * as React from "react";
import createGuid from "../../../__internal__/utils/helpers/guid";

function useFallbackId(): string {
  return React.useRef(createGuid()).current;
}

// React 18's useId is hydration-safe. React 16/17 fall back to a per-instance
// guid, which is not hydration-safe; adopt an SSRProvider if that is required.
const useIdPolyfill: () => string =
  typeof React.useId === "function" ? React.useId : useFallbackId;

export default useIdPolyfill;
