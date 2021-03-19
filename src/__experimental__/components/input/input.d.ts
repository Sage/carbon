import * as React from "react";
export interface InputProps {
  className?: string;
  id?: string;
  inputRef?: () => void; // a callback to retrieve the input reference
  name?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: () => void;
  onFocus?: () => void;
  autoFocus?: () => void;
  onChange?: () => void;
  onChangeDeferred?: () => void;
  deferTimeout?: () => void;
  type?: string;
}
declare const Input: React.ComponentType<InputProps & React.HTMLProps<HTMLInputElement>>;
export default Input;
