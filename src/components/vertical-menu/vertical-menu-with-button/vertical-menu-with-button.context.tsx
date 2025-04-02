import React, {
  createContext,
  useRef,
  ReactNode,
  useContext,
  useState,
} from "react";

import { IconType } from "../../icon/icon-type";

export interface VerticalMenuButtonItem {
  children?: React.ReactNode;
  customIcon?: () => React.JSX.Element;
  divider?: boolean;
  href?: string;
  icon?: IconType;
  id: string;
  label?: string;
}

export interface MenuContextType {
  activeMenuItem: VerticalMenuButtonItem | null;
  buttonRef: React.RefObject<HTMLButtonElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  setActiveMenuItem: (item: VerticalMenuButtonItem | null) => void;
}

export const VerticalMenuContext = createContext<MenuContextType | null>(null);

export const useVerticalMenu = () => {
  const context = useContext(VerticalMenuContext);
  if (context === null) {
    throw new Error("useV2Menu must be used within a V2MenuProvider");
  }
  return context;
};

export interface VerticalMenuProviderProps {
  children: ReactNode;
}

export const VerticalMenuProvider = ({
  children,
}: VerticalMenuProviderProps) => {
  const [activeMenuItem, setActiveMenuItem] =
    useState<VerticalMenuButtonItem | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <VerticalMenuContext.Provider
      value={{ activeMenuItem, buttonRef, menuRef, setActiveMenuItem }}
    >
      {children}
    </VerticalMenuContext.Provider>
  );
};
