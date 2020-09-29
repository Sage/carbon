import * as React from 'react';
import { SpacingProps } from 'utils/helpers/options-helper/options-helper';

export interface TabProps extends SpacingProps {
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
}

declare const Tab: React.ComponentType<TabProps>;
export default Tab;
