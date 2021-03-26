import * as React from "react";

export interface FieldsetProps {
  /** Fieldset content */
  children: React.ReactNode;
  /** The content for the Fieldset Legend */
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
  /** When true, legend is placed in line with the children */
  inline?: boolean;
  /** Percentage width of legend (only when legend is inline)  */
  legendWidth?: number;
  /** Text alignment of legend when inline */
  legendAlign?: "left" | "right";
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing?: 1 | 2;
  /** Margin left, any valid CSS value */
  ml?: string;
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** Allows to override existing component styles */
  styleOverride?: {
    root?: object;
    legend?: object;
  };
  /** If true, an asterisk will be added to the label */
  isRequired?: boolean;
  /** Controls whether group behaviour should be enabled */
  blockGroupBehaviour?: boolean;
}

declare function Fieldset(props: FieldsetProps): JSX.Element;

export default Fieldset;
