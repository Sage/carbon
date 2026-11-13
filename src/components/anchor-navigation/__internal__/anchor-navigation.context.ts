import React from "react";
import createStrictContext from "../../../__internal__/utils/createStrictContext";

export interface AnchorNavigationItemEntry {
  getTarget: () => React.RefObject<HTMLElement> | undefined;
}

export interface AnchorNavigationContextProps {
  selectedItem: HTMLAnchorElement | null;
  registerItem: (
    element: HTMLAnchorElement,
    entry: AnchorNavigationItemEntry,
  ) => () => void;
  activateItem: (
    element: HTMLAnchorElement,
    target?: React.RefObject<HTMLElement>,
  ) => void;
}

const [AnchorNavigationProvider, useAnchorNavigationContext] =
  createStrictContext<AnchorNavigationContextProps>({
    name: "AnchorNavigationContext",
    errorMessage:
      "Carbon AnchorNavigation: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
  });

export { AnchorNavigationProvider, useAnchorNavigationContext };
