import * as React from 'react';
import NavigationBar from './navigation-bar.component';

export interface NavigationBarProp {
  children?: React.ReactNode;
  ariaLabel?: string;
  navigationType?: 'light' | 'dark';
}

declare const NavigationBar: React.FunctionComponent<NavigationBarProp>;

export default NavigationBar;
