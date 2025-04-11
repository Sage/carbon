import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

import { IconType } from "../../icon/icon-type";

export interface ResponsiveVerticalMenuButtonItem {
  children?: React.ReactNode;
  customIcon?: () => React.JSX.Element;
  divider?: boolean;
  href?: string;
  icon?: IconType;
  id: string;
  label?: string;
}

export interface MenuContextType {
  activeMenuItem: ResponsiveVerticalMenuButtonItem | null;
  buttonRef: React.RefObject<HTMLButtonElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  menuRef: React.RefObject<HTMLDivElement>;
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
