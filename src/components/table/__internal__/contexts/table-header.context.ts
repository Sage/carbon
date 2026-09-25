import { createContext } from "react";

export interface TableHeaderContextProps {
  isInHeader: boolean;
}

export default createContext(<TableHeaderContextProps>{
  isInHeader: false,
});
