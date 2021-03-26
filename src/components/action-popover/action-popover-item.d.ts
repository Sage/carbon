import * as React from "react";
import { IconTypes } from "../../utils/helpers/options-helper/options-helper";
import ActionPopoverMenu from "./action-popover-menu";

export interface ActionPopoverItemProps {
  children: string;
  icon?: IconTypes;
  disabled?: boolean;
  onClick?: () => void;
  submenu?: React.ReactNode;
  href?: string;
  download?: boolean;
}

declare function MenuItem(props: ActionPopoverItemProps): JSX.Element;
declare function ActionPopoverItem(props: ActionPopoverItemProps): JSX.Element;

export { MenuItem };
export default ActionPopoverItem;
