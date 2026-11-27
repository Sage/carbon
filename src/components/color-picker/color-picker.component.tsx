import React, { useMemo } from "react";
import { MarginProps } from "styled-system";

import { filterStyledSystemMarginProps } from "../../style/utils";
import useLocale from "../../hooks/__internal__/useLocale";
import SimpleSelect from "../select/simple-select";
import type { SimpleSelectProps } from "../select/simple-select";
import Option from "../select/option";
import StyledSwatch from "./color-picker.style";
import {
  COLOR_PICKER_COLORS,
  ColorPickerColor,
  ColorPickerPalette,
} from "./color-picker.config";

export interface ColorPickerChangeEvent {
  target: {
    id?: string;
    name?: string;
    value: ColorPickerColor | "";
  };
}

export interface ColorPickerProps
  extends MarginProps,
    Pick<
      SimpleSelectProps,
      | "aria-describedby"
      | "aria-label"
      | "aria-labelledby"
      | "autoFocus"
      | "data-element"
      | "data-role"
      | "disabled"
      | "error"
      | "flipEnabled"
      | "id"
      | "inputHint"
      | "inputWidth"
      | "label"
      | "labelInline"
      | "maxWidth"
      | "name"
      | "onBlur"
      | "onFocus"
      | "onOpen"
      | "openOnFocus"
      | "readOnly"
      | "required"
      | "size"
      | "validationMessagePositionTop"
      | "warning"
    > {
  /** The colour palette to offer. Muted and rich colours cannot be combined in one picker. */
  palette?: ColorPickerPalette;
  /** Restricts the colours offered to this subset. All colours are offered when omitted. */
  colors?: ColorPickerColor[];
  /** The selected colour, or an empty string when no colour is selected */
  value: ColorPickerColor | "";
  /** Callback triggered when a colour is selected */
  onChange: (ev: ColorPickerChangeEvent) => void;
}

export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      autoFocus,
      "data-element": dataElement,
      "data-role": dataRole,
      disabled,
      error,
      flipEnabled,
      id,
      inputHint,
      inputWidth,
      label,
      labelInline,
      maxWidth,
      name,
      onBlur,
      onFocus,
      onOpen,
      openOnFocus,
      readOnly,
      required,
      size = "medium",
      validationMessagePositionTop,
      warning,
      palette = "rich",
      colors,
      value,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const l = useLocale();

    const availableColors = useMemo(
      () =>
        colors
          ? COLOR_PICKER_COLORS.filter((color) => colors.includes(color))
          : COLOR_PICKER_COLORS,
      [colors],
    );

    const renderSwatch = (color: ColorPickerColor) => (
      <StyledSwatch
        aria-hidden
        data-element="color-picker-swatch"
        data-role="color-picker-swatch"
        data-color={color}
        $color={color}
        $palette={palette}
        $size={size}
      />
    );

    return (
      <SimpleSelect
        ref={ref}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        autoFocus={autoFocus}
        data-element={dataElement}
        data-role={dataRole}
        disabled={disabled}
        error={error}
        flipEnabled={flipEnabled}
        id={id}
        inputHint={inputHint}
        inputWidth={inputWidth}
        label={label}
        labelInline={labelInline}
        maxWidth={maxWidth}
        name={name}
        onBlur={onBlur}
        onFocus={onFocus}
        onOpen={onOpen}
        openOnFocus={openOnFocus}
        readOnly={readOnly}
        required={required}
        size={size}
        validationMessagePositionTop={validationMessagePositionTop}
        warning={warning}
        value={value}
        selectedLeading={value ? renderSwatch(value) : undefined}
        onChange={(ev) =>
          onChange({
            target: {
              id: ev.target.id || undefined,
              name: ev.target.name || undefined,
              value: ev.target.value as ColorPickerColor | "",
            },
          })
        }
        {...filterStyledSystemMarginProps(rest)}
      >
        {availableColors.map((color) => (
          <Option
            key={color}
            value={color}
            text={l.colorPicker.colors[color]()}
            leading={renderSwatch(color)}
          />
        ))}
      </SimpleSelect>
    );
  },
);

ColorPicker.displayName = "ColorPicker";

export default ColorPicker;
