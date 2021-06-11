import * as React from "react";
import ActionPopoverDivider from "../action-popover-divider/action-popover-divider";
import { ActionPopoverItemProps } from "../action-popover-item/action-popover-item";

type ActionPopoverChild =
  | React.ReactElement<ActionPopoverItemProps>
  | typeof ActionPopoverDivider
  | boolean
  | null
  | undefined;

export interface ActionPopoverMenuProps {
  /** Children for the menu */
  children?: ActionPopoverChild | ActionPopoverChild[];
  /** Index to control which item is focused */
  focusIndex?: number;
  /** Flag to indicate whether a menu should open */
  isOpen?: boolean;
  /** A unique ID for the menu */
  menuID?: string;
  /** Callback to set the index of the focused item */
  setFocusIndex?: (args: number) => any;
  /** Callback to set the isOpen flag */
  setOpen?: (args: boolean) => any;
  /** Unique ID for the menu's parent */
  parentID?: string;
}

declare function ActionPopoverMenu(
  props: ActionPopoverMenuProps & React.RefAttributes<HTMLDivElement>
): JSX.Element;

export default ActionPopoverMenu;
