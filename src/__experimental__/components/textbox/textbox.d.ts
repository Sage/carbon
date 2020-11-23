import * as React from 'react';
import { SpacingProps } from '../../../utils/helpers/options-helper';
export interface TextboxProps extends SpacingProps {
  /**
   * An optional alternative for props.value, this is useful if the
   * real value is an ID but you want to show a human-readable version.
   */
  formattedValue?: string;
  /** The value of the Textbox */
  value?: string | object | array;
  /** The unformatted value  */
  rawValue?: string;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Event handler for the change event */
  onChange?: function;
  /** Event handler for the keyDown event */
  onKeyDown?: function;
  /** Defered callback called after the onChange event */
  onChangeDeferred?: function;
  /** Integer to determine timeout for defered callback */
  deferTimeout?: number;
  /** Label */
  label?: string;
  /** Text applied to label help tooltip */
  labelHelp?: string;
  /** When true, label is placed in line an input */
  labelInline?: boolean;
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth?: number;
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth?: number;
  /** Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  children?: React.ReactNode;
  /** Type of the icon that will be rendered next to the input */
  inputIcon?: string;
  /** Additional child elements to display before the input */
  leftChildren?: React.ReactNode;
  /** Flag to configure component when in a Form */
  childOfForm?: boolean;
  /** Flag to configure component as optional in Form */
  isOptional?: boolean;
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** Size of an input */
  size?: 'small' | 'medium' | 'large';
  /** Placeholder string to be displayed in input */
  placeholder?: string;
  /** Optional handler for click event on Textbox icon */
  iconOnClick?: function;
  /** Handler for onClick events */
  onClick?: function;
  /** Emphasized part of the displayed text */
  prefix?: string;
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
}
declare const Textbox: React.ComponentType<TextboxProps>;
export default Textbox;
