import * as React from 'react';
import { MarginSpacingProps } from "../../utils/helpers/options-helper";

export interface ActionPopoverProps extends MarginSpacingProps {
  id?: string;
  onOpen?: () => void;
  onClose?: () => void;
  rightAlignMenu?: boolean;
  renderButton?: (args: object) => React.ReactNode;
  placement?: 'bottom' | 'top';
}

declare const ActionPopover: React.FunctionComponent<ActionPopoverProps>;

export default ActionPopover;
