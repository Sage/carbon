import React, { useMemo } from "react";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";

import { getDisabledDays } from "../utils";
import Popover from "../../../../__internal__/popover";
import useLocale from "../../../../hooks/__internal__/useLocale";
import Navbar from "../navbar";
import Weekday from "../weekday";
import StyledDayPicker from "./day-picker.style";

const DatePicker = React.forwardRef(
  (
    {
      inputElement,
      minDate,
      maxDate,
      selectedDays,
      disablePortal,
      onDayClick,
      pickerMouseDown,
      pickerProps,
    },
    ref
  ) => {
    const l = useLocale();
    const { localize, options } = l.date.dateFnsLocale();
    const { weekStartsOn } = options;
    const monthsLong = Array.from({ length: 12 }).map((_, i) =>
      localize.month(i)
    );
    const monthsShort = Array.from({ length: 12 }).map((_, i) =>
      localize.month(i, { width: "abbreviated" }).substring(0, 3)
    );
    const weekdaysLong = Array.from({ length: 7 }).map((_, i) =>
      localize.day(i)
    );
    const weekdaysShort = Array.from({ length: 7 }).map((_, i) =>
      localize
        .day(i, l.locale() === "de" ? {} : { width: "abbreviated" })
        .substring(0, 3)
    );

    const popoverModifiers = useMemo(
      () => [
        {
          name: "offset",
          options: {
            offset: [0, 3],
          },
        },
        {
          name: "preventOverflow",
          options: {
            mainAxis: false,
          },
        },
      ],
      []
    );

    const handleDayClick = (date, { disabled }, ev) => {
      if (!disabled) {
        onDayClick(date, ev);
      }
    };

    const formatDay = (date) =>
      `${weekdaysShort[date.getDay()]} ${date.getDate()} ${
        monthsShort[date.getMonth()]
      } ${date.getFullYear()}`;

    return (
      <Popover
        placement="bottom-start"
        reference={inputElement}
        modifiers={popoverModifiers}
        disablePortal={disablePortal}
      >
        <StyledDayPicker ref={ref} onMouseDown={pickerMouseDown}>
          <DayPicker
            month={selectedDays}
            months={monthsLong}
            firstDayOfWeek={weekStartsOn}
            onDayClick={handleDayClick}
            selectedDays={selectedDays}
            date={selectedDays}
            weekdayElement={(weekdayElementProps) => {
              const { className, weekday } = weekdayElementProps;

              return (
                <Weekday className={className} title={weekdaysLong[weekday]}>
                  {weekdaysShort[weekday]}
                </Weekday>
              );
            }}
            navbarElement={<Navbar />}
            enableOutsideDays
            fixedWeeks
            initialMonth={selectedDays || undefined}
            disabledDays={getDisabledDays(minDate, maxDate)}
            inline
            locale={l.locale()}
            localeUtils={{ formatDay }}
            {...pickerProps}
          />
        </StyledDayPicker>
      </Popover>
    );
  }
);

DatePicker.propTypes = {
  /** Minimum possible date */
  minDate: PropTypes.string,
  /** Maximum possible date */
  maxDate: PropTypes.string,
  /** Boolean to toggle where DatePicker is rendered in relation to the Date Input */
  disablePortal: PropTypes.bool,
  /** Element that the DatePicker will be displayed under */
  inputElement: PropTypes.object.isRequired,
  /** Currently selected date */
  selectedDays: PropTypes.instanceOf(Date),
  /** Callback to set selected date */
  onDayClick: PropTypes.func,
  /** Pass any props that match the DayPickerProps interface to override default behaviors */
  pickerProps: PropTypes.object,
  /** Callback to handle mousedown event on picker */
  pickerMouseDown: PropTypes.func,
};

export default DatePicker;
