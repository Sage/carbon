import { checkISOFormatAndLength, parseISODate } from "../../../utils";

export const parseDateBound = (value?: string) =>
  value && checkISOFormatAndLength(value) ? parseISODate(value) : undefined;

export const getMonthWithinDateRangeForYear = ({
  year,
  month,
  minMonth,
  maxMonth,
}: {
  year: number;
  month: number;
  minMonth?: Date;
  maxMonth?: Date;
}) => {
  let clampedMonth = month;

  if (minMonth && year === minMonth.getFullYear()) {
    clampedMonth = Math.max(clampedMonth, minMonth.getMonth());
  }

  if (maxMonth && year === maxMonth.getFullYear()) {
    clampedMonth = Math.min(clampedMonth, maxMonth.getMonth());
  }

  return clampedMonth;
};

export const getSelectedDateForMonth = ({
  selectedDate,
  month,
  year,
  minMonth,
  maxMonth,
}: {
  selectedDate: Date;
  month: number;
  year: number;
  minMonth?: Date;
  maxMonth?: Date;
}) => {
  const date = new Date(selectedDate);
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  date.setDate(1);
  date.setFullYear(year);
  date.setMonth(month);
  date.setDate(Math.min(selectedDate.getDate(), lastDayOfMonth));

  if (
    minMonth &&
    date.getFullYear() === minMonth.getFullYear() &&
    date.getMonth() === minMonth.getMonth() &&
    date.getDate() < minMonth.getDate()
  ) {
    date.setDate(minMonth.getDate());
  }

  if (
    maxMonth &&
    date.getFullYear() === maxMonth.getFullYear() &&
    date.getMonth() === maxMonth.getMonth() &&
    date.getDate() > maxMonth.getDate()
  ) {
    date.setDate(maxMonth.getDate());
  }

  return date;
};
