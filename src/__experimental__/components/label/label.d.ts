import * as React from 'react';

export interface LabelPropTypes {
  children?: React.ReactNode;
  labelId?: string;
  help?: string;
  helpIcon?: string;
  helpId?: string;
  helpTag?: string;
  helpTabIndex?: string;
  error?: string | boolean;
  warning?: string | boolean;
  info?: string | boolean;
  useValidationIcon?: boolean;
  tabIndex?: [string, number];
  /** Padding right, integer multiplied by base spacing constant (8) */
  pr?: 1 | 2;
  /** Padding left, integer multiplied by base spacing constant (8) */
  pl?: 1 | 2;
  /** When true label is inline */
  inline: boolean;
  /** Text alignment of label */
  align: 'left' | 'right';
  styleOverride?: () => object | object;
}

declare const Label: React.FunctionComponent<LabelPropTypes>;

export default Label;
