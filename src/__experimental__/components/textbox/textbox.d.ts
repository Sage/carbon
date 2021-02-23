import * as React from "react";
import { SpacingProps } from "../../../utils/helpers/options-helper";

export interface TextboxProps extends SpacingProps {
  /**
   * An optional alternative for props.value, this is useful if the
   * real value is an ID but you want to show a human-readable version.
   */
  formattedValue?: string;
  /** The value of the Textbox */
  value?: string | object | string[] | object[];
  /** The unformatted value  */
  rawValue?: string;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Event handler for the change event */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Event handler for the keyDown event */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Defered callback called after the onChange event */
  onChangeDeferred?: () => void;
  /** Integer to determine timeout for defered callback */
  deferTimeout?: number;
  /** Label */
  label?: string;
  /** Text applied to label help tooltip */
  labelHelp?: string;
  /** When true, label is placed in line an input */
  labelInline?: boolean;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth?: number;
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth?: number;
  /** Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /** Type of the icon that will be rendered next to the input */
  children?: React.ReactNode;
  /** Type of the icon that will be rendered next to the input */
  inputIcon?: string;
  /** Additional child elements to display before the input */
  leftChildren?: React.ReactNode;
  /** Flag to configure component when in a Form */
  childOfForm?: boolean;
  /** Flag to configure component as optional in Form */
  isOptional?: boolean;
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
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /** Placeholder string to be displayed in input */
  placeholder?: string;
  /** Optional handler for click event on Textbox icon */
  iconOnClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Overrides the default tabindex of the component */
  iconTabIndex?: string | number;
  /** Handler for onClick events */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Emphasized part of the displayed text */
  prefix?: string;
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 7;
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Flag to configure component as mandatory */
  required?: boolean;
}
declare const Textbox: React.ComponentType<TextboxProps>;
export default Textbox;
