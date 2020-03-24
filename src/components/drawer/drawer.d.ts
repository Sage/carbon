import * as React from 'react';

export interface DrawerPropTypes {
  children: React.FunctionComponent | React.ComponentClass;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, isExpanded: boolean) => void;
  sidebar?: React.ReactNode;
  animationDuration?: string;
  expandedWidth?: string;
}

declare const Drawer: React.FunctionComponent<DrawerPropTypes>;

export default Drawer;
