import { flip, offset } from "@floating-ui/dom";
import React, { useCallback, useRef, useState } from "react";

import Popover from "../../../../__internal__/popover";
import guid from "../../../../__internal__/utils/helpers/guid";
import Logger from "../../../../__internal__/utils/logger";
import StyledDatePickerDialog from "./date-picker.style";
import Calendar from "../calendar/calendar.component";
import CalendarCloseButton from "../calendar/calendar-close-button.component";
import CalendarNavigation from "../calendar/calendar-navigation.component";
import type { DatePickerProps } from "./date-picker.types";
import useDatePickerAccessibility from "../hooks/useDatePickerAccessibility";
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
  minDate,
  maxDate,
  selectedDate,
  disablePortal = true,
  onDayClick,
  onMonthYearChange,
  onPickerMouseDown,
  dayPickerProps,
  open,
  onRequestPickerClose,
  pickerTabGuardId,
  ariaLabel: datePickerAriaLabel,
  ariaLabelledBy: datePickerAriaLabelledBy,
  pickerId,
  size = "medium",
}: DatePickerProps) => {
  if (!deprecateDisablePortalWarnTriggered && disablePortal) {
    deprecateDisablePortalWarnTriggered = true;
    Logger.deprecate(
      "`disablePortal` is deprecated in DateInput and DateRange, and support will soon be removed.",
    );
  }

  const [focusedMonth, setFocusedMonth] = useState<Date | undefined>(
    selectedDate || new Date(),
  );
  const {
    closeButtonLabel,
    localize,
    weekStartsOn,
    weekdaysLong,
    weekdaysShort,
  } = useDatePickerLocale();

  const pickerRef = useRef<HTMLDivElement>(null);
  const [{ monthSelectId, yearSelectId }] = useState(() => ({
    monthSelectId: `date-picker-month-${guid()}`,
    yearSelectId: `date-picker-year-${guid()}`,
  }));
  const defaultPickerAriaLabelledBy = `${monthSelectId} ${yearSelectId}`;
  const pickerAriaLabelledBy =
    datePickerAriaLabelledBy ||
    (datePickerAriaLabel ? undefined : defaultPickerAriaLabelledBy);

  const closePickerAndRestoreFocus = useCallback(() => {
    inputContainerRef.current?.querySelector("input")?.focus();
    onRequestPickerClose();
  }, [inputContainerRef, onRequestPickerClose]);

  const handleDayClick = (
    date?: Date,
    event?: React.MouseEvent<Element, MouseEvent>,
  ) => {
    if (!date) return;
    onDayClick?.(date, event as React.MouseEvent<HTMLDivElement>);
    onRequestPickerClose();
  };

  const handleEscape = useCallback(() => {
    setFocusedMonth(selectedDate);
    closePickerAndRestoreFocus();
  }, [closePickerAndRestoreFocus, selectedDate]);
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
    monthSelectId,
    yearSelectId,
    onEscape: handleEscape,
  });
  const {
    displayedMonth,
    minMonth,
    maxMonth,
    years,
    handleMonthChange,
    handleYearChange,
  } = useDatePickerMonthYearSelection({
    minDate,
    maxDate,
    dayPickerProps,
    selectedDate,
    focusedMonth,
    setFocusedMonth,
    onMonthYearChange,
    markSelectorChanged,
  });
  useDatePickerMonthSync({
    open,
    selectedDate,
    focusedMonth,
    setFocusedMonth,
  });
  useDatePickerFocus({
    open,
    getPickerDayFocusTarget,
    resetChangedSelector,
  });
  useDatePickerAccessibility({
    ref: pickerRef,
    open,
    focusedMonth: displayedMonth,
    labelledBy: defaultPickerAriaLabelledBy,
  });
  const { isInFlatTable } = useDatePickerInFlatTable(open);

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
      disableBackgroundUI={isInFlatTable}
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
        aria-modal="true"
        aria-label={datePickerAriaLabel}
        aria-labelledby={pickerAriaLabelledBy}
      >
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
          minMonth={minMonth}
          maxMonth={maxMonth}
          monthSelectId={monthSelectId}
          yearSelectId={yearSelectId}
          years={years}
          size={size}
          localize={localize}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
        <Calendar
          dayPickerProps={dayPickerProps}
          focusedMonth={displayedMonth}
          selectedDays={selectedDate}
          minDate={minDate}
          maxDate={maxDate}
          weekStartsOn={weekStartsOn}
          weekdaysLong={weekdaysLong}
          weekdaysShort={weekdaysShort}
          setFocusedMonth={setFocusedMonth}
          onDayClick={handleDayClick}
        />
        <CalendarCloseButton onClick={closePickerAndRestoreFocus}>
          {closeButtonLabel}
        </CalendarCloseButton>
      </StyledDatePickerDialog>
    </Popover>
  );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;
