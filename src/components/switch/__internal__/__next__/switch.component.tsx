import React, { useRef } from "react";
import { MarginProps } from "styled-system";

import { TagProps } from "../../../../__internal__/utils/helpers/tags/tags";
import guid from "../../../../__internal__/utils/helpers/guid";
import { filterStyledSystemMarginProps } from "../../../../style/utils";
import useLocale from "../../../../hooks/__internal__/useLocale";
import useIsAboveBreakpoint from "../../../../hooks/__internal__/useIsAboveBreakpoint";
import { Loader } from "../../../loader/__next__/loader.component";
import {
  StyledNextSwitch,
  StyledNextSwitchLabel,
  StyledNextSwitchRow,
  StyledNextSwitchTrack,
  StyledNextSwitchThumb,
  StyledNextSwitchStateText,
  StyledNextSwitchProcessingRow,
  StyledNextSwitchProcessingText,
  StyledNextSwitchInput,
  StyledNextSwitchLoaderWrapper,
} from "./switch.style";
import HintText from "../../../../__internal__/hint-text";

export interface SwitchProps extends MarginProps, TagProps {
  /** Checked state of the switch */
  checked: boolean;
  /** OnChange event handler */
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** OnBlur event handler */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** OnFocus event handler */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** If true, the input will auto-focus on mount */
  autoFocus?: boolean;
  /** The id attribute of the hidden input */
  id?: string;
  /** The name attribute of the hidden input */
  name?: string;
  /** The value attribute of the hidden input, passed on form submit */
  value?: string;
  /** Accessible text label rendered above the switch */
  label?: React.ReactNode;
  /** Disables the switch */
  disabled?: boolean;
  /** Triggers the loading state — hides On/Off text and shows a spinner */
  loading?: boolean;
  /** Text shown beside the spinner during loading. Defaults to "Processing..." */
  processingLabel?: string;
  /** When true, the processing label is rendered below the switch rather than to its right */
  processingLabelBelowSwitch?: boolean;
  /** Size of the switch track */
  size?: "small" | "large";
  /** When true, the label is displayed inline (beside the switch) rather than above it */
  labelInline?: boolean;
  /** Spacing between the label and switch when labelInline is true (multiplier of base spacing unit) */
  labelSpacing?: 1 | 2;
  /** Label width as a percentage when labelInline is true */
  labelWidth?: number;
  /** Breakpoint (px) at which labelInline activates. Enables adaptive inline-label behaviour. */
  adaptiveLabelBreakpoint?: number;
  /** Hint text displayed below the switch */
  inputHint?: string;
  /** Whether the input is required */
  required?: boolean;
}

const NextSwitchComponent = React.forwardRef(
  (
    {
      checked,
      onChange,
      onBlur,
      onFocus,
      autoFocus,
      id,
      name,
      value,
      label,
      disabled,
      loading,
      processingLabel,
      processingLabelBelowSwitch = false,
      size = "small",
      labelInline = false,
      labelSpacing,
      labelWidth,
      adaptiveLabelBreakpoint,
      "data-element": dataElement,
      "data-role": dataRole,
      inputHint,
      required,
      ...rest
    }: SwitchProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const locale = useLocale();
    const onText = locale.switch.on();
    const offText = locale.switch.off();
    const effectiveProcessingLabel =
      processingLabel ?? locale.switch.processingLabel();

    const internalId = useRef(guid());
    const inputId = id || internalId.current;

    const labelId = useRef(`${guid()}-label`);
    const inputHintId = useRef(`${guid()}-hint`);

    const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
    /* istanbul ignore next */
    const shouldLabelBeInline = adaptiveLabelBreakpoint
      ? largeScreen
      : labelInline;

    const marginProps = filterStyledSystemMarginProps(rest);

    return (
      <StyledNextSwitch
        data-component="switch"
        data-element={dataElement}
        data-role={dataRole}
        $labelInline={shouldLabelBeInline}
        {...marginProps}
      >
        {label && (
          <StyledNextSwitchLabel
            htmlFor={inputId}
            $disabled={disabled}
            $inputHint={!!inputHint}
            $labelInline={shouldLabelBeInline}
            $labelSpacing={shouldLabelBeInline ? labelSpacing : undefined}
            $labelWidth={shouldLabelBeInline ? labelWidth : undefined}
            $required={required}
            id={labelId.current}
          >
            {label}
          </StyledNextSwitchLabel>
        )}

        {inputHint && (
          <HintText
            data-element="input-hint"
            id={inputHintId.current}
            isComponentInline={labelInline}
            marginTop="2px"
          >
            {inputHint}
          </HintText>
        )}

        <StyledNextSwitchRow $size={size}>
          <StyledNextSwitchTrack
            data-role="switch-track"
            $checked={checked}
            $disabled={disabled}
            $size={size}
            $loading={loading}
          >
            <StyledNextSwitchInput
              ref={ref}
              type="checkbox"
              role="switch"
              id={inputId}
              name={name}
              value={value}
              checked={checked}
              disabled={disabled || loading}
              autoFocus={autoFocus}
              aria-checked={checked}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              aria-describedby={inputHint ? inputHintId.current : undefined}
              required={required}
            />
            {loading ? (
              <StyledNextSwitchLoaderWrapper
                data-role="switch-loader-wrapper"
                $checked={checked}
                $size={size}
              >
                <Loader
                  data-role="switch-loader"
                  loaderType="ring"
                  size={size === "large" ? "small" : "extra-small"}
                  showLabel={false}
                  inverse={checked}
                />
              </StyledNextSwitchLoaderWrapper>
            ) : (
              <StyledNextSwitchThumb
                data-role="switch-thumb"
                $checked={checked}
                $disabled={disabled}
                $size={size}
              />
            )}
          </StyledNextSwitchTrack>

          {loading ? (
            <StyledNextSwitchProcessingRow
              $below={processingLabelBelowSwitch}
              data-role="switch-processing-row"
            >
              <StyledNextSwitchProcessingText>
                {effectiveProcessingLabel}
              </StyledNextSwitchProcessingText>
            </StyledNextSwitchProcessingRow>
          ) : (
            <StyledNextSwitchStateText aria-hidden $disabled={disabled}>
              {checked ? onText : offText}
            </StyledNextSwitchStateText>
          )}
        </StyledNextSwitchRow>
      </StyledNextSwitch>
    );
  },
);

NextSwitchComponent.displayName = "Switch";

export { NextSwitchComponent as Switch };
export default NextSwitchComponent;
