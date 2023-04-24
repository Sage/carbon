import React from "react";

type SelectListContextProps = {
  currentOptionsListIndex?: number;
  multiselectValues?: (string | Record<string, unknown>)[];
};

const SelectListContext = React.createContext<SelectListContextProps>({});
export default SelectListContext;
