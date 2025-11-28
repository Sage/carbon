import React, { useRef } from "react";
import { MarginProps } from "styled-system";

import Box from "../../box";
import CheckableInput, {
  CommonCheckableInputProps,
} from "../../../__internal__/checkable-input";
import { TagProps } from "../../../__internal__/utils/helpers/tags";
import Label from "../../../__internal__/label";
import useIsAboveBreakpoint from "../../../hooks/__internal__/useIsAboveBreakpoint";
import { StyledSwitch, StyledOptionLabel } from "./switch.style";
import SwitchSlider from "./__internal__/switch-slider.component";
import guid from "../../../__internal__/utils/helpers/guid";
import HintText from "../../../__internal__/hint-text";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import useLocale from "../../../hooks/__internal__/useLocale";

export interface SwitchProps
  extends Omit<CommonCheckableInputProps, "defaultChecked">,
    MarginProps,
    TagProps {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** When true label is inline */
  labelInline?: boolean;
  /** Triggers loading animation */
  loading?: boolean;
  /** The value of the switch, passed on form submit */
  value?: string;
  /** Label width, as a percentage, when labelInline is true */
  labelWidth?: number;
  /** OnChange event handler */
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Checked state of the input */
  checked: boolean;
  /** The hint below the label */
  labelHint?: React.ReactNode;
}

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
      required,
      labelInline = false,
      labelSpacing,
      labelHint,
      labelWidth,
      size = "small",
      name,
      adaptiveLabelBreakpoint,
      "data-element": dataElement,
      "data-role": dataRole,
      ...rest
    }: SwitchProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const labelId = useRef(`${guid()}-label`);
    const inputHintId = useRef(`${guid()}-hint`);

    const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
    let shouldLabelBeInline: boolean | undefined = labelInline;
    // Coverage has been ignored here as this functionality is covered in a Playwright test.
    /* istanbul ignore next */
    if (adaptiveLabelBreakpoint) {
      shouldLabelBeInline = largeScreen;
    }

    const marginProps = filterStyledSystemMarginProps(rest);

    // Created separate const declarations to help when removing the old validation.
    // Not all props utilised by the old validation work or will be needed with the new validation.
    const switchStylePropsForNewValidation = {
      "data-component": "switch",
      "data-role": dataRole,
      "data-element": dataElement,
      checked,
      labelInline: shouldLabelBeInline,
      size,
      ...marginProps,
    };

    const switchSliderPropsForNewValidation = {
      checked,
      disabled,
      loading,
      size,
    };

    const inputPropsForNewValidation = {
      autoFocus,
      disabled,
      loading,
      checked,
      onBlur,
      onFocus,
      onChange,
      id,
      name,
      value,
      type: "checkbox",
      role: "switch",
      ref,
      ...rest,
    };

    const ariaDescribedBy = [labelHint && inputHintId.current]
      .filter(Boolean)
      .join(" ");

    const direction = labelInline ? "row" : "column";
    const labelWrapperAlignSelf = labelInline ? "center" : "";

    const locale = useLocale();
    const onText = locale.switch.on();
    const offText = locale.switch.off();

    const optionLabelText = checked ? onText : offText;
    return (
      <>
        <StyledSwitch {...switchStylePropsForNewValidation}>
          <Box
            data-role="field-reverse-wrapper"
            display="flex"
            flexDirection={direction}
            width={labelInline ? "100%" : "auto"}
          >
            <Box
              data-role="label-wrapper"
              alignSelf={labelWrapperAlignSelf}
              {...(labelWidth && { width: `${labelWidth}%` })}
            >
              <Label
                labelId={labelId.current}
                disabled={disabled}
                isRequired={required}
              >
                {label}
              </Label>

              {labelHint && (
                <Box data-role="hint-text-wrapper" mb={labelInline ? 0 : 1}>
                  <HintText
                    data-role="hint-text"
                    fontWeight="400"
                    id={inputHintId.current}
                    marginTop="8px"
                  >
                    {labelHint}
                  </HintText>
                </Box>
              )}
            </Box>

            <Box
              ml={0}
              mr={0}
              position="relative"
              id="input-wrapper"
              data-role="input-wrapper"
              display="flex"
              flexDirection="row"
              maxWidth="fit-content"
            >
              <CheckableInput
                ariaLabelledBy={`${label && labelId.current}`}
                ariaDescribedBy={ariaDescribedBy}
                {...inputPropsForNewValidation}
              >
                <SwitchSlider {...switchSliderPropsForNewValidation} />
              </CheckableInput>
              <StyledOptionLabel>{optionLabelText}</StyledOptionLabel>
            </Box>
          </Box>
        </StyledSwitch>
      </>
    );
  },
);

Switch.displayName = "Switch";

export default Switch;
