import * as React from "react";

export interface TextareaProps {
  /** id of the input */
  id?: string;
  /** Character limit of the textarea */
  characterLimit?: string;
  /** Type of the icon that will be rendered next to the input */
  children?: React.ReactNode;
  /** The visible width of the text control, in average character widths */
  cols?: number;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** Stop the user typing over the characterLimit */
  enforceCharacterLimit?: boolean;
  /** Allows the Textareas Height to change based on user input */
  expandable?: boolean;
  /** Label */
  label?: string;
  /** When true, label is placed in line an input */
  labelInline?: boolean;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth?: number;
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth?: number;
  /** Name of the input */
  name?: string;
  /** Callback fired when the user types in the Textarea */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder text for the component */
  placeholder?: string;
  /** Adds readOnly property */
  readOnly?: boolean;
  /** The number of visible text lines for the control */
  rows?: number;
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /** The value of the Textbox */
  value?: string;
  /** Whether to display the character count message in red */
  warnOverLimit?: boolean;
  /** Indicate that error has occurred
   * Pass string to display icon, tooltip and red border
   * Pass true boolean to only display red border
   */
  error?: boolean | string;
  /** Indicate that warning has occurred
   * Pass string to display icon, tooltip and orange border
   * Pass true boolean to only display orange border
   */
  warning?: boolean | string;
  /** Indicate additional information
   * Pass string to display icon, tooltip and blue border
   * Pass true boolean to only display blue border
   */
  info?: boolean | string;
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** Type of the icon that will be rendered next to the input */
  inputIcon?: string;
  /** Message to be displayed in a Tooltip when the user hovers over the help icon */
  tooltipMessage?: string;
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 7;
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Flag to configure component as mandatory */
  required?: boolean;
}

declare const Textarea: React.ComponentClass<TextareaProps>;

export default Textarea;
