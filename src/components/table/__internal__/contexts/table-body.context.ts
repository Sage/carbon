import { createContext } from "react";

export interface TableBodyContextProps {
  isInTable: boolean;
}

export default createContext<TableBodyContextProps>({ isInTable: false });
