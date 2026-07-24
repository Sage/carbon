import React, { useMemo, useRef } from "react";

import type { DatePickerProps } from "../date-picker";
import {
  getSelectedDateForMonth,
  buildYearRange,
  getMonthYearTransition,
  normalizeDateBounds,
  parseSelectInteger,
} from "../date-picker/date-picker.utils";

const DEFAULT_YEAR_RANGE_OFFSET = 100;

interface UseDatePickerMonthYearSelectionProps {
  minDate?: string;
  maxDate?: string;
  dayPickerProps?: DatePickerProps["dayPickerProps"];
  selectedDate?: Date;
  focusedMonth?: Date;
  setFocusedMonth: React.Dispatch<React.SetStateAction<Date | undefined>>;
  onMonthYearChange?: DatePickerProps["onMonthYearChange"];
  markSelectorChanged: (selector: "month" | "year") => void;
}

const useDatePickerMonthYearSelection = ({
  minDate,
  maxDate,
  dayPickerProps,
  selectedDate,
  focusedMonth,
  setFocusedMonth,
  onMonthYearChange,
  markSelectorChanged,
}: UseDatePickerMonthYearSelectionProps) => {
  const navigationBounds = useMemo(
    () =>
      normalizeDateBounds({
        minDate,
        maxDate,
        startMonth: dayPickerProps?.startMonth,
        endMonth: dayPickerProps?.endMonth,
      }),
    [minDate, maxDate, dayPickerProps?.startMonth, dayPickerProps?.endMonth],
  );
  const selectableDateBounds = useMemo(
    () => normalizeDateBounds({ minDate, maxDate }),
    [minDate, maxDate],
  );
  const { minMonth, maxMonth } = navigationBounds;
  const currentMonth = focusedMonth ?? new Date();
  const displayedMonth =
    minMonth && currentMonth < minMonth
      ? minMonth
      : maxMonth && currentMonth > maxMonth
        ? maxMonth
        : currentMonth;
  const displayedYear = displayedMonth.getFullYear();
  // Keep an unbounded default range stable as the user navigates. Re-anchoring
  // to each selected year would continually move the options and allow an
  // effectively unlimited range instead of the documented +/- 100 years.
  const initialDisplayedYear = useRef(displayedYear);
  const years = useMemo(
    () =>
      buildYearRange({
        minMonth,
        maxMonth,
        anchorYear: initialDisplayedYear.current,
        includedYear: displayedYear,
        offset: DEFAULT_YEAR_RANGE_OFFSET,
      }),
    [displayedYear, minMonth, maxMonth],
  );

  const navigateToMonthAndYear = ({
    month,
    year,
  }: {
    month: number;
    year: number;
  }) => {
    const transition = getMonthYearTransition({
      displayedMonth,
      month,
      year,
      minMonth,
      maxMonth,
    });
    setFocusedMonth(transition.date);
    return transition;
  };

  const notifySelectedDateChange = (
    month: number,
    year: number,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (!selectedDate) return;

    onMonthYearChange?.(
      getSelectedDateForMonth({
        selectedDate,
        month,
        year,
        minMonth: selectableDateBounds.minMonth,
        maxMonth: selectableDateBounds.maxMonth,
      }),
      event,
    );
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseSelectInteger(event.target.value);
    if (month === undefined || month < 0 || month > 11) return;

    markSelectorChanged("month");
    const year = displayedMonth.getFullYear();
    const transition = navigateToMonthAndYear({ month, year });
    notifySelectedDateChange(transition.month, transition.year, event);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseSelectInteger(event.target.value);
    if (year === undefined || !years.includes(year)) return;

    markSelectorChanged("year");
    const transition = navigateToMonthAndYear({
      month: displayedMonth.getMonth(),
      year,
    });
    notifySelectedDateChange(transition.month, transition.year, event);
  };

  return {
    displayedMonth,
    minMonth,
    maxMonth,
    years,
    handleMonthChange,
    handleYearChange,
  };
};

export default useDatePickerMonthYearSelection;
