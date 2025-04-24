import { useLayoutEffect, useState } from "react";
import { getWindow } from "../../__internal__/dom/globals";

export default function useMediaQuery(queryInput: string): boolean | undefined {
  const query = queryInput.replace(/^@media( ?)/m, "");

  const [match, setMatch] = useState<boolean | undefined>(undefined);

  useLayoutEffect(() => {
    const browserWindow = getWindow();

    /* istanbul ignore if */
    if (!browserWindow) {
      return undefined;
    }

    const queryList = browserWindow.matchMedia(query);
    const updateMatch = () => setMatch(queryList.matches);

    updateMatch();
    queryList.addEventListener("change", updateMatch);

    return () => {
      queryList.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return match;
}
