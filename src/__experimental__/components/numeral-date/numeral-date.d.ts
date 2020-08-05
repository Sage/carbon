import * as React from 'react';

export interface NumeralDateProps {
  /* Array of strings to define custom input layout.
  Allowed formats:
  ['dd', 'mm', 'yyyy'],
  ['mm', 'dd', 'yyyy'],
  ['dd', 'mm'],
  ['mm', 'dd'],
  ['mm', 'yyyy'] */
  dateFormat?: ['dd', 'mm', 'yyyy'] | ['mm', 'dd', 'yyyy'] | ['dd', 'mm'] | ['mm', 'dd'] | ['mm', 'yyyy'];
  /** Default value for use in uncontrolled mode  */
  defaultValue?: object;
  /**  Value for use in 'controlled` mode  */
  value?: object;
  /* Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error?: boolean | string;
  /* Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning?: boolean | string;
  /* Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info?: boolean | string;
  /** Blur event handler  */
  onBlur?: () => void;
  /** Change event handler */
  onChange?: () => void;
  /** `id` for events */
  id?: string;
  /** `name` for events */
  name?: string;
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** Label */
  label?: string;
  /** Text applied to label help tooltip */
  labelHelp?: string;
  /** When true, label is placed in line with an input */
  labelInline?: boolean;
  /** Label alignment. Works only when labelInline is true */
  labelAlign?: 'left' | 'right';
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth?: number;
  /** Help content to be displayed under an input */
  fieldHelp?: string;
}

declare const NumeralDate: React.ComponentType<NumeralDateProps>;
export default NumeralDate;
