import React from "react";

export type MenuType = "light" | "dark" | "white" | "black";

export interface MenuContextProps {
  menuType: MenuType;
  openSubmenuId: string | null;
  inMenu: boolean;
  inFullscreenView?: boolean;
  setOpenSubmenuId: (id: string | null) => void;
  registerItem?: (id: string) => void;
  unregisterItem?: (id: string) => void;
  focusId?: string;
}

export default React.createContext<MenuContextProps>({
  menuType: "light",
  inMenu: false,
  openSubmenuId: null,
  setOpenSubmenuId: /* istanbul ignore next */ () => {},
});
