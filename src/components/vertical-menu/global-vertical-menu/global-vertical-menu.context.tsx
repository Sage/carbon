import React, {
  createContext,
  useRef,
  ReactNode,
  useContext,
  useState,
} from "react";

import { IconType } from "../../icon/icon-type";

export interface V2MenuItem {
  children?: React.ReactNode;
  customIcon?: () => React.JSX.Element;
  divider?: boolean;
  href?: string;
  icon?: IconType;
  id: string;
  label?: string;
}

export interface MenuContextType {
  activeMenuItem: V2MenuItem | null;
  buttonRef: React.RefObject<HTMLButtonElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  setActiveMenuItem: (item: V2MenuItem | null) => void;
}

export const V2MenuContext = createContext<MenuContextType | null>(null);

export const useV2Menu = () => {
  const context = useContext(V2MenuContext);
  if (context === null) {
    throw new Error("useV2Menu must be used within a V2MenuProvider");
  }
  return context;
};

export interface V2MenuProviderProps {
  children: ReactNode;
}

export const V2MenuProvider = ({ children }: V2MenuProviderProps) => {
  const [activeMenuItem, setActiveMenuItem] = useState<V2MenuItem | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <V2MenuContext.Provider
      value={{ activeMenuItem, buttonRef, menuRef, setActiveMenuItem }}
    >
      {children}
    </V2MenuContext.Provider>
  );
};
