import React from "react";

export default function useMediaQuery(queryInput) {
  const query = queryInput.replace(/^@media( ?)/m, "");

  const [match, setMatch] = React.useState(() => false);

  React.useEffect(() => {
    const queryList = window.matchMedia(query);
    const updateMatch = () => {
      setMatch(queryList.matches);
    };
    updateMatch();
    queryList.addListener(updateMatch);
    return () => {
      queryList.removeListener(updateMatch);
    };
  }, [query]);

  return match;
}
