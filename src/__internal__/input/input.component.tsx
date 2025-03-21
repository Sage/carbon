import React, { useEffect, useContext, useRef, useCallback } from "react";
import StyledInput from "./input.style";
import { InputContext, InputGroupContext } from "../input-behaviour";
import { BorderRadiusType } from "../../components/box/box.component";
import { SelectTextboxContext } from "../../components/select/__internal__/select-textbox/select-textbox.context";

export type EnterKeyHintTypes =
  | "enter"
  | "done"
  | "go"
  | "next"
  | "previous"
  | "search"
  | "send";

export interface CommonInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /* The default value alignment on the input */
  align?: "right" | "left";
  /**
   * Set the ID of the input's description.
   * @deprecated Please use `aria-describedby` instead.
   */
  ariaDescribedBy?: string;
  /** The ID of the input's description, is set along with hint text and error message. */
  "aria-describedby"?: string;
  /** Override the variant component */
  as?: React.ElementType;
  /** If true the Component will be focused when rendered */
  autoFocus?: boolean;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** HTML id attribute of the input */
  id?: string;
  /** Specify a custom border radius for the input. Any valid border-radius design token, or an array of border-radius design tokens. */
  inputBorderRadius?: BorderRadiusType | BorderRadiusType[];
  /** Name of the input */
  name?: string;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on change */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on click */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on focus */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on keyDown */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Placeholder string to be displayed in input */
  placeholder?: string;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** Id of the validation icon */
  validationIconId?: string;
}

export interface InputProps extends CommonInputProps {
  /** The visible width of the text control, in average character widths */
  cols?: number;
  /** Integer to determine a timeout for the deferred callback */
  deferTimeout?: number;
  /** Deferred callback to be called after the onChange event */
  onChangeDeferred?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** The number of visible text lines for the control */
  rows?: number;
  /** HTML type attribute of the input */
  type?: string;
}

function selectTextOnFocus(
  input: React.RefObject<HTMLInputElement | HTMLTextAreaElement>,
) {
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
}

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      align,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      ariaDescribedBy: ariaDescribedByDeprecated,
      placeholder,
      disabled,
      readOnly,
      autoFocus,
      onClick,
      onChangeDeferred,
      onChange,
      onBlur,
      onFocus,
      deferTimeout,
      type = "text",
      id,
      name,
      validationIconId,
      inputBorderRadius = "borderRadius050",
      enterKeyHint,
      ...rest
    }: InputProps,
    ref,
  ): JSX.Element => {
    const context = useContext(InputContext);
    const groupContext = useContext(InputGroupContext);
    const { isInputInSelect } = useContext(SelectTextboxContext);
    const deferredTimeout = useRef<null | ReturnType<typeof setTimeout>>(null);
    let input = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

    if (ref && "current" in ref) {
      input = ref;
    }

    const callbackRef = useCallback(
      (element: HTMLInputElement) => {
        input.current = element;

        if (typeof ref === "function") {
          ref(element);
        }

        if (autoFocus && element) {
          element.focus();
        }

        if (enterKeyHint && element) {
          element.setAttribute("enterkeyhint", enterKeyHint);
        }
      },
      [autoFocus, ref, enterKeyHint],
    );

    useEffect(() => {
      if (context.inputRef) {
        context.inputRef(input);
      }
    }, [context, input]);

    useEffect(() => {
      if (disabled && context.onBlur) {
        context.onBlur();
      }
    }, [disabled, context]);

    const handleClick = (ev: React.MouseEvent<HTMLInputElement>) => {
      if (onClick) {
        onClick(ev);
      }
      input?.current?.focus();
    };

    const handleFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (onFocus) {
        onFocus(ev);
      }
      if (context.onFocus) {
        context.onFocus();
      }
      if (groupContext.onFocus) {
        groupContext.onFocus();
      }
      if (type === "text") {
        selectTextOnFocus(input);
      }
    };

    const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(ev);
      }
      if (context.onBlur) {
        context.onBlur();
      }
      if (groupContext.onBlur) {
        groupContext.onBlur();
      }
    };

    const handleDeferred = (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (onChangeDeferred) {
        if (deferredTimeout.current) {
          clearTimeout(deferredTimeout.current);
        }
        deferredTimeout.current = setTimeout(() => {
          onChangeDeferred(ev);
        }, deferTimeout || 750);
      }
    };

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(ev);
      }
      handleDeferred(ev);
    };

    const hasValidationPart =
      (context.hasFocus ||
        groupContext.hasFocus ||
        context.hasMouseOver ||
        groupContext.hasMouseOver) &&
      validationIconId;

    const descriptionList =
      ariaDescribedBy || ariaDescribedByDeprecated
        ? [ariaDescribedBy || ariaDescribedByDeprecated]
        : [];

    if (hasValidationPart) {
      descriptionList.push(validationIconId);
    }

    const combinedDescription = descriptionList.length
      ? descriptionList.filter(Boolean).join(" ")
      : undefined;

    return (
      <StyledInput
        {...rest}
        isInputInSelect={isInputInSelect}
        data-has-autofocus={autoFocus ? true : undefined}
        aria-describedby={combinedDescription}
        aria-labelledby={ariaLabelledBy}
        align={align}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        name={name}
        type={type}
        id={id || name}
        ref={callbackRef}
        data-element="input"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        onChange={handleChange}
        inputBorderRadius={inputBorderRadius}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
