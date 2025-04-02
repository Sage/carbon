import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
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
  reducedMotion?: boolean;
  setActiveMenuItem: (item: VerticalMenuButtonItem | null) => void;
  setReducedMotion?: (reducedMotion: boolean) => void;
}

export const VerticalMenuContext = createContext<MenuContextType | null>(null);

export const useVerticalMenu = () => {
  const context = useContext(VerticalMenuContext);
  if (context === null) {
    throw new Error(
      "useVerticalMenu must be used within a VerticalMenuProvider",
    );
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
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  return (
    <VerticalMenuContext.Provider
      value={{
        activeMenuItem,
        buttonRef,
        menuRef,
        reducedMotion,
        setActiveMenuItem,
        setReducedMotion,
      }}
    >
      {children}
    </VerticalMenuContext.Provider>
  );
};
