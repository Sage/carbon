import * as React from 'react';
import { IconTypes } from '../../utils/helpers/options-helper/options-helper';
import ActionPopoverMenu from './action-popover-menu';

export interface ActionPopoverItemProps {
  children: string;
  icon: IconTypes;
  disabled?: boolean;
  onClick: () => void;
  submenu?: typeof ActionPopoverMenu;
}

declare const ActionPopoverItem: React.FunctionComponent<ActionPopoverItemProps>;

export default ActionPopoverItem;
