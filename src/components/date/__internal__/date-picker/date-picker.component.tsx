import { flip, offset } from "@floating-ui/dom";
import React, { useCallback, useRef, useState } from "react";

import Popover from "../../../../__internal__/popover";
import guid from "../../../../__internal__/utils/helpers/guid";
import Logger from "../../../../__internal__/utils/logger";
import StyledDatePickerDialog, {
  DatePickerDescription,
} from "./date-picker.style";
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
    datePickerDialogAriaLabel,
    datePickerDescription,
    closeButtonLabel,
    localize,
    weekStartsOn,
    weekdaysLong,
    weekdaysShort,
  } = useDatePickerLocale();

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
    closePickerAndRestoreFocus();
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
    selectedDate,
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
        aria-label={datePickerDialogAriaLabel}
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
