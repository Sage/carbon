import * as React from "react";

export interface TabTitleProps {
  title: string;
  id?: string;
  dataTabId?: string;
  className?: string;
  children?: React.ReactNode;
  isTabSelected?: boolean;
  position?: "top" | "left";
  errorMessage?: string;
  warningMessage?: string;
  infoMessage?: string;
  errors?: boolean;
  warning?: boolean;
  info?: boolean;
  borders?: boolean;
  noLeftBorder?: boolean;
  noRightBorder?: boolean;
  alternateStyling?: boolean;
  isInSidebar?: boolean;
  siblings?: React.ReactNode[];
  titlePosition?: "before" | "after";
  href?: string;
  tabIndex?: string;
  size?: "default" | "large";
  align?: "left" | "right";
  customLayout?: React.ReactNode;
  onClick?: (
    ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  onKeyDown?: (
    ev: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
}

declare function TabTitle(props: TabTitleProps): JSX.Element;

export default TabTitle;
