import * as React from 'react';
import { FormFieldSpacing } from '../../utils/helpers/options-helper/options-helper';

export interface HrProps {
  /** Margin top, this value will be multiplied by the theme spacing constant (8) */
  mt?: FormFieldSpacing;
  /** Margin bottom, this value will be multiplied by the theme spacing constant (8) */
  mb?: FormFieldSpacing;
  /** Margin left, any valid css value */
  ml?: string;
  /** Margin right, any valid css value */
  mr?: string;
}

declare const Hr: React.FunctionComponent<HrProps>;
export default Hr;
