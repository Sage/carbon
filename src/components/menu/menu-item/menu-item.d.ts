import * as React from "react";
import { FlexboxProps, LayoutProps } from "styled-system";
import {
  Expand,
  ExplicitUnion,
} from "../../../__internal__/utils/helpers/types";
import { IconType } from "../icon/icon-type";

export interface MenuItemBaseProps
  extends Expand<LayoutProps>,
    Expand<FlexboxProps> {
  /** Custom className */
  className?: string;
  /** onClick handler */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Defines which direction the submenu will hang eg. left/right */
  submenuDirection?: string;
  /** Is the menu item the currently selected item. */
  selected?: boolean;
  /** A title for the menu item that has a submenu. */
  submenu?: React.ReactNode | boolean;
  /** The href to use for the menu item. */
  href?: string;
  /** onKeyDown handler */
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
  /** The target to use for the menu item. */
  target?: string;
  /** The rel attribute to be used for the underlying <a> tag */
  rel?: string;
  /** set the colour variant for a menuType */
  variant?: "default" | "alternate";
  /** Flag to display the dropdown arrow when an item has a submenu */
  showDropdownArrow?: boolean;
  /** If no text is provided an ariaLabel should be given to facilitate accessibility. */
  ariaLabel?: string;
  /** Callback triggered when submenu opens. Only valid with submenu prop */
  onSubmenuOpen?: () => void;
  /** Callback triggered when submenu closes. Only valid with submenu prop */
  onSubmenuClose?: () => void;
  /** @ignore @private
  private prop, used inside ScrollableBlock to ensure the MenuItem's color variant overrides the CSS
  for other MenuItems inside the block */
  overrideColor?: boolean;
}

export interface MenuWithChildren extends MenuItemBaseProps {
  children: React.ReactNode;
  /** Either prop `icon` must be defined or this node must have children. */
  icon?: ExplicitUnion<IconType>;
}

export interface MenuWithIcon extends MenuItemBaseProps {
  /** Either prop `icon` must be defined or this node must have children. */
  icon: ExplicitUnion<IconType>;
  children?: React.ReactNode;
}

type RawMenuItemProps = MenuWithChildren | MenuWithIcon;

// need the below "trick" to get intellisense to work correctly with the individual props when hovering
export type MenuItemProps = {
  [K in keyof RawMenuItemProps]: RawMenuItemProps[K];
};

declare function MenuItem(props: MenuItemProps): JSX.Element;

export default MenuItem;
