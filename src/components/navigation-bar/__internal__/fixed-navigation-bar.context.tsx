import React, { createContext, useState, useCallback, useEffect } from "react";
import useResizeObserver from "../../../hooks/__internal__/useResizeObserver/useResizeObserver";
import { NavigationBarProps } from "..";

type FixedNavigationBarContextProps = {
  submenuMaxHeight?: string;
};

const FixedNavigationBarContext = createContext<FixedNavigationBarContextProps>(
  {},
);

export interface FixedNavigationBarContextProviderProps
  extends Pick<
    NavigationBarProps,
    "position" | "orientation" | "offset" | "children"
  > {
  navbarRef: React.RefObject<HTMLElement>;
}

export const FixedNavigationBarContextProvider = ({
  position,
  orientation,
  offset,
  children,
  navbarRef,
}: FixedNavigationBarContextProviderProps) => {
  const [navbarHeight, setNavbarHeight] = useState(
    navbarRef.current?.offsetHeight,
  );

  const updateHeight = useCallback(
    () => setNavbarHeight(navbarRef.current?.offsetHeight),
    [navbarRef],
  );

  useEffect(() => {
    updateHeight();
  }, [updateHeight]);

  useResizeObserver(navbarRef, updateHeight);

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
