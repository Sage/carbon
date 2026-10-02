import React from "react";

export type AnchorNavigationItemId = symbol;

export interface AnchorNavigationItemEntry {
  id: AnchorNavigationItemId;
  target?: React.RefObject<HTMLElement>;
  initiallySelected?: boolean;
}

export interface AnchorNavigationContextValue {
  usesLegacyStickyNavigation: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  selectedItemId?: AnchorNavigationItemId;
  registerItem: (item: AnchorNavigationItemEntry) => () => void;
  activateItem: (id: AnchorNavigationItemId) => void;
  setNavigationElement: (element: HTMLUListElement | null) => void;
}

const AnchorNavigationContext =
  React.createContext<AnchorNavigationContextValue | null>(null);

AnchorNavigationContext.displayName = "AnchorNavigationContext";

export const LegacyAnchorNavigationAdapterContext = React.createContext(false);

LegacyAnchorNavigationAdapterContext.displayName =
  "LegacyAnchorNavigationAdapterContext";

export default AnchorNavigationContext;
