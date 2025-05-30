import React, {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";

import { IconType } from "../../icon/icon-type";

export interface ResponsiveVerticalMenuButtonItem {
  children?: ReactNode;
  customIcon?: ReactNode;
  divider?: boolean;
  href?: string;
  icon?: IconType;
  id: string;
  label?: React.ReactNode;
}

export interface MenuContextType {
  activeMenuItem: ResponsiveVerticalMenuButtonItem | null;
  buttonRef: RefObject<HTMLButtonElement>;
  containerRef: RefObject<HTMLDivElement>;
  menuRef: RefObject<HTMLDivElement>;
  reducedMotion?: boolean;
  responsiveMode?: boolean;
  setActiveMenuItem: (item: ResponsiveVerticalMenuButtonItem | null) => void;
  setReducedMotion?: (reducedMotion: boolean) => void;
  setResponsiveMode?: (responsiveMode: boolean) => void;
}

export const ResponsiveVerticalMenuContext =
  createContext<MenuContextType | null>(null);

export const useResponsiveVerticalMenu = () => {
  const context = useContext(ResponsiveVerticalMenuContext);
  if (context === null) {
    throw new Error(
      "useResponsiveVerticalMenu must be used within a ResponsiveVerticalMenuProvider",
    );
  }
  return context;
};

export interface ResponsiveVerticalMenuProviderProps {
  children: ReactNode;
}

export const ResponsiveVerticalMenuProvider = ({
  children,
}: ResponsiveVerticalMenuProviderProps) => {
  const [activeMenuItem, setActiveMenuItem] =
    useState<ResponsiveVerticalMenuButtonItem | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const [responsiveMode, setResponsiveMode] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  return (
    <ResponsiveVerticalMenuContext.Provider
      value={{
        activeMenuItem,
        buttonRef,
        containerRef,
        menuRef,
        reducedMotion,
        responsiveMode,
        setActiveMenuItem,
        setReducedMotion,
        setResponsiveMode,
      }}
    >
      {children}
    </ResponsiveVerticalMenuContext.Provider>
  );
};
