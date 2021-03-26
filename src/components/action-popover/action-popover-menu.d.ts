import * as React from "react";
import { IconTypes } from "../../utils/helpers/options-helper/options-helper";
import ActionPopoverDivider from "./action-popover-divider";
import ActionPopoverItem from "./action-popover-item";

export interface ActionPopoverMenuProps {
  button?: (args: any) => any | object;
  children?: typeof ActionPopoverDivider | typeof ActionPopoverItem;
  focusIndex?: number;
  menuID?: string;
  isOpen?: boolean;
  items?: any[];
  parentID: string;
  setFocusIndex?: (args: number) => any;
  setItems: (args: any[]) => any[];
  setOpen: (args: boolean) => any;
}

declare function ActionPopoverMenu(props: ActionPopoverMenuProps & React.RefAttributes<HTMLDivElement>): JSX.Element;

export default ActionPopoverMenu;
