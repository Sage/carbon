import { createContext } from "react";

export interface TableFooterContextProps {
  isInFooter: boolean;
}

export default createContext(<TableFooterContextProps>{
  isInFooter: false,
});
