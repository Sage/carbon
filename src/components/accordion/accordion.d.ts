import * as React from 'react';

import { AlignBinaryType, ThemesBinary } from '../../utils/helpers/options-helper/options-helper';

export interface AccordionProps {
  children?: React.ReactNode;
  id?: string;
  /** Set the default state of expansion of the Accordion if component is meant to be used as uncontrolled */
  defaultExpanded?: boolean;
  /** Sets the expansion state of the Accordion if component is meant to be used as controlled */
  expanded?: boolean;
  /** Sets icon type - accepted values: 'chevron_down' (default), 'dropdown' */
  iconType?: 'chevron_down' | 'dropdown';
  /** Sets icon alignment - accepted values: 'left', 'right' (default) */
  iconAlign?: AlignBinaryType;
  /** Allows to override existing component styles */
  styleOverride?: {
   root?: () => object | object;
   headerArea?: () => object | object;
   icon?: () => object | object;
   header?: () => object | object;
   content?: () => object | object;
  };
  /** Callback fired when expansion state changes, onChange(event: object, isExpanded: boolean) */
  onChange?: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, isExpanded: boolean) => void;
  /** Sets accordion type to either primary (default), or secondary */
  type?: ThemesBinary;
  /** Sets accordion title */
  title: string;
  /** Sets accordion sub title */
  subTitle?: string;
  /** Sets accordion size */
  size: 'large' | 'small';
  /** Adds additional top and bottom padding */
  customPadding: number;
  /** Toggles left and right borders */
  borders: 'default' | 'full';
  /** Sets background as white or transparent */
  scheme: 'white' |'transparent';
  /** Sets accordion width */
  width: string;
}

declare const Accordion: React.FunctionComponent<AccordionProps>;
export default Accordion;
