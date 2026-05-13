import React, { useRef } from "react";

import {
  StyledSelectText,
  StyledSelectTextChildrenWrapper,
} from "./select-textbox.style";

import Textbox, { CommonTextboxProps } from "../../../textbox";
import useLocale from "../../../../hooks/__internal__/useLocale";
import { ValidationProps } from "../../../../__internal__/validations";
import combineRefs from "../../../../__internal__/utils/helpers/combine-refs";

export interface FormInputPropTypes
  extends ValidationProps,
    Omit<CommonTextboxProps, "onClick" | "onChange" | "data-component"> {
  /**
   * @deprecated `adaptiveLabelBreakpoint` has been deprecated.
   * It is recommended to use `useMediaQuery` hook to implement adaptive behaviour.
   * Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set
   **/
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
}

export interface SelectTextboxProps extends FormInputPropTypes {
  /** Id attribute of the select list */
  "aria-controls"?: string;
  /** Value to be displayed in the Textbox */
  formattedValue?: string;
  /** If true, the list is displayed */
  isOpen?: boolean;
  /** Value of the Select Input */
  selectedValue?:
    | string
    | Record<string, unknown>
    | (string | Record<string, unknown>)[];
  /** @private @ignore */
  transparent?: boolean;
  /** @private @ignore */
  activeDescendantId?: string;
  /** Specify a callback triggered on change */
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Sets the type of select, which determines the behaviour of the textbox.
   * If "simple", the textbox does not allow typing and functions as a standard select.
   * If "filterable", the textbox allows typing and filters the options based on the input value.
   * If "multi", the textbox allows typing and is used for multi-selects, displaying selected options as comma-separated values.
   */
  selectType?: "simple" | "filterable" | "multi";
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
      selectType,
      transparent = false,
      activeDescendantId,
      onKeyDown,
      onChange,
      ...restProps
    }: SelectTextboxProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const l = useLocale();
    const localRef = useRef<HTMLInputElement>(null);
    const placeholder = customPlaceholder || l.select.placeholder();
    const showPlaceholder = !disabled && !readOnly && !formattedValue;
    const shouldRenderInput =
      selectType === "filterable" || selectType === "multi";
    const combinedRefs = combineRefs(ref, localRef);

    function handleTextboxClick(
      event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) {
      if (disabled) {
        return;
      }

      /* istanbul ignore else */
      if (localRef.current && document.activeElement !== localRef.current) {
        localRef.current.focus();
      }

      if (readOnly) {
        return;
      }

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
      onClick: handleTextboxClick,
      onFocus: handleTextboxFocus,
      onBlur,
      labelId,
      type: "text",
      ref: combinedRefs,
      onKeyDown,
      ...restProps,
    };

    const {
      "aria-describedby": ariaDescribedBy,
      leftChildren,
      ...filteredRestProps
    } = restProps;

    const inputAriaAttributes = {
      "aria-expanded": readOnly ? undefined : isOpen,
      "aria-labelledby": accessibilityLabelId
        ? `${ariaLabelledby || labelId} ${accessibilityLabelId}`
        : ariaLabelledby,
      "aria-activedescendant": activeDescendantId,
      "aria-controls": ariaControls,
      "aria-autocomplete":
        selectType === "filterable" || selectType === "multi"
          ? ("both" as const)
          : undefined,
      role: readOnly ? undefined : "combobox",
    };

    const hasStringValue =
      typeof selectedValue === "string" ||
      (Array.isArray(selectedValue) && typeof selectedValue[0] === "string");

    const classNames = [shouldRenderInput ? "select-allows-typing" : undefined]
      .filter(Boolean)
      .join(" ");

    return (
      <Textbox
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        data-element={`${selectType ?? ""}-select-input`}
        data-role="select-textbox"
        inputIcon="dropdown"
        autoComplete="off"
        size={size}
        formattedValue={formattedValue}
        placeholder={shouldRenderInput ? placeholder : undefined}
        {...inputAriaAttributes}
        {...textboxProps}
        className={classNames}
        data-is-transparent={transparent}
        data-is-open={isOpen}
        // prevent uncontrolled warning being fired
        onChange={onChange}
        // ensure value is properly controlled
        value={
          hasStringValue ? (selectedValue as string | string[]) : undefined
        }
        // prevents any form spacing being applied
        my={0}
        leftChildren={
          !shouldRenderInput ? (
            <StyledSelectText
              aria-hidden
              data-element="select-text"
              data-role="select-text"
              $disabled={disabled}
              $hasPlaceholder={showPlaceholder}
              onClick={handleTextboxClick}
              $readOnly={readOnly}
              $size={size}
              $transparent={transparent}
              className={`select-text ${disabled ? "disabled" : ""} ${readOnly ? "read-only" : ""}`}
              {...filteredRestProps}
            >
              <StyledSelectTextChildrenWrapper
                $isDisabled={disabled}
                $readOnly={readOnly}
              >
                {showPlaceholder ? placeholder : formattedValue}
              </StyledSelectTextChildrenWrapper>
            </StyledSelectText>
          ) : (
            leftChildren
          )
        }
      />
    );
  },
);

SelectTextbox.displayName = "SelectTextbox";

export default SelectTextbox;
