import React, { useContext, useRef } from "react";
import { MarginProps } from "styled-system";

import Box from "../box";
import CheckableInput, {
  CommonCheckableInputProps,
} from "../../__internal__/checkable-input";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import Label from "../../__internal__/label";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import NewValidationContext from "../carbon-provider/__internal__/new-validation.context";
import ValidationMessage from "../../__internal__/validation-message/validation-message.component";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import StyledSwitch, { ErrorBorder } from "./switch.style";
import SwitchSlider from "./__internal__/switch-slider.component";
import guid from "../../__internal__/utils/helpers/guid";
import HintText from "../../__internal__/hint-text";
import { filterStyledSystemMarginProps } from "../../style/utils";
import Logger from "../../__internal__/utils/logger";

export interface SwitchProps
  extends Omit<
      CommonCheckableInputProps,
      "defaultChecked" | "fieldHelp" | "labelHelp" | "reverse" | "labelInline"
    >,
    MarginProps,
    TagProps {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** @deprecated When true label is inline */
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
  /** Render the ValidationMessage above the Switch input when validationRedesignOptIn flag is set */
  validationMessagePositionTop?: boolean;
  /** Label width, as a percentage, when labelInline is true */
  labelWidth?: number;
  /** OnChange event handler */
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Checked state of the input */
  checked: boolean;
  /** @deprecated Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /** @deprecated The content for the help tooltip, to appear next to the Label */
  labelHelp?: React.ReactNode;
  /** @deprecated If true the label switches position with the input */
  reverse?: boolean;
}

let deprecateLabelInlineWarningTriggered = false;
let deprecateReverseWarningTriggered = false;
let deprecateFieldHelpWarningTriggered = false;
let deprecateLabelHelpWarningTriggered = false;

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
      disabled,
      loading,
      reverse = true,
      required,
      validationOnLabel = false,
      labelInline = false,
      labelSpacing,
      labelHelp,
      labelWidth,
      fieldHelpInline,
      size = "small",
      name,
      adaptiveLabelBreakpoint,
      tooltipPosition,
      error,
      warning,
      info,
      "data-element": dataElement,
      "data-role": dataRole,
      helpAriaLabel,
      isDarkBackground = false,
      validationMessagePositionTop = true,
      ...rest
    }: SwitchProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const { validationRedesignOptIn } = useContext(NewValidationContext);

    if (!deprecateLabelInlineWarningTriggered && !!labelInline) {
      Logger.deprecate(
        `The 'labelInline' prop of the Switch component is deprecated and will soon be removed.`,
      );
      deprecateLabelInlineWarningTriggered = true;
    }

    if (!deprecateReverseWarningTriggered && reverse !== undefined) {
      Logger.deprecate(
        `The 'reverse' prop of the Switch component is deprecated and will soon be removed.`,
      );
      deprecateReverseWarningTriggered = true;
    }

    if (!deprecateFieldHelpWarningTriggered && rest.fieldHelp) {
      Logger.deprecate(
        `The 'fieldHelp' prop of the Switch component is deprecated and will soon be removed.`,
      );
      deprecateFieldHelpWarningTriggered = true;
    }

    if (!deprecateLabelHelpWarningTriggered && labelHelp !== undefined) {
      Logger.deprecate(
        `The 'labelHelp' prop of the Switch component is deprecated and will soon be removed.`,
      );
      deprecateLabelHelpWarningTriggered = true;
    }

    const labelId = useRef(`${guid()}-label`);
    const inputHintId = useRef(`${guid()}-hint`);
    const validationMessageId = useRef(`${guid()}-message`);

    const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
    let shouldLabelBeInline: boolean | undefined = labelInline;
    // Coverage has been ignored here as this functionality is covered in a Playwright test.
    /* istanbul ignore next */
    if (adaptiveLabelBreakpoint) {
      shouldLabelBeInline = largeScreen;
    }

    const shouldValidationBeOnLabel =
      labelInline && !reverse ? true : validationOnLabel;

    const marginProps = filterStyledSystemMarginProps(rest);

    const switchStyleProps = {
      "data-component": "switch",
      "data-role": dataRole,
      "data-element": dataElement,
      checked,
      isDarkBackground,
      fieldHelpInline,
      labelInline: shouldLabelBeInline,
      labelSpacing,
      reverse: !reverse, // switched to preserve backward compatibility
      size,
      ...marginProps,
    };

    const switchSliderProps = {
      checked,
      disabled,
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
      disabled,
      loading,
      checked,
      label,
      labelHelp,
      labelWidth,
      fieldHelpInline,
      labelInline: shouldLabelBeInline,
      labelSpacing,
      onBlur,
      isDarkBackground,
      onFocus,
      onChange,
      id,
      name,
      value,
      type: "checkbox",
      role: "switch",
      reverse: !reverse, // switched to preserve backward compatibility
      validationOnLabel: shouldValidationBeOnLabel && !disabled,
      ref,
      required,
      ...rest,
      "data-component": undefined,
    };

    // Created separate const declarations to help when removing the old validation.
    // Not all props utilised by the old validation work or will be needed with the new validation.
    const switchStylePropsForNewValidation = {
      "data-component": "switch",
      "data-role": dataRole,
      "data-element": dataElement,
      checked,
      labelInline: shouldLabelBeInline,
      isDarkBackground,
      size,
      reverse: !reverse,
      validationRedesignOptIn,
      ...marginProps,
    };

    const switchSliderPropsForNewValidation = {
      checked,
      disabled,
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
      disabled,
      loading,
      checked,
      onBlur,
      isDarkBackground,
      onFocus,
      onChange,
      id,
      name,
      value,
      type: "checkbox",
      role: "switch",
      ref,
      required,
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
            alignItems={error || warning ? "flex-start" : undefined}
            flexDirection={!reverse ? reverseDirection : direction}
            width={labelInline ? "100%" : "auto"}
          >
            <Box
              data-role="label-wrapper"
              alignSelf={labelWrapperAlignSelf}
              {...(labelWidth && { width: `${labelWidth}%` })}
            >
              <Label
                isDarkBackground={isDarkBackground}
                labelId={labelId.current}
                disabled={disabled}
                isRequired={required}
              >
                {label}
              </Label>

              {labelHelp && (
                <Box data-role="hint-text-wrapper" mb={labelInline ? 0 : 1}>
                  <HintText
                    data-role="hint-text"
                    fontWeight="400"
                    id={inputHintId.current}
                    isDarkBackground={isDarkBackground}
                    marginTop="8px"
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
              {validationMessagePositionTop && (
                <>
                  <ValidationMessage
                    error={error}
                    warning={warning}
                    validationId={validationMessageId.current}
                    isDarkBackground={isDarkBackground}
                    validationMessagePositionTop={validationMessagePositionTop}
                    data-role="validation-message-top"
                  />
                  {applyValidation && (
                    <ErrorBorder
                      data-role="error-border"
                      warning={!!(!error && warning)}
                      reverse={!reverse}
                      isDarkBackground={isDarkBackground}
                    />
                  )}
                </>
              )}
              <CheckableInput
                ariaLabelledBy={`${label && labelId.current}`}
                ariaDescribedBy={ariaDescribedBy}
                {...inputPropsForNewValidation}
                fieldHelp={labelInline ? undefined : rest.fieldHelp}
              >
                <SwitchSlider {...switchSliderPropsForNewValidation} />
              </CheckableInput>
              {!validationMessagePositionTop && (
                <>
                  <ValidationMessage
                    error={error}
                    warning={warning}
                    validationId={validationMessageId.current}
                    isDarkBackground={isDarkBackground}
                    validationMessagePositionTop={validationMessagePositionTop}
                    data-role="validation-message-bottom"
                  />
                  {applyValidation && (
                    <ErrorBorder
                      data-role="error-border"
                      warning={!!(!error && warning)}
                      reverse={!reverse}
                      isDarkBackground={isDarkBackground}
                    />
                  )}
                </>
              )}
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
