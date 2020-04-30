import * as React from 'react';

import { AlignBinaryType } from '../../utils/helpers/options-helper/options-helper';

export interface PopoverContainerProps {
  children?: React.ReactNode;
  /** Sets rendering position of dialog */
  position?: AlignBinaryType;
  /** Sets the popover container dialog header name */
  title: string;
  /** Sets the icon that opens dialog */
  iconType: string;
}

declare const PopoverContainer: React.FunctionComponent<PopoverContainerProps>;

export default PopoverContainer;
