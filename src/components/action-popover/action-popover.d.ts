import * as React from "react";

export interface ActionPopoverProps {
  id?: string;
  onOpen?: () => void;
  onClose?: () => void;
  rightAlignMenu?: boolean;
  renderButton?: (args: object) => React.ReactNode;
  placement?: "bottom" | "top";
}

declare function ActionPopover(props: ActionPopoverProps): JSX.Element;

export default ActionPopover;
