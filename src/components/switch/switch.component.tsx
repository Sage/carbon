import React, { useRef } from "react";
import { MarginProps } from "styled-system";

import { TagProps } from "../../__internal__/utils/helpers/tags/tags";
import guid from "../../__internal__/utils/helpers/guid";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useLocale from "../../hooks/__internal__/useLocale";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Loader } from "../loader/__next__/loader.component";
import {
  StyledSwitch,
  StyledSwitchLabel,
  StyledSwitchRow,
  StyledSwitchTrack,
  StyledSwitchThumb,
  StyledSwitchStateText,
  StyledSwitchProcessingRow,
  StyledSwitchProcessingText,
  StyledSwitchInput,
  StyledSwitchLoaderWrapper,
  StyledSwitchLabelWrapper,
} from "./switch.style";
import HintText from "../../__internal__/hint-text";

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
  /** Hint text displayed below the switch */
  inputHint?: React.ReactNode;
  /** Whether the input is required */
  required?: boolean;
  /**
   * @deprecated Use `inputHint` instead.
   */
  labelHelp?: React.ReactNode;
  /**
   * @deprecated Use `inputHint` instead.
   */
  fieldHelp?: React.ReactNode;
  /**
   * @deprecated This prop is no longer supported.
   */
  isDarkBackground?: boolean;
  /**
   * @deprecated This prop is no longer supported.
   */
  reverse?: boolean;
  /**
   * @deprecated This prop is no longer supported.
   */
  error?: boolean | string;
  /**
   * @deprecated This prop is no longer supported.
   */
  warning?: boolean | string;
  /**
   * @deprecated This prop is no longer supported.
   */
  info?: boolean | string;
  /**
   * @deprecated This prop is no longer supported.
   */
  validationOnLabel?: boolean;
  /**
   * @deprecated This prop is no longer supported.
   */
  fieldHelpInline?: boolean;
  /**
   * @deprecated This prop is no longer supported.
   */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /**
   * @deprecated This prop is no longer supported.
   */
  helpAriaLabel?: string;
  /**
   * @deprecated This prop is no longer supported.
   */
  validationMessagePositionTop?: boolean;
}

export const SwitchComponent = React.forwardRef<HTMLInputElement, SwitchProps>(
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
      "data-element": dataElement,
      "data-role": dataRole,
      inputHint,
      required,
      // Deprecated props — destructured to prevent them from being spread
      labelHelp,
      fieldHelp,
      isDarkBackground,
      reverse: _reverse,
      error: _error,
      warning: _warning,
      info: _info,
      validationOnLabel: _validationOnLabel,
      fieldHelpInline: _fieldHelpInline,
      tooltipPosition: _tooltipPosition,
      helpAriaLabel: _helpAriaLabel,
      validationMessagePositionTop: _validationMessagePositionTop,
      ...rest
    }: SwitchProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const prefersReducedMotion = useMediaQuery(
      "(prefers-reduced-motion: reduce)",
    );

    const locale = useLocale();
    const onText = locale.switch.on();
    const offText = locale.switch.off();
    const effectiveProcessingLabel =
      processingLabel ?? locale.switch.processingLabel();

    const internalId = useRef(guid());
    const inputId = id || internalId.current;

    const labelId = useRef(`${guid()}-label`);
    const inputHintId = useRef(`${guid()}-hint`);

    const effectiveInputHint = inputHint ?? labelHelp;

    const marginProps = filterStyledSystemMarginProps(rest);

    return (
      <StyledSwitch
        data-component="switch"
        data-element={dataElement}
        data-role={dataRole}
        $labelInline={labelInline}
        {...marginProps}
      >
        {(label || effectiveInputHint) && (
          <StyledSwitchLabelWrapper
            data-role="switch-label-wrapper"
            $labelInline={labelInline}
            $labelWidth={labelInline ? labelWidth : undefined}
          >
            {label && (
              <StyledSwitchLabel
                htmlFor={inputId}
                $disabled={disabled}
                $inputHint={!!effectiveInputHint}
                $labelInline={labelInline}
                $labelSpacing={labelInline ? labelSpacing : undefined}
                $required={required}
                $size={size}
                id={labelId.current}
              >
                {label}
              </StyledSwitchLabel>
            )}

            {effectiveInputHint && (
              <HintText
                data-element="input-hint"
                id={inputHintId.current}
                isLarge={size === "large"}
                marginTop="2px"
              >
                {effectiveInputHint}
              </HintText>
            )}
          </StyledSwitchLabelWrapper>
        )}

        <StyledSwitchRow
          $size={size}
          $processingLabelBelowSwitch={loading && processingLabelBelowSwitch}
        >
          <StyledSwitchTrack
            data-role="switch-track"
            $checked={checked}
            $disabled={disabled}
            $size={size}
            $loading={loading}
            $disableTransitions={!!prefersReducedMotion}
          >
            <StyledSwitchInput
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
              aria-describedby={
                effectiveInputHint ? inputHintId.current : undefined
              }
              required={required}
            />
            {loading ? (
              <StyledSwitchLoaderWrapper
                data-role="switch-loader-wrapper"
                $checked={checked}
                $size={size}
                $disableTransitions={!!prefersReducedMotion}
              >
                <Loader
                  data-role="switch-loader"
                  loaderType="ring"
                  size={size === "large" ? "small" : "extra-small"}
                  showLabel={false}
                  inverse={checked}
                />
              </StyledSwitchLoaderWrapper>
            ) : (
              <StyledSwitchThumb
                data-role="switch-thumb"
                $checked={checked}
                $disabled={disabled}
                $size={size}
                $disableTransitions={!!prefersReducedMotion}
              />
            )}
          </StyledSwitchTrack>

          {loading ? (
            <StyledSwitchProcessingRow
              $below={processingLabelBelowSwitch}
              data-role="switch-processing-row"
            >
              <StyledSwitchProcessingText $size={size}>
                {effectiveProcessingLabel}
              </StyledSwitchProcessingText>
            </StyledSwitchProcessingRow>
          ) : (
            <StyledSwitchStateText
              aria-hidden
              $disabled={disabled}
              $size={size}
            >
              {checked ? onText : offText}
            </StyledSwitchStateText>
          )}
        </StyledSwitchRow>
        {fieldHelp && (
          <HintText data-element="field-help" isLarge={size === "large"}>
            {fieldHelp}
          </HintText>
        )}
      </StyledSwitch>
    );
  },
);

SwitchComponent.displayName = "Switch";

export { SwitchComponent as Switch };
export default SwitchComponent;
