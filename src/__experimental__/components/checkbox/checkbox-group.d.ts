import * as React from "react";

interface CheckboxGroupProps {
  /** The content for the CheckboxGroup Legend */
  legend?: string;
  /** When true, legend is placed in line with the checkboxes */
  legendInline?: boolean;
  /** Percentage width of legend (only when legend is inline)  */
  legendWidth?: number;
  /** Text alignment of legend when inline */
  legendAlign?: "left" | "right";
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing?: 1 | 2;
  /** The Checkboxes to be rendered in the group */
  children: React.FunctionComponent | React.ComponentClass;
  /** Specifies the name prop to be applied to each button in the group */
  groupName: string;
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
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 7;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Flag to configure component as mandatory */
  required?: boolean;
}

declare const CheckboxGroup: React.ComponentClass<CheckboxGroupProps>;

export { CheckboxGroup };
