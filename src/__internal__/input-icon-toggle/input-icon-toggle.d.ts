import * as React from "react";

export interface InputIconToggleProps {
  error?: boolean | string;
  info?: boolean | string;
  warning?: boolean | string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: (ev: React.ChangeEvent<HTMLElement>) => void;
  onBlur?: (ev: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (ev: React.FocusEvent<HTMLElement>) => void;
  onMouseDown?: (ev: React.ChangeEvent<HTMLElement>) => void;
  inputIcon?: string;
  align?: "left" | "right";
  useValidationIcon?: boolean;
  iconTabIndex?: number;
  tooltipId?: string;
}
declare function InputIconToggle(props: InputIconToggleProps): JSX.Element;

export default InputIconToggle;
