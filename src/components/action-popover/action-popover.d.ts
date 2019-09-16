import * as React from 'react';
import { IconTypes } from '../../utils/helpers/options-helper/options-helper';

export interface ActionPopoverProps {
  id?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface ActionPopoverPropsItemProps {
  children: string;
  icon: IconTypes;
  disabled?: boolean;
  onClick: () => void;
}

declare const ActionPopover: React.FunctionComponent<ActionPopoverProps> & {
  Item: React.FunctionComponent<ActionPopoverPropsItemProps>;
  Divider: React.FunctionComponent;
};

export default ActionPopover;
