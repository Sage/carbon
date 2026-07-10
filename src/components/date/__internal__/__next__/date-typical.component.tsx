import React, { useEffect, useMemo, useRef, useState } from "react";
import tagComponent from "../../../../__internal__/utils/helpers/tags/tags";
import {
  filterOutStyledSystemSpacingProps,
  filterStyledSystemMarginProps,
} from "../../../../style/utils";
import useIsAboveBreakpoint from "../../../../hooks/__internal__/useIsAboveBreakpoint";
import DatePicker from "./__internal__/date-picker";
import DateInputField from "./__internal__/date-input-field/date-input-field.component";
import DateInputValidation from "./__internal__/date-input-field/date-input-validation.component";
import DateInputCalendarTrigger from "./__internal__/date-input-field/date-input-calendar-trigger.component";
import useDateInputAccessibility from "./__internal__/hooks/useDateInputAccessibility";
import useDateInputPickerInteractions from "./__internal__/hooks/useDateInputPickerInteractions";
import {
  buildDateChangeEvent,
  type CustomDateEvent,
  getCurrentMatchedValue,
  getDateInputValue,
  getInitialSelectedDate,
  getSelectedDateFromValue,
} from "./__internal__/utils";
import getFormatData from "../date-formats";
import useLocale from "../../../../hooks/__internal__/useLocale";
import { formattedValue, isDateValid } from "../utils";
import { DateInputLegacyProps as LegacyDateInputProps } from "../../date-legacy.component";
import StyledDateInput from "../../date.style";

interface DateInputTypicalProps extends LegacyDateInputProps {
  /** Legacy label id override retained for source compatibility. */
  labelId?: string;
}

const dateInoutTypicalMinWidth = {
  small: "128px",
  medium: "144px",
  large: "176px",
} as const;

/**
 * Legacy props retained in DateInputLegacyProps for source compatibility.
 * Typical has token-defined layout, inline validation messages, and no legacy
 * label-help or validation-icon tooltips, so these must not reach the DOM.
 */
const TYPICAL_UNSUPPORTED_LEGACY_PROPS = new Set([
  "fieldHelp", // Replaced by inputHint; Typical has no below-field legacy help slot.
  "info", // Typical validation supports error and warning, not legacy info state.
  "helpAriaLabel", // Applied to the removed legacy label-help tooltip.
  "labelWidth", // Typical uses token-defined dimensions.
  "labelSpacing", // Typical uses token-defined spacing.
  "reverse", // Typical has no reversed input layout.
  "tooltipPosition", // Typical has no legacy validation/help tooltip.
  "tooltipId", // Typical has no legacy label-help tooltip.
  "validationIconId", // Typical renders an inline message, not a tooltip icon.
  "validationMessagePositionTop", // Typical validation placement is fixed.
  "validationOnLabel", // Typical does not render legacy validation icons.
]);

const filterNonFunctioningProps = (
  props: Record<string, unknown>,
): Record<string, unknown> => {
  return Object.fromEntries(
    Object.entries(props).filter(
      ([key]) => !TYPICAL_UNSUPPORTED_LEGACY_PROPS.has(key),
    ),
  );
};

export const DateInputTypical = React.forwardRef<
  HTMLInputElement,
  DateInputTypicalProps
>(
  (
    {
      allowEmptyValue,
      adaptiveLabelBreakpoint,
      autoFocus,
      "aria-describedby": ariaDescribedByProp,
      "aria-labelledby": ariaLabelledBy,
      className,
      "data-element": dataElement,
      "data-role": dataRole,
      disabled,
      disablePortal = true,
      error,
      id,
      inputHint,
      inputWidth,
      label,
      labelAlign,
      labelHelp,
      labelId: labelIdProp,
      labelInline,
      maxDate,
      maxWidth,
      minDate,
      name,
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyDown,
      pickerProps,
      prefix,
      readOnly,
      required,
      size = "medium",
      value,
      warning,
      inputName,
      onPickerClose,
      onPickerOpen,
      dateFormatOverride: dateFormatOverrideProp,
      datePickerAriaLabel,
      datePickerAriaLabelledBy,
      ...rest
    }: DateInputTypicalProps,
    ref,
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const { dateFnsLocale, dateFormatOverride } = locale.date;
    const { format, formats } = useMemo(
      () =>
        getFormatData(
          dateFnsLocale(),
          dateFormatOverrideProp || dateFormatOverride,
        ),
      [dateFnsLocale, dateFormatOverride, dateFormatOverrideProp],
    );
    const [selectedDays, setSelectedDays] = useState(() =>
      getInitialSelectedDate(value, dateFnsLocale(), format),
    );
    const isInitialValue = useRef(true);

    useEffect(() => {
      setSelectedDays(
        getSelectedDateFromValue(value, formats, isInitialValue.current),
      );
    }, [value, formats]);

    const { inputValue, shouldMarkInitialValueChanged } = getDateInputValue({
      format,
      formats,
      isInitialValue: isInitialValue.current,
      value,
    });

    useEffect(() => {
      if (shouldMarkInitialValueChanged) {
        isInitialValue.current = false;
      }
    }, [shouldMarkInitialValueChanged]);

    const createDateChangeEvent = (ev: CustomDateEvent) =>
      buildDateChangeEvent({
        allowEmptyValue,
        event: ev,
        format,
        formats,
        selectedDate: selectedDays,
      });

    const labelHelpString =
      typeof labelHelp === "string" ? labelHelp : undefined;
    const resolvedInputHint = inputHint || labelHelpString;

    const {
      inputAriaDescribedBy,
      inputHintId,
      inputId,
      inputName: uniqueName,
      inputPrefixId,
      labelId,
      validationId,
    } = useDateInputAccessibility({
      ariaDescribedBy: ariaDescribedByProp,
      error,
      id,
      inputHint: resolvedInputHint,
      label,
      labelId: labelIdProp,
      name,
      prefix,
      warning,
    });
    const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
    const resolvedLabelInline = adaptiveLabelBreakpoint
      ? largeScreen
      : labelInline;
    const resolvedMaxWidth = maxWidth ?? dateInoutTypicalMinWidth[size];
    const {
      applyDateRangeStyling,
      assignInput,
      handleBlur,
      handleChange,
      handleClickInside,
      handleDayClick,
      handleFocus,
      handleIconClick,
      handleInputMouseClick,
      handleKeyDown,
      handleMonthYearChange,
      handleMouseDown,
      handlePickerMouseDown,
      open,
      parentRef,
      pickerId,
      pickerTabGuardId,
      setOpen,
    } = useDateInputPickerInteractions({
      buildCustomEvent: createDateChangeEvent,
      disabled,
      disablePortal,
      formatDate: (date?: Date) => formattedValue(format, date),
      getCurrentMatchedValue: () =>
        getCurrentMatchedValue(value, format, formats),
      getInvalidRawValue: (input) =>
        allowEmptyValue && !input.length ? input : null,
      inputId,
      inputName,
      isSelectedDateValid: () => !!isDateValid(selectedDays),
      markInitialValueChanged: () => {
        isInitialValue.current = false;
      },
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyDown,
      onPickerClose,
      onPickerOpen,
      readOnly,
      ref,
      selectedDays,
      setSelectedDays,
      uniqueName,
    });

    const iconToRender = (
      <DateInputCalendarTrigger
        disabled={disabled}
        open={open}
        pickerId={pickerId}
        readOnly={readOnly}
        size={size}
        onClick={handleIconClick}
      />
    );

    const marginProps = filterStyledSystemMarginProps(rest);
    const inputProps = filterNonFunctioningProps(
      filterOutStyledSystemSpacingProps(rest),
    );

    return (
      <StyledDateInput
        ref={wrapperRef}
        role="presentation"
        size={size}
        labelInline={resolvedLabelInline}
        {...marginProps}
        applyDateRangeStyling={applyDateRangeStyling}
        maxWidth={resolvedMaxWidth}
        inputWidth={inputWidth}
        {...tagComponent("date", {
          "data-element": dataElement,
          "data-role": dataRole,
        })}
        onMouseDown={handleClickInside}
        className={`date date-typical ${className || ""}`.trim()}
      >
        <DateInputField
          autoFocus={autoFocus}
          className={className}
          disabled={disabled}
          hasError={!!error}
          inputAriaDescribedBy={inputAriaDescribedBy}
          inputAriaLabelledBy={ariaLabelledBy}
          inputHint={resolvedInputHint}
          inputHintId={inputHintId}
          inputIcon={iconToRender}
          inputId={inputId}
          inputName={uniqueName}
          inputProps={inputProps}
          inputRef={assignInput}
          inputValue={inputValue}
          inputWidth={inputWidth}
          isRequired={required}
          label={label}
          labelAlign={labelAlign}
          labelId={labelId}
          labelInline={resolvedLabelInline}
          maxWidth={maxWidth}
          minWidth={dateInoutTypicalMinWidth[size]}
          onBlur={handleBlur}
          onChange={handleChange}
          onClick={handleInputMouseClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          prefix={prefix}
          prefixId={inputPrefixId}
          readOnly={readOnly}
          size={size}
          validation={
            <DateInputValidation
              error={error}
              id={validationId}
              shouldShowValidation={!!(error || warning)}
              size={size}
              warning={warning}
            />
          }
        />
        <DatePicker
          disablePortal={disablePortal}
          inputElement={parentRef}
          size={size}
          pickerProps={pickerProps}
          selectedDays={selectedDays}
          onDayClick={handleDayClick}
          onMonthYearChange={handleMonthYearChange}
          minDate={minDate}
          maxDate={maxDate}
          pickerMouseDown={handlePickerMouseDown}
          open={open}
          setOpen={setOpen}
          pickerTabGuardId={pickerTabGuardId}
          onPickerClose={onPickerClose}
          ariaLabel={datePickerAriaLabel}
          ariaLabelledBy={datePickerAriaLabelledBy}
          pickerId={pickerId}
        />
      </StyledDateInput>
    );
  },
);

DateInputTypical.displayName = "DateInputTypical";

export default DateInputTypical;
