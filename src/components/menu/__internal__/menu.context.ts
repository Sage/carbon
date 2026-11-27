import { createContext } from "react";

interface MenuContextType {
  inMenu?: boolean;
  inMenuItem?: boolean;
}

export default createContext<MenuContextType>({ inMenu: false });
