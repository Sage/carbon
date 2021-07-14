import * as React from "react";
import { MarginSpacingProps } from "../../utils/helpers/options-helper";
import ActionPopoverDivider from "./action-popover-divider/action-popover-divider";
import { ActionPopoverItemProps } from "./action-popover-item/action-popover-item";

export interface RenderButtonProps {
  tabIndex: number;
  "data-element": string;
}

type ActionPopoverChild =
  | React.ReactElement<ActionPopoverItemProps>
  | typeof ActionPopoverDivider
  | boolean
  | null
  | undefined;

export interface ActionPopoverProps extends MarginSpacingProps {
  /** Children for popover component */
  children?: ActionPopoverChild | ActionPopoverChild[];
  /** Horizontal alignment of menu items content */
  horizontalAlignment?: "left" | "right";
  /** Unique ID */
  id?: string;
  /** Callback to be called on menu open */
  onOpen?: () => void;
  /** Callback to be called on menu close */
  onClose?: () => void;
  /** Set whether the menu should open above or below the button */
  placement?: "bottom" | "top";
  /** Render a custom menu button to override default ellipsis icon */
  renderButton?: (buttonProps: RenderButtonProps) => React.ReactNode;
  /** Boolean to control whether menu should align to right */
  rightAlignMenu?: boolean;
}

declare function ActionPopover(props: ActionPopoverProps): JSX.Element;

export default ActionPopover;
