import React, { useContext, useRef, useEffect } from "react";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import { StyledCheckbox, StyledCheckboxContentWrapper } from "./checkbox.style";
import CheckableInput, {
  CommonCheckableInputProps,
} from "../../__internal__/checkable-input/checkable-input.component";
import CheckboxSvg from "./__internal__/checkbox-svg.component";
import CheckboxGroupContext from "./__internal__/checkbox-group.context";

import ErrorBorder from "../../__internal__/error-border/error-border.style";
import ValidationMessage from "../../__internal__/validation-message/__next__";
import guid from "../../__internal__/utils/helpers/guid";
import { filterStyledSystemMarginProps } from "../../style/utils";
import FieldsetContext from "../fieldset/__internal__/fieldset.context";

export interface CheckboxProps
  extends CommonCheckableInputProps,
    MarginProps,
    TagProps {
  /**
   * Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set.
   * @deprecated Adaptive spacing is no longer supported on this component.
   */
  adaptiveSpacingBreakpoint?: number;
  /**
   * [Legacy] Aria label for rendered help component
   * @deprecated Help tooltips are no longer supported on this component.
   */
  helpAriaLabel?: string;
  /**
   * When true label is inline.
   * @deprecated The checkbox label always renders in line with the input.
   */
  labelInline?: boolean;
  /** Accepts a callback function which is triggered on click event */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
  /**
   * [Legacy] Overrides the default tooltip position.
   * @deprecated Tooltips are no longer supported on this component.
   */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** The value of the checkbox, passed on form submit */
  value?: string;
  /** Handler for change events */
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Checked state of the input. */
  checked: boolean;
  /** Indeterminate state of the input, will override checked value. */
  indeterminate?: boolean;
  /** Size of the CheckboxGroup. */
  size?: "small" | "medium" | "large";
  /** Flag to configure Checkbox as mandatory. */
  required?: boolean;
  /** Error message to be displayed when validation fails. */
  error?: string | boolean;
  /**
   * Warning message to be displayed when validation warning occurs.
   * @deprecated The `warning` state is deprecated and will be removed in a future release.
   */
  warning?: string | boolean;
  /**
   * [Legacy] Indicate additional information.
   * @deprecated Information validation is no longer supported on this component.
   */
  info?: string | boolean;
  /**
   * Help content to be displayed under an input
   * @deprecated The `fieldHelp` prop is no longer supported, please use the `inputHint` prop instead.
   */
  fieldHelp?: React.ReactNode;
  /**
   * If true, the FieldHelp will be displayed inline
   * To be used with labelInline prop set to true
   * @deprecated The `fieldHelpInline` prop is no longer supported on this component.
   */
  fieldHelpInline?: boolean;
  /**
   * [Legacy] The content for the help tooltip, to appear next to the Label
   * @deprecated The `labelHelp` prop is deprecated and will be removed in a future release. Please use the `inputHint` prop instead.
   */
  labelHelp?: React.ReactNode;
  /**
   * [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8)
   * @deprecated Custom spacing for labels is no longer supported on this component.
   */
  labelSpacing?: 1 | 2;
  /**
   * [Legacy] Label width
   * @deprecated Custom label widths are no longer supported on this component.
   */
  labelWidth?: number;
  /**
   * If true the label switches position with the input
   * @deprecated Reversed layout is no longer supported on this component.
   */
  reverse?: boolean;
  /**
   * Sets percentage-based input width
   * @deprecated Custom input widths are no longer supported on this component.
   */
  inputWidth?: number;
  /**
   * Render the ValidationMessage above the Checkbox
   * @deprecated The `validationMessagePositionTop` prop is deprecated and will be removed in a future release.
   */
  validationMessagePositionTop?: boolean;
}

export const Checkbox = React.forwardRef(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "data-element": dataElement,
      "data-role": dataRole,
      id,
      label,
      inputHint,
      name,
      value,
      fieldHelp,
      autoFocus,
      labelHelp,
      labelSpacing,
      labelWidth,
      adaptiveSpacingBreakpoint,
      required,
      error,
      warning,
      info,
      fieldHelpInline,
      reverse,
      checked,
      indeterminate,
      disabled,
      inputWidth,
      size = "medium",
      tooltipPosition,
      helpAriaLabel,
      progressiveDisclosure,
      validationMessagePositionTop = true,
      ...rest
    }: CheckboxProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const internalId = useRef(guid());
    const internalInputRef = useRef<HTMLInputElement | null>(null);
    const uniqueId = id || internalId.current;

    const validationId =
      error || warning ? `${uniqueId}-validation-message` : undefined;

    const combinedAriaDescribedBy = [validationId, ariaDescribedBy]
      .filter(Boolean)
      .join(" ");

    const {
      error: contextError,
      warning: contextWarning,
      inline,
      size: contextSize,
      disabled: contextDisabled,
      required: contextRequired,
    } = useContext(CheckboxGroupContext);

    const isInGroup = contextSize !== undefined;

    const { size: fieldsetSize, hasError: fieldsetError } =
      useContext(FieldsetContext);
    const actualSize = fieldsetSize || contextSize || size;
    const actualError = contextError || fieldsetError || !!error;

    const setInputRef = (node: HTMLInputElement | null) => {
      internalInputRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Set indeterminate state
    useEffect(() => {
      /* istanbul ignore else */
      if (internalInputRef.current) {
        internalInputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    const validationMessage = () => {
      if (error || warning) {
        return (
          <>
            <ValidationMessage
              error={error}
              warning={warning}
              id={validationId}
              size={fieldsetSize || size}
            />
            <ErrorBorder $warning={!!(!error && warning)} />
          </>
        );
      }
      return null;
    };

    const checkboxInput = (
      <CheckableInput
        type="checkbox"
        id={id}
        value={value}
        label={label}
        inputHint={inputHint || labelHelp}
        disabled={contextDisabled || disabled}
        required={contextRequired || required}
        showRequiredAsterisk={required}
        checked={checked}
        ref={setInputRef}
        autoFocus={autoFocus}
        size={actualSize}
        error={actualError}
        warning={contextWarning || !!warning}
        aria-describedby={combinedAriaDescribedBy}
        aria-checked={indeterminate ? "mixed" : checked}
        {...(!inline && { progressiveDisclosure })}
        {...rest}
      >
        <CheckboxSvg indeterminate={!!indeterminate} />
      </CheckableInput>
    );

    return (
      <StyledCheckbox
        $isDisabled={disabled || contextDisabled}
        $size={actualSize}
        $error={actualError}
        $checked={!!checked}
        $indeterminate={!!indeterminate}
        {...filterStyledSystemMarginProps(rest)}
        {...tagComponent("checkbox", {
          "data-element": dataElement,
          "data-role": dataRole,
        })}
      >
        {isInGroup ? (
          checkboxInput
        ) : (
          <StyledCheckboxContentWrapper $size={fieldsetSize || size}>
            {validationMessagePositionTop && validationMessage()}
            {checkboxInput}
            {!validationMessagePositionTop && validationMessage()}
          </StyledCheckboxContentWrapper>
        )}
      </StyledCheckbox>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
