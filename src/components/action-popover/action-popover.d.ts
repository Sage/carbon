import * as React from 'react';

export interface ActionPopoverProps {
  id?: string;
  onOpen?: () => void;
  onClose?: () => void;
  rightAlignMenu?: boolean;
}

declare const ActionPopover: React.FunctionComponent<ActionPopoverProps>;

export default ActionPopover;
