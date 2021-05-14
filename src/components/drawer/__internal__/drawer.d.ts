import * as React from "react";

export interface SidebarContextProps {
  isInSidebar: boolean;
}

export interface DrawerPropTypes {
  /** Duration of a animation */
  animationDuration?: string;
  /** Sets color of sidebar's background */
  backgroundColor?: string;
  children: React.ReactNode;
  /** Set the default state of expansion of the Drawer if component is meant to be used as uncontrolled */
  defaultExpanded?: boolean;
  /** Sets the expansion state of the Drawer if component is meant to be used as controlled */
  expanded?: boolean;
  /* The (% or px) width of the expanded sidebar  */
  expandedWidth?: string;
  /** Sets custom height to Drawer component */
  height?: string;
  /** Callback fired when expansion state changes, onChange(event: object, isExpanded: boolean) */
  onChange?: (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    isExpanded: boolean
  ) => void;
  /* Sidebar object either html or react component */
  sidebar?: React.ReactNode;
  /** Enables expand/collapse button that controls drawer */
  showControls?: boolean;
  /** Sets title heading of sidebar's content */
  title?: string;
}

declare const SidebarContext: React.Context<SidebarContextProps>;
declare function Drawer(props: DrawerPropTypes): JSX.Element;

export { SidebarContext };
export default Drawer;
