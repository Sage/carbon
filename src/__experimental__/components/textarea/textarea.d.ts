import * as React from "react";
import { MarginProps } from "styled-system";

import { ValidationPropTypes } from "../../../components/validations";
import { FormFieldSize } from "../form-field/form-field";

export interface TextareaProps extends ValidationPropTypes, MarginProps {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
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
  /** id of the input */
  id?: string;
  /** Type of the icon that will be rendered next to the input */
  inputIcon?: string;
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth?: number;
  /** Label */
  label?: string;
  /** Text applied to label help tooltip */
  labelHelp?: React.ReactNode;
  /** When true, label is placed in line an input */
  labelInline?: boolean;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth?: number;
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 7;
  /** Name of the input */
  name?: string;
  /** Callback fired when the user types in the Textarea */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder text for the component */
  placeholder?: string;
  /** Adds readOnly property */
  readOnly?: boolean;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** The number of visible text lines for the control */
  rows?: number;
  /** Size of an input */
  size?: FormFieldSize;
  /** Message to be displayed in a Tooltip when the user hovers over the help icon */
  tooltipMessage?: string;
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** The value of the Textbox */
  value?: string;
  /** Whether to display the character count message in red */
  warnOverLimit?: boolean;
}

declare class Textarea extends React.Component<TextareaProps> {}

export { Textarea as OriginalTextarea, FormFieldSize };
export default Textarea;
