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
  styleOverride?: () => object | object;
}

declare const Label: React.FunctionComponent<LabelPropTypes>;

export default Label;
