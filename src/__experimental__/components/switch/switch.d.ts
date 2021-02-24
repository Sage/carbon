import * as React from "react";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  fieldHelp?: string;
  fieldHelpInline?: boolean;
  id?: string;
  inputWidth?: number | string;
  label?: string;
  labelHelp?: string;
  labelAlign?: string;
  labelInline?: boolean;
  labelSpacing?: 1 | 2;
  labelWidth?: number | string;
  loading?: boolean;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  reverse?: boolean;
  size?: string;
  value?: string;
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
  /** When true, validation icon will be placed on label instead of being placed by the input */
  validationOnLabel?: boolean;
  /** Override tab index on the validation and help icon */
  helpTabIndex?: number | string;
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 7;
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Flag to configure component as mandatory */
  required?: boolean;
}

declare const Switch: React.ComponentClass<SwitchProps>;

export { Switch as default };
