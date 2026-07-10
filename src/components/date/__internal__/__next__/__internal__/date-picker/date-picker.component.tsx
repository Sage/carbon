import { flip, offset } from "@floating-ui/dom";
import type { DayPickerProps } from "react-day-picker";
import React, { useCallback, useRef, useState } from "react";

import Popover from "../../../../../../__internal__/popover";
import guid from "../../../../../../__internal__/utils/helpers/guid";
import useLocale from "../../../../../../hooks/__internal__/useLocale";
import DatePickerPopover from "./date-picker.style";
import Calendar from "../calendar/calendar.component";
import CalendarFooter from "../calendar/calendar-footer.style";
import CalendarHeader from "../calendar/calendar-header.component";
import type { DatePickerProps } from "./date-picker.types";
import useDatePickerAccessibility from "../hooks/useDatePickerAccessibility";
import useDatePickerFocus from "../hooks/useDatePickerFocus";
import useDatePickerInFlatTable from "../hooks/useDatePickerInFlatTable";
import useDatePickerKeyboardNavigation from "../hooks/useDatePickerKeyboardNavigation";
import useDatePickerLocale from "../hooks/useDatePickerLocale";
import useDatePickerMonthSync from "../hooks/useDatePickerMonthSync";
import useDatePickerMonthYearSelection from "../hooks/useDatePickerMonthYearSelection";

const datePickerPopoverMiddleware = [
  offset(3),
  flip({
    fallbackStrategy: "bestFit",
    fallbackPlacements: ["bottom-start", "top-end", "top-start"],
  }),
];

export const DatePicker = ({
  inputElement,
  minDate,
  maxDate,
  selectedDays,
  disablePortal = true,
  onDayClick,
  onMonthYearChange,
  pickerMouseDown,
  pickerProps,
  open,
  setOpen,
  pickerTabGuardId,
  onPickerClose,
  ariaLabel: datePickerAriaLabel,
  ariaLabelledBy: datePickerAriaLabelledBy,
  pickerId,
  size = "medium",
}: DatePickerProps) => {
  const { mode: _unsupportedMode, ...dayPickerProps } = pickerProps || {};
  const locale = useLocale();
  const [focusedMonth, setFocusedMonth] = useState<Date | undefined>(
    selectedDays || new Date(),
  );
  const { localize, weekStartsOn, weekdaysLong, weekdaysShort } =
    useDatePickerLocale();

  const ref = useRef<HTMLDivElement>(null);
  const monthSelectId = useRef(`date-picker-month-${guid()}`);
  const yearSelectId = useRef(`date-picker-year-${guid()}`);
  const pickerAriaLabelledBy = [
    monthSelectId.current,
    yearSelectId.current,
    datePickerAriaLabelledBy,
  ]
    .filter(Boolean)
    .join(" ");

  const handlePickerClose = useCallback(() => {
    inputElement.current?.querySelector("input")?.focus();
    setOpen(false);
    onPickerClose?.();
  }, [inputElement, onPickerClose, setOpen]);

  const handleDayClick = (
    date?: Date,
    event?: React.MouseEvent<Element, MouseEvent>,
  ) => {
    if (!date) return;
    onDayClick?.(date, event as React.MouseEvent<HTMLDivElement>);
    onPickerClose?.();
  };

  const handleEscape = useCallback(() => {
    setFocusedMonth(selectedDays);
    handlePickerClose();
  }, [handlePickerClose, selectedDays]);
  const {
    getPickerDayFocusTarget,
    handleKeyDown,
    handleKeyUp,
    markSelectorChanged,
    resetChangedSelector,
  } = useDatePickerKeyboardNavigation({
    ref,
    open,
    monthSelectId: monthSelectId.current,
    yearSelectId: yearSelectId.current,
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
    pickerProps,
    selectedDays,
    focusedMonth,
    setFocusedMonth,
    onMonthYearChange,
    markSelectorChanged,
  });
  useDatePickerMonthSync({
    open,
    selectedDays,
    focusedMonth,
    setFocusedMonth,
  });
  useDatePickerFocus({
    open,
    getPickerDayFocusTarget,
    resetChangedSelector,
  });
  useDatePickerAccessibility({
    ref,
    open,
    focusedMonth,
    labelledBy: pickerAriaLabelledBy,
  });
  const { isInFlatTable } = useDatePickerInFlatTable(open);

  if (!open) return null;

  const handleTabGuardFocus = () => {
    getPickerDayFocusTarget()?.focus();
  };

  return (
    <Popover
      placement="bottom-end"
      reference={inputElement}
      middleware={datePickerPopoverMiddleware}
      disablePortal={disablePortal}
      disableBackgroundUI={isInFlatTable}
      popoverStrategy="fixed"
    >
      <DatePickerPopover
        id={pickerId || "styled-day-picker"}
        data-role="date-picker"
        ref={ref}
        onMouseDown={pickerMouseDown}
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
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            onFocus={handleTabGuardFocus}
          />
        )}
        <CalendarHeader
          displayedMonth={displayedMonth}
          minMonth={minMonth}
          maxMonth={maxMonth}
          monthSelectId={monthSelectId.current}
          yearSelectId={yearSelectId.current}
          years={years}
          size={size}
          localize={localize}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
        <Calendar
          dayPickerProps={
            dayPickerProps as Omit<DayPickerProps, "mode" | "selected">
          }
          focusedMonth={focusedMonth}
          selectedDays={selectedDays}
          minDate={minDate}
          maxDate={maxDate}
          weekStartsOn={weekStartsOn}
          weekdaysLong={weekdaysLong}
          weekdaysShort={weekdaysShort}
          setFocusedMonth={setFocusedMonth}
          onDayClick={handleDayClick}
        />
        <CalendarFooter
          data-role="date-picker-close"
          type="button"
          variant="default"
          variantType="subtle"
          size="small"
          onClick={handlePickerClose}
        >
          {locale.date.ariaLabels.closeButton()}
        </CalendarFooter>
      </DatePickerPopover>
    </Popover>
  );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;
