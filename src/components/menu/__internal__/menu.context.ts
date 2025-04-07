import { createContext } from "react";

interface MenuContextType {
  inMenu?: boolean;
}

export default createContext<MenuContextType | null>(null);
