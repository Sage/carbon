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
import Logger from "../../../__internal__/utils/logger";

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
  left: string;
  top: string;
  width?: string;
  height?: string;
  setActive: Dispatch<SetStateAction<boolean>>; // This allows both value and function
  setActiveMenuItem: (item: ResponsiveVerticalMenuButtonItem | null) => void;
  setReducedMotion?: (reducedMotion: boolean) => void;
  setResponsiveMode?: (responsiveMode: boolean) => void;
  setLeft: (left: string) => void;
  setTop: (top: string) => void;
}

const ResponsiveVerticalMenuContext = createContext<MenuContextType | null>(
  null,
);

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
  /** @private @internal @ignore */
  width?: string;
  /** @private @internal @ignore */
  height?: string;
}

let deprecatedWarning = false;

export const ResponsiveVerticalMenuProvider = ({
  children,
  width,
  height,
}: ResponsiveVerticalMenuProviderProps) => {
  const externalContext = useContext(ResponsiveVerticalMenuContext);
  const hasExternalContext = externalContext !== null;

  if (!deprecatedWarning && hasExternalContext) {
    deprecatedWarning = true;
    Logger.deprecate(
      "`ResponsiveVerticalMenuProvider` is deprecated and no longer needed for `ResponsiveVerticalMenu`. You can use `ResponsiveVerticalMenu` directly without wrapping it in a provider.",
    );
  }

  const [active, setActive] = useState<boolean>(false);
  const [activeMenuItem, setActiveMenuItem] =
    useState<ResponsiveVerticalMenuButtonItem | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLUListElement>(null);
  const [responsiveMode, setResponsiveMode] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const [left, setLeft] = useState("auto");
  const [top, setTop] = useState("auto");

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
        left,
        top,
        width,
        height,
        setActive,
        setActiveMenuItem,
        setReducedMotion,
        setResponsiveMode,
        setLeft,
        setTop,
      }}
    >
      {children}
    </ResponsiveVerticalMenuContext.Provider>
  );
};
