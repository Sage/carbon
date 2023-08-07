import React, { useRef, useMemo } from "react";
import { offset, size as sizeMiddleware } from "@floating-ui/dom";

import useFloating from "../../../hooks/__internal__/useFloating";
import Textbox, { CommonTextboxProps } from "../../textbox";
import SelectText from "../__internal__/select-text";
import guid from "../../../__internal__/utils/helpers/guid";
import useLocale from "../../../hooks/__internal__/useLocale";
import { ValidationProps } from "../../../__internal__/validations";

const floatingMiddleware = [
  offset(({ rects }) => ({
    mainAxis: -rects.reference.height,
  })),
  sizeMiddleware({
    apply({ rects, elements }) {
      (elements.reference as HTMLElement).style.height = `${rects.floating.height}px`;
      elements.floating.style.width = `${rects.reference.width}px`;
    },
  }),
];

export interface FormInputPropTypes
  extends ValidationProps,
    Omit<CommonTextboxProps, "onClick"> {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Prop to specify the aria-label attribute of the component input */
  ariaLabel?: string;
  /** Prop to specify the aria-labeledby property of the component input */
  ariaLabelledby?: string;
  /** If true the Component will be focused when rendered */
  autoFocus?: boolean;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** Id attribute of the input element */
  id?: string;
  /** The width of the input as a percentage */
  inputWidth?: number;
  /** Label content */
  label?: string;
  /** A message that the Help component will display */
  labelHelp?: React.ReactNode;
  /** When true label is inline */
  labelInline?: boolean;
  /** Label width */
  labelWidth?: number;
  /** Name attribute of the input element */
  name?: string;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on change */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on click */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on focus */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** pecify a callback triggered on keuyDown */
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Placeholder string to be displayed in input */
  placeholder?: string;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /**
   * Id of the element containing the currently displayed value
   * to be read by voice readers
   * @private
   * @ignore
   */
  accessibilityLabelId?: string;
  /**
   * Label id passed from Select component
   * @private
   * @ignore
   *
   */
  labelId?: string;
}

export interface SelectTextboxProps extends FormInputPropTypes {
  /** Id attribute of the select list */
  "aria-controls"?: string;
  /** Value to be displayed in the Textbox */
  formattedValue?: string;
  /** If true, the input will be displayed */
  hasTextCursor?: boolean;
  /** If true, the list is displayed */
  isOpen?: boolean;
  /** Value of the Select Input */
  selectedValue?:
    | string
    | Record<string, unknown>
    | string[]
    | Record<string, unknown>[];
  /** @private @ignore */
  textboxRef?: HTMLInputElement | null;
  /** @private @ignore */
  transparent?: boolean;
  /** @private @ignore */
  activeDescendantId?: string;
}

const SelectTextbox = React.forwardRef(
  (
    {
      ariaLabel,
      ariaLabelledby,
      accessibilityLabelId,
      labelId,
      "aria-controls": ariaControls,
      disabled,
      isOpen,
      id,
      readOnly,
      placeholder,
      size = "medium",
      onClick,
      onFocus,
      onBlur,
      onChange,
      selectedValue,
      required,
      textboxRef,
      hasTextCursor,
      transparent,
      activeDescendantId,
      onKeyDown,
      ...restProps
    }: SelectTextboxProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const reference = useMemo(
      () => ({
        current: textboxRef?.parentElement?.parentElement || null,
      }),
      [textboxRef]
    );

    const floating = useMemo(
      () => ({
        current: textboxRef?.parentElement || null,
      }),
      [textboxRef]
    );

    useFloating({
      isOpen,
      reference,
      floating,
      strategy: "fixed",
      animationFrame: true,
      middleware: floatingMiddleware,
    });

    const l = useLocale();
    const textId = useRef(guid());

    function handleTextboxClick(
      event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
    ) {
      if (disabled || readOnly) {
        return;
      }

      onClick?.(event as React.MouseEvent<HTMLInputElement>);
    }

    function handleTextboxFocus(event: React.FocusEvent<HTMLInputElement>) {
      if (disabled || readOnly) {
        return;
      }

      if (onFocus) {
        onFocus(event);
      }
    }

    function handleTextboxBlur(event: React.FocusEvent<HTMLInputElement>) {
      if (onBlur) {
        onBlur(event);
      }
    }

    function handleSelectTextKeydown(event: React.KeyboardEvent<HTMLElement>) {
      if (event.key.length === 1) {
        onChange?.({
          target: { value: event.key },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }

    function getTextboxProps() {
      return {
        disabled,
        id,
        readOnly,
        required,
        onClick: handleTextboxClick,
        onFocus: handleTextboxFocus,
        onBlur: handleTextboxBlur,
        labelId,
        type: "text",
        ref,
        onKeyDown,
        ...restProps,
      };
    }

    function getInputAriaAttributes() {
      const joinIds = (...ids: (string | undefined)[]) =>
        ids.filter((item) => item !== undefined).join(" ");
      const combinedAriaLabelledBy = hasTextCursor
        ? joinIds(
            ariaLabelledby || labelId,
            accessibilityLabelId || textId.current
          )
        : joinIds(ariaLabelledby || labelId, textId.current);

      return {
        "aria-expanded": readOnly ? undefined : isOpen,
        "aria-labelledby":
          ariaLabel && !ariaLabelledby ? undefined : combinedAriaLabelledBy,
        "aria-activedescendant": activeDescendantId,
        "aria-controls": ariaControls,
        "aria-autocomplete": hasTextCursor ? ("both" as const) : undefined,
        role: readOnly ? undefined : "combobox",
      };
    }

    function renderSelectText() {
      return (
        <SelectText
          textId={textId.current}
          transparent={transparent}
          onKeyDown={
            (onKeyDown as (ev: React.KeyboardEvent<HTMLElement>) => void) ||
            handleSelectTextKeydown
          }
          placeholder={placeholder || l.select.placeholder()}
          onClick={handleTextboxClick}
          disabled={disabled}
          readOnly={readOnly}
          size={size}
          {...restProps}
        />
      );
    }

    const hasStringValue =
      typeof selectedValue === "string" ||
      (Array.isArray(selectedValue) && typeof selectedValue[0] === "string");

    return (
      <Textbox
        aria-label={ariaLabel}
        data-element="select-input"
        inputIcon="dropdown"
        autoComplete="off"
        size={size}
        onChange={onChange}
        value={
          hasStringValue ? (selectedValue as string | string[]) : undefined
        }
        placeholder={
          hasTextCursor ? placeholder || l.select.placeholder() : undefined
        }
        {...getInputAriaAttributes()}
        {...getTextboxProps()}
        my={0} // prevents any form spacing being applied
      >
        {!hasTextCursor && renderSelectText()}
      </Textbox>
    );
  }
);

SelectTextbox.displayName = "SelectTextbox";

export default SelectTextbox;
