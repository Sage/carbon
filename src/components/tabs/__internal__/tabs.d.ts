import * as React from 'react';
import Tab from './tab';

export interface TabsProps {
  className?: string;
  renderHiddenTabs: boolean;
  selectedTabId: string;
  children: React.ReactNode[] | object;
  align: 'left' | 'right';
  onTabChange?: (tabId: string) => void;
  position: 'top' |'left';
  setLocation: boolean;
}

declare const Tabs: React.ComponentType<TabsProps>;
export { Tabs, Tab };
