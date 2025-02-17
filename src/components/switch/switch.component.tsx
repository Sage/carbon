import React, { useState, useCallback, useContext, useRef } from "react";
import { MarginProps } from "styled-system";

import Box from "../box";
import CheckableInput, {
  CommonCheckableInputProps,
} from "../../__internal__/checkable-input";
import Label from "../../__internal__/label";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import NewValidationContext from "../carbon-provider/__internal__/new-validation.context";
import Logger from "../../__internal__/utils/logger";
import ValidationMessage from "../../__internal__/validation-message/validation-message.component";
import useFormSpacing from "../../hooks/__internal__/useFormSpacing";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import StyledSwitch, { ErrorBorder } from "./switch.style";
import SwitchSlider from "./__internal__/switch-slider.component";
import guid from "../../__internal__/utils/helpers/guid";
import HintText from "../../__internal__/hint-text";

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
  /** [Legacy] When true label is inline */
  labelInline?: boolean;
  /** Triggers loading animation */
  loading?: boolean;
  /** [Legacy] When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** The value of the switch, passed on form submit */
  value?: string;
  /** [Legacy] Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** [Legacy] Aria label for rendered help component */
  helpAriaLabel?: string;
  /** Whether this component resides on a dark background */
  isDarkBackground?: boolean;
}

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
      required,
      isOptional,
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
      isDarkBackground = false,
      ...rest
    }: SwitchProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const isControlled = checked !== undefined;
    const { validationRedesignOptIn } = useContext(NewValidationContext);

    const labelId = useRef(`${guid()}-label`);
    const inputHintId = useRef(`${guid()}-hint`);
    const validationMessageId = useRef(`${guid()}-message`);

    const [checkedInternal, setCheckedInternal] = useState(
      defaultChecked || false,
    );

    if (!deprecateUncontrolledWarnTriggered && !onChange) {
      deprecateUncontrolledWarnTriggered = true;
      Logger.deprecate(
        "Uncontrolled behaviour in `Switch` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
      );
    }

    const onChangeInternal = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedInternal(e.target.checked);
        onChange?.(e);
      },
      [setCheckedInternal, onChange],
    );

    const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
    let shouldLabelBeInline: boolean | undefined = labelInline;
    // Coverage has been ignored here as this functionality is covered in a Playwright test.
    /* istanbul ignore next */
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
      isDarkBackground,
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
      isDarkBackground,
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
      isDarkBackground,
      onFocus,
      onChange: isControlled ? onChange : onChangeInternal,
      id,
      name,
      value,
      type: "checkbox",
      role: "switch",
      reverse: !reverse, // switched to preserve backward compatibility
      validationOnLabel: shouldValidationBeOnLabel && !disabled,
      ref,
      required,
      isOptional,
      ...rest,
    };

    // Created separate const declarations to help when removing the old validation.
    // Not all props utilised by the old validation work or will be needed with the new validation.
    const switchStylePropsForNewValidation = {
      "data-component": dataComponent,
      "data-role": dataRole,
      "data-element": dataElement,
      checked: isControlled ? checked : checkedInternal,
      labelInline: shouldLabelBeInline,
      isDarkBackground,
      size,
      ...marginProps,
    };

    const switchSliderPropsForNewValidation = {
      checked: isControlled ? checked : checkedInternal,
      disabled: disabled || loading,
      loading,
      isDarkBackground,
      size,
      error,
      warning,
    };

    const inputPropsForNewValidation = {
      autoFocus,
      // set aria-invalid but prevent validationIconId from being added to aria-describedby
      error: !!error,
      warning,
      disabled: disabled || loading,
      loading,
      checked: isControlled ? checked : checkedInternal,
      onBlur,
      isDarkBackground,
      onFocus,
      onChange: isControlled ? onChange : onChangeInternal,
      id,
      name,
      value,
      type: "checkbox",
      role: "switch",
      ref,
      required,
      isOptional,
      ...rest,
    };

    const applyValidation = error || warning;

    const ariaDescribedBy = [
      labelHelp && inputHintId.current,
      applyValidation && validationMessageId.current,
    ]
      .filter(Boolean)
      .join(" ");

    if (!validationRedesignOptIn) {
      return (
        <>
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
        </>
      );
    }

    const defaultMargin = labelInline ? 1 : 0;
    const defaultInputWrapperMargin = labelInline ? 3 : 0;
    const errorMargin =
      error || warning ? defaultInputWrapperMargin : defaultMargin;
    const direction = labelInline ? "row" : "column";
    const reverseDirection = labelInline ? "row-reverse" : "column";
    const labelWrapperAlignSelf =
      labelInline && !error && !warning && !info ? "center" : "";
    return (
      <>
        <StyledSwitch {...switchStylePropsForNewValidation}>
          <Box
            data-role="field-reverse-wrapper"
            display="flex"
            flexWrap="wrap"
            alignItems={error || warning ? "flex-start" : undefined}
            flexDirection={!reverse ? reverseDirection : direction}
            width={labelInline ? "100%" : "auto"}
          >
            <Box data-role="label-wrapper" alignSelf={labelWrapperAlignSelf}>
              <Label
                isDarkBackground={isDarkBackground}
                labelId={labelId.current}
                disabled={disabled}
                isRequired={required}
                optional={isOptional}
              >
                {label}
              </Label>

              {labelHelp && (
                <Box
                  data-role="hint-text-wrapper"
                  mb={labelInline ? 0 : 1}
                  mr={reverse ? 0 : 1}
                  ml={reverse ? 0 : 1}
                >
                  <HintText
                    data-role="hint-text"
                    fontWeight="400"
                    id={inputHintId.current}
                    isDarkBackground={isDarkBackground}
                    marginTop="8px"
                    maxWidth="160px"
                  >
                    {labelHelp}
                  </HintText>
                </Box>
              )}
            </Box>

            <Box
              ml={reverse ? errorMargin : 0}
              mr={!reverse ? errorMargin : 0}
              position="relative"
              id="input-wrapper"
              data-role="input-wrapper"
            >
              <ValidationMessage
                error={error}
                warning={warning}
                validationId={validationMessageId.current}
                isDarkBackground={isDarkBackground}
              />
              {applyValidation && (
                <ErrorBorder
                  data-role="error-border"
                  warning={!!(!error && warning)}
                  reverse={!reverse}
                  isDarkBackground={isDarkBackground}
                />
              )}
              <CheckableInput
                ariaLabelledBy={`${label && labelId.current}`}
                ariaDescribedBy={ariaDescribedBy}
                {...inputPropsForNewValidation}
                fieldHelp={labelInline ? undefined : rest.fieldHelp}
              >
                <SwitchSlider {...switchSliderPropsForNewValidation} />
              </CheckableInput>
            </Box>
          </Box>
        </StyledSwitch>

        {labelInline && rest.fieldHelp && (
          <Box
            color={
              isDarkBackground
                ? "var(--colorsUtilityYang100)"
                : "var(--colorsUtilityYin090)"
            }
          >
            {rest.fieldHelp}
          </Box>
        )}
      </>
    );
  },
);

Switch.displayName = "Switch";

export default Switch;
