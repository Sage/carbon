import * as React from "react";

export interface AnchorNavigationItemProps {
  children: React.ReactNode;
  /** OnKeyDown handler */
  onKeyDown?: () => void;
  /** onClick handler */
  onClick?: () => void;
  /** href to be passed to the anchor element, can be linked with id passed to the scrollable section */
  href?: string;
  /** tabIndex passed to the anchor element */
  tabIndex?: number;
  /** Indicates if component is selected */
  isSelected?: boolean;
  /** Allows to override existing component styles */
  styleOverride?: () => object | object;
  /** Reference to the section html element meant to be shown   */
  target?: React.RefObject<HTMLElement>;
}

declare function AnchorNavigationItem(
  props: AnchorNavigationItemProps & React.RefAttributes<HTMLAnchorElement>
): JSX.Element;

export default AnchorNavigationItem;
