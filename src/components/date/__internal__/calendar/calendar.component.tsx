import React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayPickerProps,
  type Matcher,
} from "react-day-picker";

import { getDisabledDays } from "../utils/utils";
import CalendarDayButton from "./calendar-day-button.component";
import CalendarWeekday from "./calendar-weekday.component";

const weekdayIndexes = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
} as const;

const defaultClassNames = getDefaultClassNames();

const toMatcherArray = (matchers: Matcher | Matcher[] | undefined) => {
  if (!matchers) return [];
  return Array.isArray(matchers) ? matchers : [matchers];
};

interface CalendarWeekdayLabels {
  long: (string | undefined)[];
  short: (string | undefined)[];
}

const CalendarWeekdayLabelsContext = React.createContext<CalendarWeekdayLabels>(
  { long: [], short: [] },
);

type DayPickerWeekdayProps = Parameters<
  NonNullable<NonNullable<DayPickerProps["components"]>["Weekday"]>
>[0];

export const CalendarWeekdayRenderer = ({
  className,
  "aria-label": ariaLabel,
  children,
}: DayPickerWeekdayProps) => {
  const weekdays = React.useContext(CalendarWeekdayLabelsContext);
  const localizedDayIndex = weekdays.long.indexOf(ariaLabel);
  const dayIndex =
    weekdayIndexes[ariaLabel as keyof typeof weekdayIndexes] ??
    (localizedDayIndex >= 0 ? localizedDayIndex : undefined);

  return (
    <CalendarWeekday
      className={className}
      title={dayIndex !== undefined ? weekdays.long[dayIndex] : ariaLabel}
    >
      {dayIndex !== undefined ? weekdays.short[dayIndex] : children}
    </CalendarWeekday>
  );
};

export const mergeClassNames = (classNames: DayPickerProps["classNames"]) =>
  Object.fromEntries(
    Object.entries(classNames || {}).flatMap(([key, className]) => {
      if (!className) return [];

      const defaultClassName =
        defaultClassNames[key as keyof typeof defaultClassNames];
      return [
        [
          key,
          defaultClassName ? `${defaultClassName} ${className}` : className,
        ],
      ];
    }),
  );

interface CalendarProps {
  dayPickerProps?: Omit<DayPickerProps, "mode" | "selected">;
  focusedMonth?: Date;
  selectedDays?: Date;
  minDate?: string;
  maxDate?: string;
  locale: DayPickerProps["locale"];
  weekStartsOn?: DayPickerProps["weekStartsOn"];
  weekdaysLong: (string | undefined)[];
  weekdaysShort: (string | undefined)[];
  setFocusedMonth: (month: Date) => void;
  onDayClick: (date?: Date, ev?: React.MouseEvent<Element, MouseEvent>) => void;
}

const Calendar = ({
  dayPickerProps,
  focusedMonth,
  selectedDays,
  minDate,
  maxDate,
  locale,
  weekStartsOn,
  weekdaysLong,
  weekdaysShort,
  setFocusedMonth,
  onDayClick,
}: CalendarProps) => {
  const classNames = mergeClassNames(dayPickerProps?.classNames);
  const minMaxDisabledDays = getDisabledDays(minDate, maxDate);
  const customDisabledDays = dayPickerProps?.disabled;
  const disabledDays = [
    ...toMatcherArray(minMaxDisabledDays),
    ...toMatcherArray(customDisabledDays),
  ];

  return (
    <CalendarWeekdayLabelsContext.Provider
      value={{ long: weekdaysLong, short: weekdaysShort }}
    >
      <DayPicker
        hideNavigation
        required={false}
        weekStartsOn={weekStartsOn}
        onMonthChange={setFocusedMonth}
        selected={selectedDays}
        month={focusedMonth || /* istanbul ignore next */ new Date()}
        fixedWeeks
        defaultMonth={selectedDays}
        {...dayPickerProps}
        locale={locale}
        classNames={classNames}
        components={{
          ...dayPickerProps?.components,
          DayButton: dayPickerProps?.components?.DayButton ?? CalendarDayButton,
          Weekday:
            dayPickerProps?.components?.Weekday ?? CalendarWeekdayRenderer,
        }}
        showOutsideDays
        mode="single"
        disabled={disabledDays.length ? disabledDays : undefined}
        onDayClick={(date, modifiers, event) => {
          onDayClick(date, event);
          dayPickerProps?.onDayClick?.(date, modifiers, event);
        }}
      />
    </CalendarWeekdayLabelsContext.Provider>
  );
};

export default Calendar;
