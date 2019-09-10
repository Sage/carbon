import * as React from 'react';

export interface LabelPropTypes {
  children?: React.ReactNode;
  help?: string;
  helpIcon?: string;
  helpId?: string;
  helpTag?: string;
  helpTabIndex?: string;
  tooltipMessage?: string;
  useValidationIcon?: boolean;
}

declare const Label: React.FunctionComponent<LabelPropTypes>;

export default Label;
