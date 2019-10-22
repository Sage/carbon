import * as React from 'react';
import { IconTypes } from '../../utils/helpers/options-helper/options-helper';

export interface ActionPopoverItemProps {
  children: string;
  icon: IconTypes;
  disabled?: boolean;
  onClick: () => void;
}

declare const ActionPopoverItem: React.FunctionComponent<ActionPopoverItemProps>;

export default ActionPopoverItem;
