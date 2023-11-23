import React, { useState, useCallback, useContext } from "react";
import { MarginProps } from "styled-system";

import StyledSwitch, { ErrorBorder, StyledHintText } from "./switch.style";
import CheckableInput, {
  CommonCheckableInputProps,
} from "../../__internal__/checkable-input";
import SwitchSlider from "./__internal__/switch-slider.component";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import Logger from "../../__internal__/utils/logger";
import useFormSpacing from "../../hooks/__internal__/useFormSpacing";
import { NewValidationContext } from "../carbon-provider/carbon-provider.component";
import ValidationMessage from "../../__internal__/validation-message/validation-message.component";
import Box from "../box";
import Label from "../../__internal__/label";

export interface SwitchProps extends CommonCheckableInputProps, MarginProps {
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Set the default value of the Switch if component is meant to be used as uncontrolled */
  defaultChecked?: boolean;
  /** Text alignment of the label */
  labelAlign?: "left" | "right";
  /** When true label is inline */
  labelInline?: boolean;
  /** Triggers loading animation */
  loading?: boolean;
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** The value of the switch, passed on form submit */
  value?: string;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
  /** A callback to retrieve the input reference (deprecated) */
  inputRef?: React.Ref<HTMLInputElement>;
}

let deprecateInputRefWarnTriggered = false;
let deprecateUncontrolledWarnTriggered = false;

export const Switch = React.forwardRef(
  (
    {
      autoFocus,
      id,
      label,
      onChange,
      onBlur,
      onFocus,
      value,
      checked,
      defaultChecked,
      disabled,
      loading,
      reverse = true,
      validationOnLabel = false,
      labelInline = false,
      labelSpacing,
      labelHelp,
      fieldHelpInline,
      size,
      name,
      adaptiveLabelBreakpoint,
      tooltipPosition,
      error,
      warning,
      info,
      "data-component": dataComponent = "switch",
      "data-element": dataElement,
      "data-role": dataRole,
      helpAriaLabel,
      inputRef,
      ...rest
    }: SwitchProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const isControlled = checked !== undefined;
    const { validationRedesignOptIn } = useContext(NewValidationContext);

    const [checkedInternal, setCheckedInternal] = useState(
      defaultChecked || false
    );

    if (!deprecateInputRefWarnTriggered && inputRef) {
      deprecateInputRefWarnTriggered = true;
      Logger.deprecate(
        "The `inputRef` prop in `Switch` component is deprecated and will soon be removed. Please use `ref` instead."
      );
    }

    if (!deprecateUncontrolledWarnTriggered && !onChange) {
      deprecateUncontrolledWarnTriggered = true;
      Logger.deprecate(
        "Uncontrolled behaviour in `Switch` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );
    }

    const onChangeInternal = useCallback(
      (e) => {
        setCheckedInternal(e.target.checked);
        onChange?.(e);
      },
      [setCheckedInternal, onChange]
    );

    const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
    let shouldLabelBeInline: boolean | undefined = labelInline;
    if (adaptiveLabelBreakpoint) {
      shouldLabelBeInline = largeScreen;
    }

    const shouldValidationBeOnLabel =
      labelInline && !reverse ? true : validationOnLabel;

    const marginProps = useFormSpacing(rest);

    const switchStyleProps = {
      "data-component": dataComponent,
      "data-role": dataRole,
      "data-element": dataElement,
      checked: isControlled ? checked : checkedInternal,
      fieldHelpInline,
      labelInline: shouldLabelBeInline,
      labelSpacing,
      reverse: !reverse, // switched to preserve backward compatibility
      size,
      ...marginProps,
    };

    const switchSliderProps = {
      checked: isControlled ? checked : checkedInternal,
      disabled: disabled || loading,
      loading,
      size,
      error,
      warning,
      info,
      useValidationIcon:
        !validationRedesignOptIn && !shouldValidationBeOnLabel && !disabled,
    };

    const inputProps = {
      autoFocus,
      error,
      warning,
      info,
      disabled: disabled || loading,
      loading,
      checked: isControlled ? checked : checkedInternal,
      label,
      labelHelp,
      fieldHelpInline,
      labelInline: shouldLabelBeInline,
      labelSpacing,
      onBlur,
      onFocus,
      onChange: isControlled ? onChange : onChangeInternal,
      id,
      name,
      value,
      type: "checkbox",
      role: "switch",
      reverse: !reverse, // switched to preserve backward compatibility
      validationOnLabel: shouldValidationBeOnLabel && !disabled,
      ref: ref || inputRef,
      ...rest,
    };

    // Created separate const declarations to help when removing the old validation.
    // Not all props utilised by the old validation work or will be needed with the new validation.
    const switchStylePropsForNewValidation = {
      "data-component": dataComponent,
      "data-role": dataRole,
      "data-element": dataElement,
      checked: isControlled ? checked : checkedInternal,
      size,
      ...marginProps,
    };

    const switchSliderPropsForNewValidation = {
      checked: isControlled ? checked : checkedInternal,
      disabled: disabled || loading,
      loading,
      size,
      error,
      warning,
    };

    const inputPropsForNewValidation = {
      autoFocus,
      error,
      warning,
      disabled: disabled || loading,
      loading,
      checked: isControlled ? checked : checkedInternal,
      onBlur,
      onFocus,
      onChange: isControlled ? onChange : onChangeInternal,
      id,
      name,
      value,
      type: "checkbox",
      role: "switch",
      ref: ref || inputRef,
      ...rest,
    };

    const applyValidation = error || warning;

    return (
      <>
        {validationRedesignOptIn ? (
          <StyledSwitch {...switchStylePropsForNewValidation}>
            <Label>
              <Box mb={labelHelp ? 0 : 1}>
                {label}
                {labelHelp && <StyledHintText>{labelHelp}</StyledHintText>}
              </Box>
              <Box position="relative">
                <ValidationMessage error={error} warning={warning} />
                {applyValidation && (
                  <ErrorBorder warning={!!(!error && warning)} />
                )}
                <CheckableInput {...inputPropsForNewValidation}>
                  <SwitchSlider {...switchSliderPropsForNewValidation} />
                </CheckableInput>
              </Box>
            </Label>
          </StyledSwitch>
        ) : (
          <TooltipProvider
            helpAriaLabel={helpAriaLabel}
            tooltipPosition={tooltipPosition}
          >
            <StyledSwitch {...switchStyleProps}>
              <CheckableInput {...inputProps}>
                <SwitchSlider {...switchSliderProps} />
              </CheckableInput>
            </StyledSwitch>
          </TooltipProvider>
        )}
      </>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
