import React from "react";
import {
  DayPicker,
  defaultLocale,
  getDefaultClassNames,
  type DayPickerProps,
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
  const dayIndex = weekdayIndexes[ariaLabel as keyof typeof weekdayIndexes];

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
  weekStartsOn,
  weekdaysLong,
  weekdaysShort,
  setFocusedMonth,
  onDayClick,
}: CalendarProps) => {
  const classNames = mergeClassNames(dayPickerProps?.classNames);

  return (
    <CalendarWeekdayLabelsContext.Provider
      value={{ long: weekdaysLong, short: weekdaysShort }}
    >
      <DayPicker
        hideNavigation
        required={false}
        weekStartsOn={weekStartsOn}
        onMonthChange={setFocusedMonth}
        disabled={getDisabledDays(minDate, maxDate)}
        locale={{ localize: { ...defaultLocale.localize } }}
        selected={selectedDays}
        month={focusedMonth || /* istanbul ignore next */ new Date()}
        onDayClick={(date, _, event) => onDayClick(date, event)}
        fixedWeeks
        defaultMonth={selectedDays}
        {...dayPickerProps}
        classNames={classNames}
        components={{
          ...dayPickerProps?.components,
          DayButton: dayPickerProps?.components?.DayButton ?? CalendarDayButton,
          Weekday:
            dayPickerProps?.components?.Weekday ?? CalendarWeekdayRenderer,
        }}
        showOutsideDays
        mode="single"
      />
    </CalendarWeekdayLabelsContext.Provider>
  );
};

export default Calendar;
