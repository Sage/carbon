import * as React from "react";
import { MarginProps } from "styled-system";

import { ValidationPropTypes } from "../../__internal__/validations";
import { CommonInputProps } from "../../__internal__/input";

export interface CommonTextboxProps
  extends ValidationPropTypes,
    MarginProps,
    Omit<CommonInputProps, "size"> {
  /** Automatically focus the input on component mount */
  autoFocus?: boolean;
  /* The default value alignment on the input */
  align?: "right" | "left";
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
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
  /** Unique identifier for the input. Will use a randomly generated GUID if none is provided */
  id?: string;
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
  /** Inline label alignment */
  labelAlign?: "left" | "right";
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
  /** Deferred callback to be called after the onChange event */
  onChangeDeferred?: () => void;
  /** Specify a callback triggered on click */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Event handler for the focus event */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Event handler for the blur event */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Event handler for the mouse down event */
  onMouseDown?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Input name */
  name?: string;
  /** Placeholder string to be displayed in input */
  placeholder?: string;
  /** Emphasized part of the displayed text */
  prefix?: string;
  /** Reverses label and input display */
  reverse?: boolean;
  /** The unformatted value  */
  rawValue?: string;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** The value of the Input */
  value?:
    | string
    | string[]
    | Record<string, unknown>
    | Record<string, unknown>[];
  /** A callback to retrieve the input reference */
  inputRef?: (input: React.RefObject<HTMLInputElement>) => void;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
}

export interface TextboxProps extends CommonTextboxProps {
  /** Content to be rendered next to the input */
  children?: React.ReactNode;
  /** [Legacy] Flag to configure component as optional in Form */
  isOptional?: boolean;
  /** Container for DatePicker or SelectList components */
  positionedChildren?: React.ReactNode;
  /** Label id passed from Select component */
  labelId?: string;
  /** Character limit of the textarea */
  characterLimit?: string;
  /** Stop the user typing over the characterLimit */
  enforceCharacterLimit?: boolean;
  /** Whether to display the character count message in red */
  warnOverLimit?: boolean;
}

declare function Textbox(props: TextboxProps): JSX.Element;
declare function TextboxWithUniqueIdProps(
  props: TextboxProps & React.RefAttributes<HTMLInputElement>
): JSX.Element;

export { Textbox as OriginalTextbox };
export default TextboxWithUniqueIdProps;
