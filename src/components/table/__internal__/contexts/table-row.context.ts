import { createContext } from "react";

export interface TableRowContextProps {
  setIsExpanded: (isExpanded: boolean) => void;
  isExpanded: boolean;
}

export default createContext(<TableRowContextProps>{
  setIsExpanded: /* istanbul ignore next */ () => {},
  isExpanded: false,
});
