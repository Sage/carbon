import React from "react";

export type FocusContextType = {
  setElementToFocus: (
    itemIndex?: number,
    listIndex?: number,
    groupIndex?: number,
  ) => void;
  elementToFocus: {
    itemIndex?: number;
    listIndex?: number;
    groupIndex?: number;
  };
};

const FocusContext = React.createContext<FocusContextType>({
  setElementToFocus: /* istanbul ignore next */ () => {},
  elementToFocus: {},
});

export default FocusContext;
