import React from "react";
import { MarginProps } from "styled-system";

import { CommonCheckableInputProps } from "../../__internal__/checkable-input";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import Logger from "../../__internal__/utils/logger";
import { Switch as NextSwitch } from "./__internal__/__next__/switch.component";

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
  /** [Legacy] When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** The value of the switch, passed on form submit */
  value?: string;
  /** [Legacy] Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** [Legacy] Aria label for rendered help component */
  helpAriaLabel?: string;
  /** @deprecated Whether this component resides on a dark background */
  isDarkBackground?: boolean;
  /** Render the ValidationMessage above the Switch input when validationRedesignOptIn flag is set */
  validationMessagePositionTop?: boolean;
  /** Label width, as a percentage, when labelInline is true */
  labelWidth?: number;
  /** OnChange event handler */
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Checked state of the input */
  checked: boolean;
}

let switchLegacyWarned = false;
let deprecateIsDarkBackgroundWarned = false;
let deprecateReverseWarned = false;
let deprecateLabelHelpWarned = false;
let deprecateFieldHelpWarned = false;
let deprecateErrorWarned = false;
let deprecateWarningWarned = false;
let deprecateInfoWarned = false;

const SwitchComponent = React.forwardRef(
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
      labelInline = false,
      labelSpacing,
      labelWidth,
      size = "small",
      name,
      adaptiveLabelBreakpoint,
      "data-element": dataElement,
      "data-role": dataRole,
      // Deprecated props — destructured to prevent them from being spread
      reverse,
      validationOnLabel: _validationOnLabel,
      labelHelp,
      fieldHelpInline: _fieldHelpInline,
      tooltipPosition: _tooltipPosition,
      helpAriaLabel: _helpAriaLabel,
      isDarkBackground,
      validationMessagePositionTop: _validationMessagePositionTop,
      error,
      warning,
      info,
      fieldHelp,
      ...rest
    }: SwitchProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    if (!switchLegacyWarned) {
      Logger.warn(
        "Warning: This version of the `Switch` component is intended to help migration to the `next` version and will be removed in a future release.",
      );
      switchLegacyWarned = true;
    }

    if (isDarkBackground !== undefined && !deprecateIsDarkBackgroundWarned) {
      Logger.deprecate(
        "The `isDarkBackground` prop in `Switch` is deprecated and will soon be removed.",
      );
      deprecateIsDarkBackgroundWarned = true;
    }

    if (reverse !== undefined && !deprecateReverseWarned) {
      Logger.deprecate(
        "The `reverse` prop in `Switch` is deprecated and will soon be removed.",
      );
      deprecateReverseWarned = true;
    }

    if (labelHelp && !deprecateLabelHelpWarned) {
      Logger.deprecate(
        "The `labelHelp` prop in `Switch` is deprecated and will soon be removed.",
      );
      deprecateLabelHelpWarned = true;
    }

    if (fieldHelp && !deprecateFieldHelpWarned) {
      Logger.deprecate(
        "The `fieldHelp` prop in `Switch` is deprecated and will soon be removed.",
      );
      deprecateFieldHelpWarned = true;
    }

    if (error && !deprecateErrorWarned) {
      Logger.deprecate(
        "The `error` prop in `Switch` is deprecated and will soon be removed.",
      );
      deprecateErrorWarned = true;
    }

    if (warning && !deprecateWarningWarned) {
      Logger.deprecate(
        "The `warning` prop in `Switch` is deprecated and will soon be removed.",
      );
      deprecateWarningWarned = true;
    }

    if (info && !deprecateInfoWarned) {
      Logger.deprecate(
        "The `info` prop in `Switch` is deprecated and will soon be removed.",
      );
      deprecateInfoWarned = true;
    }

    return (
      <NextSwitch
        ref={ref}
        autoFocus={autoFocus}
        id={id}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        checked={checked}
        disabled={disabled}
        loading={loading}
        labelInline={labelInline}
        labelSpacing={labelSpacing}
        labelWidth={labelWidth}
        size={size}
        name={name}
        adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
        data-element={dataElement}
        data-role={dataRole}
        {...rest}
      />
    );
  },
);

SwitchComponent.displayName = "Switch";

export { SwitchComponent as Switch };
export default SwitchComponent;
