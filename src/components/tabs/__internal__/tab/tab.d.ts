import * as React from 'react';

export interface TabProps {
  tabId: string;
  className?: string;
  children?: React.ReactNode;
  isTabSelected?: boolean;
  position: 'top' | 'left';
  role: string;
  ariaLabelledby?: string;
}

declare const Tab: React.ComponentType<TabProps>;
export default Tab;
