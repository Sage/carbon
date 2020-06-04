import * as React from 'react';

export interface RadioButtonGroupProps {
  /** The RadioButton objects to be rendered in the group */
  children: React.ReactNode;
  /** Specifies the name prop to be applied to each button in the group */
  name: string;
  /** The content for the RadioGroup Legend */
  legend?: string;
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
  /** Callback fired when each RadioButton is blurred */
  onBlur?: (ev: React.SyntheticEvent) => void;
  /** Callback fired when the user selects a RadioButton */
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** value of the selected RadioButton */
  value?: string;
  /** When true, RadioButtons are in line */
  inline?: boolean;
  /** When true, legend is placed in line with the radiobuttons */
  legendInline: boolean;
  /** Allows to override existing component styles */
  styleOverride?: {
    root?: object;
    content?: object;
    legend?: object;
  };
}

declare const RadioButtonGroup: React.ComponentClass<RadioButtonGroupProps>;

export { RadioButtonGroup };
