import React from "react";

export default function useMediaQuery(queryInput: string): boolean | undefined {
  const query = queryInput.replace(/^@media( ?)/m, "");

  const [match, setMatch] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const queryList = window.matchMedia(query);
    const updateMatch = () => {
      setMatch(queryList.matches);
    };
    updateMatch();
    queryList.addEventListener("change", updateMatch);
    return () => {
      queryList.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return match;
}
