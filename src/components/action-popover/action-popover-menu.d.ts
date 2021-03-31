import * as React from "react";
import { IconTypes } from "../../utils/helpers/options-helper/options-helper";
import ActionPopoverDivider from "./action-popover-divider";
import { ActionPopoverItemProps } from "./action-popover-item";

export interface ActionPopoverMenuProps {
  /** Children for the menu */
  children?:
    | null
    | React.ReactElement<ActionPopoverItemProps>
    | typeof ActionPopoverDivider
    | Array<React.ReactElement<ActionPopoverItemProps> | typeof ActionPopoverDivider>;
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

declare function ActionPopoverMenu(props: ActionPopoverMenuProps & React.RefAttributes<HTMLDivElement>): JSX.Element;

export default ActionPopoverMenu;
