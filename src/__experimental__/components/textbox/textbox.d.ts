import * as React from "react";
import { SpaceProps } from "styled-system";
import { ValidationPropTypes } from "../../../components/validations";
import { FormFieldSize } from "../form-field/form-field";

export interface CommonTextboxProps extends ValidationPropTypes {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Flag to indicate that component is used in a Form */
  childOfForm?: boolean;
  /** Integer to determine a timeout for the defered callback */
  deferTimeout?: number;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /**
   * An optional alternative for props.value, this is useful if the
   * real value is an ID but you want to show a human-readable version.
   */
  formattedValue?: string;
  /** Type of the icon that will be rendered next to the input */
  inputIcon?: string;
  /** Optional handler for click event on Textbox icon */
  iconOnClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Overrides the default tabindex of the component */
  iconTabIndex?: string | number;
  /** The width of the input as a percentage */
  inputWidth?: number;
  /** Additional child elements to display before the input */
  leftChildren?: React.ReactNode;
  /** Label content */
  label?: string;
  /** A message that the Help component will display */
  labelHelp?: React.ReactNode;
  /** When true label is inline */
  labelInline?: boolean;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Label width */
  labelWidth?: number;
  /** Specify a callback triggered on change */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Defered callback to be called after the onChange event */
  onChangeDeferred?: () => void;
  /** Specify a callback triggered on click */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Specify a callback triggered on keuyDown */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Placeholder string to be displayed in input */
  placeholder?: string;
  /** Emphasized part of the displayed text */
  prefix?: string;
  /** The unformatted value  */
  rawValue?: string;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** Size of an input */
  size?: FormFieldSize;
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** The value of the Input */
  value?: string | string[] | object | object[];
}

export interface TextboxProps extends CommonTextboxProps, SpaceProps {
  /** Content to be rendered next to the input */
  children?: React.ReactNode;
  /** [Legacy] Flag to configure component as optional in Form */
  isOptional?: boolean;
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 7;
  /** Container for DatePicker or SelectList components */
  positionedChildren?: React.ReactNode;
}

declare function Textbox(props: TextboxProps): JSX.Element;
declare function TextboxWithUniqueIdProps(props: TextboxProps & React.RefAttributes<HTMLInputElement>): JSX.Element;

export { Textbox as OriginalTextbox, FormFieldSize };
export default TextboxWithUniqueIdProps;
