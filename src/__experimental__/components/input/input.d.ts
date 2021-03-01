import * as React from "react";
export interface CommonInputProps {
  /** If true the Component will be focused when rendered */
  autoFocus?: boolean;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** HTML id attribute of the input */
  id?: string;
  /** A callback to retrieve the input reference */
  inputRef?: () => void;
  /** Name of the input */
  name?: string;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Specify a callback triggered on change */
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** pecify a callback triggered on click */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Specify a callback triggered on focus */
  onFocus?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** pecify a callback triggered on keuyDown */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Placeholder string to be displayed in input */
  placeholder?: string;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** The value of the Input */
  value?: string | string[] | object | object[];
}

export interface InputProps extends CommonInputProps {
  /** Integer to determine a timeout for the defered callback */
  deferTimeout?: number;
  /** Defered callback to be called after the onChange event */
  onChangeDeferred?: () => void;
  /** HTML type attribute of the input */
  type?: string;
}

declare const Input: React.ComponentType<InputProps & React.HTMLProps<HTMLInputElement>>;

export default Input;
