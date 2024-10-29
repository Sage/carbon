import React from "react";

import { SelectTextboxContext } from "./select-textbox.context";
import {
  StyledSelectText,
  StyledSelectTextChildrenWrapper,
} from "./select-textbox.style";

import Textbox, { CommonTextboxProps } from "../../../textbox";
import useLocale from "../../../../hooks/__internal__/useLocale";
import { ValidationProps } from "../../../../__internal__/validations";

export interface FormInputPropTypes
  extends ValidationProps,
    Omit<CommonTextboxProps, "onClick" | "onChange"> {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Prop to specify the aria-label attribute of the component input */
  ariaLabel?: string;
  /** Prop to specify the aria-labelledby property of the component input */
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
  /** [Legacy] A message that the Help component will display */
  labelHelp?: React.ReactNode;
  /** [Legacy] When true label is inline */
  labelInline?: boolean;
  /** [Legacy] Label width */
  labelWidth?: number;
  /** Name attribute of the input element */
  name?: string;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on click */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on focus */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered onKeyDown */
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
  /** Flag to configure component as optional in Form */
  isOptional?: boolean;
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
      disabled = false,
      isOpen,
      id,
      readOnly = false,
      placeholder: customPlaceholder,
      size = "medium",
      onClick,
      onFocus,
      onBlur,
      formattedValue = "",
      selectedValue,
      required,
      isOptional,
      hasTextCursor,
      transparent = false,
      activeDescendantId,
      onKeyDown,
      ...restProps
    }: SelectTextboxProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const l = useLocale();
    const placeholder = customPlaceholder || l.select.placeholder();
    const showPlaceholder = !disabled && !readOnly && !formattedValue;

    function handleTextboxClick(
      event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) {
      onClick?.(event as React.MouseEvent<HTMLInputElement>);
    }

    function handleTextboxFocus(event: React.FocusEvent<HTMLInputElement>) {
      if (disabled || readOnly) return;
      onFocus?.(event);
    }

    const textboxProps = {
      disabled,
      id,
      readOnly,
      required,
      isOptional,
      onClick: handleTextboxClick,
      onFocus: handleTextboxFocus,
      onBlur,
      labelId,
      type: "text",
      ref,
      onKeyDown,
      ...restProps,
    };

    const inputAriaAttributes = {
      "aria-expanded": readOnly ? undefined : isOpen,
      "aria-labelledby": accessibilityLabelId
        ? `${ariaLabelledby || labelId} ${accessibilityLabelId}`
        : ariaLabelledby,
      "aria-activedescendant": activeDescendantId,
      "aria-controls": ariaControls,
      "aria-autocomplete": hasTextCursor ? ("both" as const) : undefined,
      role: readOnly ? undefined : "combobox",
    };

    const hasStringValue =
      typeof selectedValue === "string" ||
      (Array.isArray(selectedValue) && typeof selectedValue[0] === "string");

    return (
      <SelectTextboxContext.Provider value={{ isInputInSelect: true }}>
        <Textbox
          aria-label={ariaLabel}
          data-element="select-input"
          data-role="select-textbox"
          inputIcon="dropdown"
          autoComplete="off"
          size={size}
          // prevent uncontrolled warning being fired
          onChange={() => {}}
          formattedValue={formattedValue}
          value={
            hasStringValue ? (selectedValue as string | string[]) : undefined
          }
          placeholder={hasTextCursor ? placeholder : undefined}
          {...inputAriaAttributes}
          {...textboxProps}
          my={0} // prevents any form spacing being applied
        >
          {!hasTextCursor && (
            <StyledSelectText
              aria-hidden
              data-element="select-text"
              data-role="select-text"
              disabled={disabled}
              hasPlaceholder={showPlaceholder}
              onClick={disabled || readOnly ? undefined : handleTextboxClick}
              readOnly={readOnly}
              transparent={transparent}
              size={size}
              {...restProps}
            >
              <StyledSelectTextChildrenWrapper>
                {showPlaceholder ? placeholder : formattedValue}
              </StyledSelectTextChildrenWrapper>
            </StyledSelectText>
          )}
        </Textbox>
      </SelectTextboxContext.Provider>
    );
  },
);

SelectTextbox.displayName = "SelectTextbox";

export default SelectTextbox;
