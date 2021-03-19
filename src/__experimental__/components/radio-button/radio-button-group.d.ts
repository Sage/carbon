import * as React from "react";
import { MarginSpacingProps } from "../../../utils/helpers/options-helper";

export interface RadioButtonGroupProps extends MarginSpacingProps {
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
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** value of the selected RadioButton */
  value?: string;
  /** When true, RadioButtons are in line */
  inline?: boolean;
  /** When true, legend is placed in line with the radiobuttons */
  legendInline: boolean;
  /** Percentage width of legend (only when legend is inline)  */
  legendWidth?: number;
  /** Text alignment of legend when inline */
  legendAlign?: "left" | "right";
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing?: 1 | 2;
  /** Spacing between labels and radio buttons, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Breakpoint for adaptive legend (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLegendBreakpoint?: number;
  /** Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set */
  adaptiveSpacingBreakpoint?: number;
  /** Allows to override existing component styles */
  styleOverride?: {
    root?: object;
    content?: object;
    legend?: object;
  };
  /** Flag to configure component as mandatory */
  required?: boolean;
}

declare const RadioButtonGroup: React.FunctionComponent<RadioButtonGroupProps>;

export { RadioButtonGroup };
