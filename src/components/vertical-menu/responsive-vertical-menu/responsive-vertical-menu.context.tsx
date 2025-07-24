import React, {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
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
  active: boolean;
  activeMenuItem: ResponsiveVerticalMenuButtonItem | null;
  buttonRef: RefObject<HTMLButtonElement>;
  containerRef: RefObject<HTMLDivElement>;
  menuRef: RefObject<HTMLUListElement>;
  reducedMotion?: boolean;
  responsiveMode?: boolean;
  setActive: Dispatch<SetStateAction<boolean>>; // This allows both value and function
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
  const [active, setActive] = useState<boolean>(false);
  const [activeMenuItem, setActiveMenuItem] =
    useState<ResponsiveVerticalMenuButtonItem | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLUListElement>(null);
  const [responsiveMode, setResponsiveMode] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  return (
    <ResponsiveVerticalMenuContext.Provider
      value={{
        active,
        activeMenuItem,
        buttonRef,
        containerRef,
        menuRef,
        reducedMotion,
        responsiveMode,
        setActive,
        setActiveMenuItem,
        setReducedMotion,
        setResponsiveMode,
      }}
    >
      {children}
    </ResponsiveVerticalMenuContext.Provider>
  );
};
