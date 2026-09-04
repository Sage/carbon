import { createContext, Dispatch, SetStateAction } from "react";

export interface TableRowContextProps {
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  isExpanded?: boolean;
}

export default createContext(<TableRowContextProps>{
  setIsExpanded: /* istanbul ignore next */ () => {},
});
