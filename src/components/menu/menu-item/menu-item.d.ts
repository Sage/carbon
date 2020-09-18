import * as React from 'react';
import { IconTypes } from '../../../utils/helpers/options-helper/options-helper';

export interface MenuItemProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: IconTypes;
  submenuDirection?: string;
  selected?: boolean;
  submenu?: string | object;
  href?: string;
  to?: string;
  routerLink?: React.ReactNode;
}

declare const MenuItem: React.ComponentType<MenuItemProps>;
export default MenuItem;
