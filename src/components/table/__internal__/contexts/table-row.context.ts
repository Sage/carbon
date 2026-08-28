import { createContext, Dispatch, SetStateAction } from "react";

export interface TableRowContextProps {
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  isExpanded?: boolean;
  isSelected: boolean;
  toggleSelected?: (setSelected: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

export default createContext(<TableRowContextProps>{
  setIsExpanded: /* istanbul ignore next */ () => {},
  isSelected: false,
});
