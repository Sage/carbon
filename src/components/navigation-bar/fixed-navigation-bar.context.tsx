import React, { createContext, useState, useCallback } from "react";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver/useResizeObserver";
import { NavigationBarProps } from ".";

type FixedNavigationBarContextProps = {
  submenuMaxHeight?: string;
};

const FixedNavigationBarContext = createContext<FixedNavigationBarContextProps>(
  {}
);

export interface FixedNavigationBarContextProviderProps
  extends Pick<
    NavigationBarProps,
    "position" | "orientation" | "offset" | "children"
  > {
  navbarElement: HTMLElement | null;
}

export const FixedNavigationBarContextProvider = ({
  position,
  orientation,
  offset,
  children,
  navbarElement,
}: FixedNavigationBarContextProviderProps) => {
  const [navbarHeight, setNavbarHeight] = useState(navbarElement?.offsetHeight);

  const updateHeight = useCallback(
    () => setNavbarHeight(navbarElement?.offsetHeight),
    [navbarElement]
  );

  useResizeObserver({ current: navbarElement }, updateHeight);

  let submenuMaxHeight;

  if (position === "fixed") {
    if (orientation === "top" && navbarHeight !== undefined) {
      submenuMaxHeight = `calc(100vh - ${navbarHeight}px - ${offset})`;
    } else if (orientation === "bottom") {
      submenuMaxHeight = offset;
    }
  }

  return (
    <FixedNavigationBarContext.Provider value={{ submenuMaxHeight }}>
      {children}
    </FixedNavigationBarContext.Provider>
  );
};

export default FixedNavigationBarContext;
