import * as React from 'react';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  fieldHelp?: string;
  fieldHelpInline?: boolean;
  id?: string;
  inputWidth?: number | string;
  label?: string;
  labelHelp?: string;
  labelAlign?: string;
  labelInline?: boolean;
  labelWidth?: number | string;
  loading?: boolean;
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  reverse?: boolean;
  size?: string;
  theme?: object;
  value: string;
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
}

declare const Switch: React.ComponentClass<SwitchProps>;

export { Switch as default };
