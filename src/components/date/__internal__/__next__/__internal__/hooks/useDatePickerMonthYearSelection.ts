import React, { useMemo } from "react";

import type { DatePickerProps } from "../date-picker/date-picker.types";
import {
  getSelectedDateForMonth,
  getMonthWithinDateRangeForYear,
  parseDateBound,
} from "../date-picker/date-picker.utils";

const DEFAULT_YEAR_RANGE_OFFSET = 100;

interface UseDatePickerMonthYearSelectionProps {
  minDate?: string;
  maxDate?: string;
  pickerProps?: DatePickerProps["pickerProps"];
  selectedDays?: Date;
  focusedMonth?: Date;
  setFocusedMonth: React.Dispatch<React.SetStateAction<Date | undefined>>;
  onMonthYearChange?: DatePickerProps["onMonthYearChange"];
  markSelectorChanged: (selector: "month" | "year") => void;
}

const useDatePickerMonthYearSelection = ({
  minDate,
  maxDate,
  pickerProps,
  selectedDays,
  focusedMonth,
  setFocusedMonth,
  onMonthYearChange,
  markSelectorChanged,
}: UseDatePickerMonthYearSelectionProps) => {
  const minMonth = pickerProps?.startMonth || parseDateBound(minDate);
  const maxMonth = pickerProps?.endMonth || parseDateBound(maxDate);
  const displayedMonth = focusedMonth || new Date();
  const displayedYear = displayedMonth.getFullYear();
  const firstAvailableYear =
    minMonth?.getFullYear() || displayedYear - DEFAULT_YEAR_RANGE_OFFSET;
  const lastAvailableYear =
    maxMonth?.getFullYear() || displayedYear + DEFAULT_YEAR_RANGE_OFFSET;
  const [firstYear, lastYear] =
    firstAvailableYear <= lastAvailableYear
      ? [firstAvailableYear, lastAvailableYear]
      : [lastAvailableYear, firstAvailableYear];
  const years = useMemo(
    () =>
      Array.from(
        { length: lastYear - firstYear + 1 },
        (_, index) => firstYear + index,
      ),
    [firstYear, lastYear],
  );

  const setMonthAndYear = (month: number, year: number) => {
    const nextMonth = getMonthWithinDateRangeForYear({
      year,
      month,
      minMonth,
      maxMonth,
    });
    const date = new Date(displayedMonth);
    date.setDate(1);
    date.setFullYear(year);
    date.setMonth(nextMonth);
    setFocusedMonth(date);
    return nextMonth;
  };

  const notifyMonthYearChange = (
    month: number,
    year: number,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (!selectedDays) return;

    onMonthYearChange?.(
      getSelectedDateForMonth({
        selectedDate: selectedDays,
        month,
        year,
        minMonth,
        maxMonth,
      }),
      event,
    );
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    markSelectorChanged("month");
    const year = displayedMonth.getFullYear();
    const month = setMonthAndYear(Number(event.target.value), year);
    notifyMonthYearChange(month, year, event);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    markSelectorChanged("year");
    const year = Number(event.target.value);
    const month = setMonthAndYear(displayedMonth.getMonth(), year);
    notifyMonthYearChange(month, year, event);
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
