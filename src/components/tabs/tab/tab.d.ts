import * as React from 'react';

export interface TabProps {
  title?: string;
  tabId: string;
  className?: string;
  children?: React.ReactNode;
  isTabSelected?: boolean;
  position: 'top' | 'left';
  role?: string;
  ariaLabelledby?: string;
  updateErrors?: () => void;
  updateWarnings?: () => void;
  errorMessage: string;
  warningMessage: string;
  infoMessage: string;
  siblings?: React.ReactNode[];
  titlePosition?: 'before' | 'after';
  href?: string;
}

declare const Tab: React.ComponentType<TabProps>;
export default Tab;
