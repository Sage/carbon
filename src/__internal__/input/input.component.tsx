import React, { useCallback, useEffect, useRef, useContext } from "react";
import InputContainer from "./input.style";
import combineRefs from "../utils/helpers/combine-refs";
import SelectTextboxContext from "../../components/select/__internal__/select-textbox/__internal__/select-textbox.context";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "size"> {
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
  value: string | readonly string[] | number;
  /** If true, the input will display error styling */
  error?: boolean;
  /** The width of the input as a percentage (e.g., 50 for 50%) */
  inputWidth?: number;
  /** Type of the icon that will be rendered next to the input */
  inputIcon?: React.ReactNode;
  /** Size of the input */
  size?: "small" | "medium" | "large";
  /** Emphasised text to be displayed before the input */
  prefix?: string;
  /** ID for the prefix span element */
  prefixId?: string;
  /** Additional children to be rendered before the input */
  leftChildren?: React.ReactNode;
  /** Text alignment within the input */
  align?: "left" | "right";
  /**
   * @private @internal @ignore
   */
  "data-is-transparent"?: boolean;
  /**
   * @private @internal @ignore
   */
  "data-is-open"?: boolean;
}

const selectTextOnFocus = (
  input: React.RefObject<HTMLInputElement | HTMLTextAreaElement>,
) => {
  // setTimeout is required so the dom has a chance to place the cursor in the input
  setTimeout(() => {
    if (input?.current) {
      const { selectionStart, selectionEnd, value } = input.current;
      const { length } = value;
      // only select text if cursor is at the very end or the very start of the value
      if (
        (selectionStart === 0 && selectionEnd === 0) ||
        (selectionStart === length && selectionEnd === length)
      ) {
        if (document.activeElement === input.current) {
          input.current.setSelectionRange(0, length);
        }
      }
    }
  });
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      align = "left",
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      autoFocus,
      error,
      "data-is-transparent": dataIsTransparent,
      "data-is-open": dataIsOpen,
      children,
      disabled,
      id,
      inputIcon,
      inputWidth,
      leftChildren,
      name,
      onFocus,
      prefix,
      prefixId,
      readOnly,
      size,
      type = "text",
      ...rest
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const combinedRef = combineRefs(ref, localRef);
    const { selectType } = useContext(SelectTextboxContext);

    useEffect(() => {
      if (autoFocus) {
        localRef.current?.focus();
      }
    }, [autoFocus]);

    const handleFocus = useCallback(
      (ev: React.FocusEvent<HTMLInputElement>) => {
        onFocus?.(ev);
        if (type === "text") {
          selectTextOnFocus(localRef);
        }
      },
      [onFocus, type],
    );

    const prefixElement = (
      <span id={prefixId} data-element="textbox-prefix">
        {prefix}
      </span>
    );

    return (
      <InputContainer
        $align={align}
        data-role="input-container"
        $error={error}
        $size={size}
        $isDisabled={disabled}
        $isReadOnly={readOnly}
        data-is-transparent={dataIsTransparent}
        data-is-open={dataIsOpen}
      >
        <div
          data-role="input-text-container"
          role="presentation"
          className={`input-text-container ${disabled ? "disabled" : ""} ${readOnly ? "read-only" : ""}`}
        >
          {prefix && selectType === "multi" && prefixElement}
          {leftChildren}
          {prefix && selectType !== "multi" && prefixElement}
          <input
            ref={combinedRef}
            data-element="input"
            data-role="input"
            disabled={disabled}
            readOnly={readOnly}
            aria-describedby={ariaDescribedBy}
            aria-labelledby={ariaLabelledBy}
            type={type}
            onFocus={handleFocus}
            id={id}
            name={name}
            data-has-autofocus={autoFocus ? true : undefined}
            {...rest}
          />
          {inputIcon}
          {children}
        </div>
      </InputContainer>
    );
  },
);

export default Input;
