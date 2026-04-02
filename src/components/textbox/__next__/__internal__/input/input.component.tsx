import React, { useEffect, useRef } from "react";
import InputContainer from "./input.style";
import Icon, { IconType } from "../../../../icon";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "size"
  > {
  /** The ID of the input's description, is set along with hint text and error message. */
  "aria-describedby"?: string;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** HTML id attribute of the input */
  id?: string;
  /** Name of the input */
  name?: string;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on change */
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on focus */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Placeholder string to be displayed in input */
  placeholder?: string;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** The value of the input */
  value: string | readonly string[] | number | undefined;
  /** If true, the input will display error styling */
  error?: boolean;
  /** The width of the input as a percentage (e.g., 50 for 50%) */
  inputWidth?: number;
  /** Type of the icon that will be rendered next to the input */
  inputIcon?: IconType;
  /** Size of the input */
  size?: "small" | "medium" | "large";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      inputWidth,
      inputIcon,
      disabled,
      readOnly,
      autoFocus,
      size,
      ...props
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const inputRef = ref || localRef;
    const stateProps = { disabled, readOnly };

    useEffect(() => {
      if (autoFocus && inputRef && "current" in inputRef) {
        inputRef.current?.focus();
      }
    }, [autoFocus, inputRef]);

    return (
      <InputContainer
        data-role="input-container"
        inputWidth={inputWidth}
        error={error}
        size={size}
        {...stateProps}
      >
        <div data-role="input-text-container">
          <input type="text" ref={inputRef} {...stateProps} {...props} />
          {inputIcon && (
            <Icon type={inputIcon} disabled={disabled || readOnly} />
          )}
        </div>
      </InputContainer>
    );
  },
);

export default Input;
