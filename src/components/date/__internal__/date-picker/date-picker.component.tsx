import { flip, offset } from "@floating-ui/dom";
import React, { useCallback, useRef, useState } from "react";

import Popover from "../../../../__internal__/popover";
import guid from "../../../../__internal__/utils/helpers/guid";
import Logger from "../../../../__internal__/utils/logger";
import StyledDatePickerDialog, {
  DatePickerDescription,
  DatePickerFooter,
  DatePickerRangeFooter,
} from "./date-picker.style";
import Button from "../../../button/__next__";
import Calendar from "../calendar/calendar.component";
import CalendarCloseButton from "../calendar/calendar-close-button.component";
import CalendarNavigation from "../calendar/calendar-navigation.component";
import type { DatePickerProps } from "./date-picker.types";
import useDatePickerFocus from "../hooks/useDatePickerFocus";
import useDatePickerInFlatTable from "../hooks/useDatePickerInFlatTable";
import useDatePickerKeyboardNavigation from "../hooks/useDatePickerKeyboardNavigation";
import useDatePickerLocale from "../hooks/useDatePickerLocale";
import useDatePickerMonthSync from "../hooks/useDatePickerMonthSync";
import useDatePickerMonthYearSelection from "../hooks/useDatePickerMonthYearSelection";

const pickerPopoverMiddleware = [
  offset(3),
  flip({
    fallbackPlacements: ["bottom-end", "top-start", "top-end"],
  }),
];

let deprecateDisablePortalWarnTriggered = false;

export const DatePicker = ({
  inputContainerRef,
  datePickerTriggerRef,
  minDate,
  maxDate,
  selectedDate,
  disablePortal = true,
  onDayClick,
  onPickerMouseDown,
  dayPickerProps,
  open,
  onRequestPickerClose,
  pickerTabGuardId,
  pickerId,
  yearRangeOffset,
  mode = "single",
  selectedRange,
  onClear,
  onApply,
  statusMessage,
  ariaLabelledBy,
}: DatePickerProps) => {
  if (!deprecateDisablePortalWarnTriggered && disablePortal) {
    deprecateDisablePortalWarnTriggered = true;
    Logger.deprecate(
      "`disablePortal` is deprecated in DateInput and DateRange, and support will soon be removed.",
    );
  }

  // In range mode the start date (or the only valid date) decides the month shown.
  const anchorDate =
    mode === "range" ? selectedRange?.from || selectedRange?.to : selectedDate;

  const [focusedMonth, setFocusedMonth] = useState<Date | undefined>(
    anchorDate || new Date(),
  );

  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (mode === "range" && open) setFocusedMonth(anchorDate);
  }
  const {
    datePickerDialogAriaLabel,
    datePickerDescription,
    closeButtonLabel,
    clearButtonLabel,
    applyButtonLabel,
    dayPickerLocale,
    localize,
    weekStartsOn,
    weekdaysLong,
    weekdaysShort,
  } = useDatePickerLocale(mode);

  const pickerRef = useRef<HTMLDivElement>(null);
  const [{ monthSelectId, yearSelectId, pickerDescriptionId }] = useState(
    () => ({
      monthSelectId: `date-picker-month-${guid()}`,
      yearSelectId: `date-picker-year-${guid()}`,
      pickerDescriptionId: `date-picker-description-${guid()}`,
    }),
  );

  const closePickerAndRestoreFocus = useCallback(() => {
    const input = inputContainerRef.current?.querySelector("input");
    (datePickerTriggerRef?.current || input)?.focus();
    onRequestPickerClose();
  }, [datePickerTriggerRef, inputContainerRef, onRequestPickerClose]);

  const handleDayClick = (
    date?: Date,
    event?: React.MouseEvent<Element, MouseEvent>,
  ) => {
    if (!date) return;
    onDayClick?.(date, event as React.MouseEvent<HTMLDivElement>);
    if (mode === "single") {
      closePickerAndRestoreFocus();
    }
  };

  const handleEscape = useCallback(() => {
    if (mode === "single") {
      setFocusedMonth(selectedDate);
    }
    closePickerAndRestoreFocus();
  }, [closePickerAndRestoreFocus, mode, selectedDate]);
  const {
    getPickerDayFocusTarget,
    handleBlur,
    handleKeyDown,
    handleKeyUp,
    markSelectorChanged,
    resetChangedSelector,
  } = useDatePickerKeyboardNavigation({
    ref: pickerRef,
    open,
    mode,
    monthSelectId,
    yearSelectId,
    onEscape: handleEscape,
  });
  const { displayedMonth, years, handleMonthChange, handleYearChange } =
    useDatePickerMonthYearSelection({
      minDate,
      maxDate,
      dayPickerProps,
      focusedMonth,
      setFocusedMonth,
      markSelectorChanged,
      yearRangeOffset,
    });
  useDatePickerMonthSync({
    open,
    selectedDate: mode === "range" ? undefined : selectedDate,
    focusedMonth,
    setFocusedMonth,
  });
  useDatePickerFocus({
    open,
    pickerDescriptionId,
    getPickerDayFocusTarget,
    resetChangedSelector,
  });
  const { isInTable } = useDatePickerInFlatTable(open);

  if (!open) return null;

  const handleTabGuardFocus = () => {
    getPickerDayFocusTarget()?.focus();
  };

  return (
    <Popover
      placement="bottom-start"
      reference={inputContainerRef}
      middleware={pickerPopoverMiddleware}
      disablePortal={disablePortal}
      disableBackgroundUI={isInTable}
      popoverStrategy="fixed"
    >
      <StyledDatePickerDialog
        id={pickerId || "styled-day-picker"}
        data-role="date-picker"
        ref={pickerRef}
        onMouseDown={onPickerMouseDown}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-label={ariaLabelledBy ? undefined : datePickerDialogAriaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={pickerDescriptionId}
      >
        <DatePickerDescription id={pickerDescriptionId}>
          {datePickerDescription}
        </DatePickerDescription>
        {/* When portaled, redirects Tab focus from the input into the calendar. */}
        {!disablePortal && (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            id={pickerTabGuardId}
            data-role="date-picker-tab-guard"
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            onFocus={handleTabGuardFocus}
          />
        )}
        <CalendarNavigation
          displayedMonth={displayedMonth}
          monthSelectId={monthSelectId}
          yearSelectId={yearSelectId}
          years={years}
          localize={localize}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
        <Calendar
          // DatePicker manages initial focus so it can attach the accessible calendar description before focus lands.
          dayPickerProps={{ ...dayPickerProps, autoFocus: false }}
          focusedMonth={displayedMonth}
          selectedDays={selectedDate}
          mode={mode}
          selectedRange={selectedRange}
          minDate={minDate}
          maxDate={maxDate}
          weekStartsOn={weekStartsOn}
          locale={dayPickerLocale}
          weekdaysLong={weekdaysLong}
          weekdaysShort={weekdaysShort}
          setFocusedMonth={setFocusedMonth}
          onDayClick={handleDayClick}
        />
        {mode === "range" ? (
          <>
            <DatePickerRangeFooter>
              <Button
                data-role="date-picker-clear"
                data-element="clear"
                variant="default"
                variantType="secondary"
                size="small"
                onClick={onClear}
              >
                {clearButtonLabel}
              </Button>
              <Button
                data-role="date-picker-apply"
                data-element="apply"
                variant="default"
                variantType="primary"
                size="small"
                onClick={onApply}
              >
                {applyButtonLabel}
              </Button>
            </DatePickerRangeFooter>
            <DatePickerDescription
              role="status"
              aria-live="polite"
              data-role="date-picker-status"
            >
              {statusMessage}
            </DatePickerDescription>
          </>
        ) : (
          <DatePickerFooter>
            <CalendarCloseButton onClick={closePickerAndRestoreFocus}>
              {closeButtonLabel}
            </CalendarCloseButton>
          </DatePickerFooter>
        )}
      </StyledDatePickerDialog>
    </Popover>
  );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;
