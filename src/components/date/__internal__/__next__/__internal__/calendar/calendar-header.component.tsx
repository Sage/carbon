import type { Month as DateFnsMonth } from "date-fns";
import React from "react";

import useLocale from "../../../../../../hooks/__internal__/useLocale";
import {
  CalendarHeader as CalendarHeaderContainer,
  Month,
  Year,
} from "./calendar-header.style";

interface CalendarHeaderProps {
  displayedMonth: Date;
  minMonth?: Date;
  maxMonth?: Date;
  monthSelectId: string;
  yearSelectId: string;
  years: number[];
  size: "small" | "medium" | "large";
  localize?: {
    month: (month: DateFnsMonth, options?: { width?: "wide" }) => string;
  };
  onMonthChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
  onYearChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CalendarHeader = ({
  displayedMonth,
  minMonth,
  maxMonth,
  monthSelectId,
  yearSelectId,
  years,
  size,
  localize,
  onMonthChange,
  onYearChange,
}: CalendarHeaderProps) => {
  const locale = useLocale();
  const displayedYear = displayedMonth.getFullYear();
  const monthOptions = Array.from({ length: 12 }, (_, month) => ({
    value: month,
    label: localize?.month(month as DateFnsMonth) || String(month + 1),
    disabled: Boolean(
      (minMonth &&
        displayedYear === minMonth.getFullYear() &&
        month < minMonth.getMonth()) ||
        (maxMonth &&
          displayedYear === maxMonth.getFullYear() &&
          month > maxMonth.getMonth()),
    ),
  }));

  return (
    <CalendarHeaderContainer
      $size={size}
      data-component="date-picker-header"
      data-element="date-picker-header"
      data-role="date-picker-header"
    >
      <Month
        id={monthSelectId}
        data-element="date-picker-month-selector"
        data-role="date-picker-month-selector"
        aria-label={locale.date.ariaLabels.chooseMonth()}
        size={size}
        options={monthOptions}
        value={displayedMonth.getMonth()}
        onChange={onMonthChange}
        disabled={monthOptions.every(({ disabled }) => disabled)}
      />
      <Year
        id={yearSelectId}
        data-element="date-picker-year-selector"
        data-role="date-picker-year-selector"
        aria-label={locale.date.ariaLabels.chooseYear()}
        size={size}
        options={years.map((year) => ({ value: year, label: String(year) }))}
        value={displayedYear}
        onChange={onYearChange}
        disabled={years.length <= 1}
      />
    </CalendarHeaderContainer>
  );
};

export default CalendarHeader;
