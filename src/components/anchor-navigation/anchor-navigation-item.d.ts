import * as React from "react";

export interface AnchorNavigationItemProps {
  children?: React.ReactNode;
  /** href to be passed to the anchor element, can be linked with id passed to the scrollable section */
  href?: string;
  /** Indicates if component is selected */
  isSelected?: boolean;
  /** onClick handler */
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement>) => void;
  /** OnKeyDown handler */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLAnchorElement>) => void;
  /** Allows to override existing component styles */
  styleOverride?: () => object | object;
  /** tabIndex passed to the anchor element */
  tabIndex?: number;
  /** Reference to the section html element meant to be shown   */
  target?: React.Ref<HTMLElement>;
}

declare function AnchorNavigationItem(
  props: AnchorNavigationItemProps & React.RefAttributes<HTMLAnchorElement>
): JSX.Element;

export default AnchorNavigationItem;
