import * as React from "react";

export interface CommonHiddenCheckableInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "size" | "type"
  > {
  /** If true the Component will be focused when page load */
  autoFocus?: boolean;
  /** Checked state of the input */
  checked?: boolean;
  /** Input name */
  name?: string;
  /** OnChange event handler */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** OnFocus event handler */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Blur event handler */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** OnMouseLeave event handler */
  onMouseLeave?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** OnMouseEnter event handler */
  onMouseEnter?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** Value of the input */
  value?: string;
  /** A callback to retrieve the input reference */
  inputRef?: React.Ref<HTMLInputElement>;
}

export interface HiddenCheckableInputProps
  extends CommonHiddenCheckableInputProps {
  /** HTML type attribute of the input */
  type: string;
  /** Element id for aria-describedby */
  helpId?: string;
  /** Element id for aria-describedby */
  fieldHelpId?: string;
  /** Element id for aria-labelledby */
  labelId?: string;
  /** The id of the element that labels the input */
  ariaLabelledBy?: string;
}

declare function HiddenCheckableInput(
  props: HiddenCheckableInputProps
): JSX.Element;

export default HiddenCheckableInput;
