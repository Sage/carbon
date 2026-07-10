import React from "react";
import {
  DayPicker,
  defaultLocale,
  type DayPickerProps,
} from "react-day-picker";

import { getDisabledDays } from "../../../utils";
import CalendarDayButton from "./calendar-day-button.component";
import CalendarWeekday from "./calendar-weekday.component";

interface CalendarProps {
  dayPickerProps: Omit<DayPickerProps, "mode" | "selected">;
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
}: CalendarProps) => (
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
    components={{
      DayButton: CalendarDayButton,
      Weekday: ({ className, "aria-label": ariaLabel, children }) => {
        const dayIndex = weekdaysLong.findIndex((day) => day === ariaLabel);
        return (
          <CalendarWeekday
            className={className}
            title={dayIndex >= 0 ? weekdaysLong[dayIndex] : ariaLabel}
          >
            {dayIndex >= 0 ? weekdaysShort[dayIndex] : children}
          </CalendarWeekday>
        );
      },
    }}
    fixedWeeks
    defaultMonth={selectedDays}
    {...dayPickerProps}
    showOutsideDays
    mode="single"
  />
);

export default Calendar;
