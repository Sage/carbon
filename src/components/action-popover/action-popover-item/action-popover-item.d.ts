import { IconType } from "components/icon/icon";
import * as React from "react";
import { ActionPopoverMenuProps } from "../action-popover-menu/action-popover-menu";

export interface ActionPopoverItemProps {
  /** The text label to display for this Item */
  children: string;
  /** Flag to indicate if item is disabled */
  disabled?: boolean;
  /** allows to provide download prop that works dependent with href */
  download?: boolean;
  /** allows to provide href prop */
  href?: string;
  /** The name of the icon to display next to the label */
  icon?: IconType;
  /** Callback to run when item is clicked */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Submenu component for item */
  submenu?: React.ReactElement<ActionPopoverMenuProps>;
}

declare function MenuItem(props: ActionPopoverItemProps): JSX.Element;
declare function ActionPopoverItem(props: ActionPopoverItemProps): JSX.Element;

export { MenuItem };
export default ActionPopoverItem;
