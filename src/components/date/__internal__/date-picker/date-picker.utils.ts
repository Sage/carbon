import { checkISOFormatAndLength, parseISODate } from "../utils/utils";

export const parseDateBound = (value?: string) =>
  value && checkISOFormatAndLength(value) ? parseISODate(value) : undefined;

export const parseSelectInteger = (value: string) => {
  const parsedValue = Number(value);

  return Number.isSafeInteger(parsedValue) && String(parsedValue) === value
    ? parsedValue
    : undefined;
};

export const normalizeDateBounds = ({
  minDate,
  maxDate,
  startMonth,
  endMonth,
}: {
  minDate?: string;
  maxDate?: string;
  startMonth?: Date;
  endMonth?: Date;
}) => {
  const lowerBound = startMonth || parseDateBound(minDate);
  const upperBound = endMonth || parseDateBound(maxDate);

  return lowerBound && upperBound && lowerBound > upperBound
    ? { minMonth: upperBound, maxMonth: lowerBound }
    : { minMonth: lowerBound, maxMonth: upperBound };
};

export const buildYearRange = ({
  minMonth,
  maxMonth,
  anchorYear,
  includedYear,
  offset,
}: {
  minMonth?: Date;
  maxMonth?: Date;
  anchorYear: number;
  includedYear: number;
  offset: number;
}) => {
  const boundedAnchor = Math.min(
    Math.max(anchorYear, minMonth?.getFullYear() ?? -Infinity),
    maxMonth?.getFullYear() ?? Infinity,
  );
  const rangeAnchor = Math.min(
    Math.max(boundedAnchor, includedYear - offset),
    includedYear + offset,
  );
  const firstYear = minMonth?.getFullYear() ?? rangeAnchor - offset;
  const lastYear = maxMonth?.getFullYear() ?? rangeAnchor + offset;

  return Array.from(
    { length: lastYear - firstYear + 1 },
    (_, index) => firstYear + index,
  );
};

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

export const getMonthYearTransition = ({
  displayedMonth,
  month,
  year,
  minMonth,
  maxMonth,
}: {
  displayedMonth: Date;
  month: number;
  year: number;
  minMonth?: Date;
  maxMonth?: Date;
}) => {
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

  return { date, month: nextMonth, year };
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
