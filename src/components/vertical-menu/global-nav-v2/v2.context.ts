import React, { createContext } from "react";

import { IconType } from "../../icon/icon-type";

export interface V2MenuItem {
  children?: V2MenuItem[];
  customIcon?: () => React.JSX.Element;
  divider?: boolean;
  href?: string;
  icon?: IconType;
  id: string;
  label?: string;
}
export interface V2MenuContextProps {
  activeMenuItem: V2MenuItem | null;
  setActiveMenuItem: (item: V2MenuItem | null) => void;
}

export const V2MenuContext = createContext<V2MenuContextProps>({
  activeMenuItem: null,
  setActiveMenuItem: () => {},
});

export default V2MenuContext;
