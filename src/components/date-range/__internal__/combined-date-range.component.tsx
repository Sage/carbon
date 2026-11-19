import React, { useContext, useRef, useState } from "react";

import DatePicker from "../../date/__internal__/date-picker";
import useDatePickerState from "../../date/__internal__/hooks/useDatePickerState";
import { formattedValue } from "../../date/__internal__/utils/utils";
import Icon from "../../icon";
import Label from "../../../__internal__/label";
import HintText from "../../../__internal__/hint-text";
import ValidationMessage from "../../../__internal__/validation-message/__next__";
import ErrorBorder from "../../../__internal__/error-border/error-border.style";
import FieldsetValidationContext from "../../../__internal__/fieldset-validation-context";
import {
  StyledTextInput,
  LabelWrapper,
  InputWrapper,
} from "../../textbox/__internal__/__next__/text-input.style";
import FieldsetContext from "../../fieldset/__internal__/fieldset.context";
import useLocale from "../../../hooks/__internal__/useLocale";
import useUniqueId from "../../../hooks/__internal__/useUniqueId";
import useClickAwayListener from "../../../hooks/__internal__/useClickAwayListener";
import useInputAccessibility from "../../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import useRegisterValidationToTabs from "../../../hooks/__internal__/useRegisterValidationToTabs/useRegisterValidationToTabs";
import combineRefs from "../../../__internal__/utils/helpers/combine-refs";
import guid from "../../../__internal__/utils/helpers/guid";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import {
  StyledCombinedField,
  StyledCombinedTrigger,
  StyledCombinedTriggerIcon,
  StyledCombinedTriggerText,
  StyledCombinedTriggerValue,
} from "../date-range.style";
import useDateRangeValue from "./useDateRangeValue";
import useDraftRange from "./useDraftRange";
import type { CombinedDateRangeProps } from "../date-range.component";

export const CombinedDateRange = ({
  rangeType: _rangeType,
  value,
  onChange,
  onBlur,
  id,
  name,
  required,
  size,
  dateFormatOverride,
  label,
  error,
  warning,
  inputHint,
  disabled,
  minDate,
  maxDate,
  pickerProps,
  triggerRef,
  ...rest
}: CombinedDateRangeProps) => {
  const { rangeText } = useLocale().date;
  const {
    format,
    toDisplayValue,
    toDate,
    toDateInputValue,
    toRangeChangeEvent,
  } = useDateRangeValue({ dateFormatOverride, id, name });

  const {
    size: fieldsetSize,
    required: fieldsetRequired,
    hasError: fieldsetError,
  } = useContext(FieldsetContext);
  const { disableErrorBorder } = useContext(FieldsetValidationContext);
  const actualSize = fieldsetSize || size || "medium";
  const hasError = !!error || !!fieldsetError;

  const [triggerId] = useUniqueId(id);
  const [{ hintId, pickerId }] = useState(() => ({
    hintId: guid(),
    pickerId: `date-picker-${guid()}`,
  }));
  const valueId = `${triggerId}-value`;
  const { labelId, validationId } = useInputAccessibility({
    id: triggerId,
    validationRedesignOptIn: true,
    error,
    warning,
    label,
  });
  useRegisterValidationToTabs(!!error, !!warning, triggerId);

  const localTriggerRef = useRef<HTMLButtonElement>(null);
  const combinedTriggerRef = combineRefs(triggerRef, localTriggerRef);
  const { open, openPicker, closePicker } = useDatePickerState({});

  const [startValue = "", endValue = ""] = value;
  const startText = toDisplayValue(startValue);
  const endText = toDisplayValue(endValue);

  const draftRange = useDraftRange({
    isOpen: open,
    committed: [startText, endText],
    format,
    toDate,
  });
  const [shownStart, shownEnd] = draftRange.text;
  // A partial range leaves a gap in the locale's text, so the spacing is tidied.
  const toRangeText = (start: string, end: string) =>
    (rangeText?.(start, end) ?? `${start} ${end}`).replace(/\s+/g, " ").trim();
  const rangeDisplayText =
    shownStart || shownEnd ? toRangeText(shownStart, shownEnd) : "";
  // A full range in the current format sets the field's width, so it doesn't change as dates are picked.
  const sizingDate = formattedValue(format, new Date(2000, 11, 28));
  const sizerText = toRangeText(sizingDate, sizingDate);

  const toRangeChangeEventFromText = (start: string, end: string) =>
    toRangeChangeEvent(
      toDateInputValue(start, { allowEmptyValue: true }),
      toDateInputValue(end, { allowEmptyValue: true }),
    );

  /** Closes without Apply, discarding the draft, and returns the value held. */
  const cancelAndClose = () => {
    closePicker();
    return toRangeChangeEventFromText(startValue, endValue);
  };

  const handleClickAway = () => {
    if (!open) return;

    const event = cancelAndClose();
    // Focus stays where the user clicked, so it has left the field.
    onBlur?.(event);
  };

  const handleClickInside = useClickAwayListener(handleClickAway, "mousedown");

  const handleTriggerClick = () => {
    if (open) {
      // Some browsers (Safari) don't focus a clicked button, so focus would be lost with the calendar.
      localTriggerRef.current?.focus();
      cancelAndClose();
      return;
    }

    draftRange.startDraft();
    openPicker();
  };

  // Apply reports the draft, including a partial range, when it differs from the value.
  const handleApply = () => {
    localTriggerRef.current?.focus();
    closePicker();

    if (draftRange.hasChanges) {
      onChange(toRangeChangeEventFromText(...draftRange.draft));
    }
  };

  const handleBlur = (ev: React.FocusEvent<HTMLDivElement>) => {
    // Focus moving between the trigger and the calendar stays inside the field. While the calendar
    // is open, focus can only leave by clicking outside, which handleClickAway reports.
    if (open || ev.currentTarget.contains(ev.relatedTarget as Node | null)) {
      return;
    }

    onBlur?.(toRangeChangeEventFromText(startValue, endValue));
  };

  const ariaDescribedBy =
    [inputHint ? hintId : undefined, validationId].filter(Boolean).join(" ") ||
    undefined;
  const hasValidationFailure = !!(error || warning) && !disableErrorBorder;

  return (
    <StyledTextInput
      {...tagComponent("date-range", rest)}
      $size={actualSize}
      {...filterStyledSystemMarginProps(rest)}
      onBlur={handleBlur}
    >
      <LabelWrapper
        data-role="label-wrapper"
        $size={actualSize}
        // A label click activates the trigger, so it counts as a click inside the field.
        onMouseDown={handleClickInside}
      >
        <Label
          id={labelId}
          htmlFor={triggerId}
          size={actualSize}
          isRequired={required}
          disabled={disabled}
        >
          {label}
        </Label>
        {inputHint && (
          <HintText id={hintId} size={actualSize} disabled={disabled}>
            {inputHint}
          </HintText>
        )}
      </LabelWrapper>
      <InputWrapper data-role="input-wrapper" $size={actualSize}>
        {hasValidationFailure && (
          <ValidationMessage
            id={validationId}
            size={actualSize}
            error={error}
            warning={warning}
          />
        )}
        <StyledCombinedField
          data-role="input-container"
          $size={actualSize}
          $error={hasError}
          $isDisabled={disabled}
        >
          <StyledCombinedTrigger
            ref={combinedTriggerRef}
            id={triggerId}
            type="button"
            role="combobox"
            data-element="trigger"
            aria-labelledby={
              rangeDisplayText ? `${labelId} ${valueId}` : labelId
            }
            aria-describedby={ariaDescribedBy}
            aria-required={required || fieldsetRequired || undefined}
            aria-invalid={hasError}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? pickerId : undefined}
            disabled={disabled}
            onClick={handleTriggerClick}
            onMouseDown={handleClickInside}
          >
            <StyledCombinedTriggerText
              $size={actualSize}
              data-sizer={sizerText}
            >
              <StyledCombinedTriggerValue id={valueId}>
                {rangeDisplayText}
              </StyledCombinedTriggerValue>
            </StyledCombinedTriggerText>
            <StyledCombinedTriggerIcon $size={actualSize}>
              <Icon type="calendar_today" aria-hidden />
            </StyledCombinedTriggerIcon>
          </StyledCombinedTrigger>
        </StyledCombinedField>
        {hasValidationFailure && (
          <ErrorBorder
            data-role="error-border"
            $warning={!!(!error && warning)}
          />
        )}
        <DatePicker
          mode="range"
          inputContainerRef={localTriggerRef}
          datePickerTriggerRef={localTriggerRef}
          dayPickerProps={pickerProps}
          selectedRange={draftRange.selectedRange}
          minDate={minDate}
          maxDate={maxDate}
          onDayClick={draftRange.selectDay}
          onPickerMouseDown={handleClickInside}
          open={open}
          onRequestPickerClose={cancelAndClose}
          pickerId={pickerId}
          size={actualSize}
          onClear={draftRange.clear}
          onApply={handleApply}
          statusMessage={draftRange.statusMessage}
          ariaLabelledBy={labelId}
        />
      </InputWrapper>
      {name && (
        <>
          <input
            type="hidden"
            name={`${name}-start`}
            value={
              toDateInputValue(startValue, { allowEmptyValue: true })
                .rawValue || ""
            }
            disabled={disabled}
            data-role="hidden-input"
          />
          <input
            type="hidden"
            name={`${name}-end`}
            value={
              toDateInputValue(endValue, { allowEmptyValue: true }).rawValue ||
              ""
            }
            disabled={disabled}
            data-role="hidden-input"
          />
        </>
      )}
    </StyledTextInput>
  );
};

export default CombinedDateRange;
