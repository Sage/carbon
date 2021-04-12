import React, { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import LocaleUtils from "react-day-picker/moment";
import DayPicker from "react-day-picker";

import Popover from "../../../__internal__/popover";
import DateHelper from "../../../utils/helpers/date/date";
import Navbar from "./navbar";
import Weekday from "./weekday";
import StyledDayPicker from "./day-picker.style";

const DatePicker = ({
  inputElement,
  inputDate,
  handleDateSelect,
  minDate,
  maxDate,
  selectedDate,
  disablePortal,
  size,
}) => {
  const [lastValidDate, setLastValidDate] = useState(
    DateHelper.formatDateString(new Date().toString())
  );
  const ref = useRef(null);

  const popoverModifiers = useMemo(() => {
    let overhang = 11;

    if (size === "small") overhang = 8;
    if (size === "large") overhang = 13;

    return [
      {
        name: "offset",
        options: {
          offset: [-overhang, 5],
        },
      },
      {
        name: "preventOverflow",
        options: {
          mainAxis: false,
        },
      },
    ];
  }, [size]);

  useEffect(() => {
    let monthDate;
    const isoFormattedInputDate = isoFormattedValueString(inputDate);

    if (isDateValid(isoFormattedInputDate)) {
      monthDate = new Date(isoFormattedInputDate);
      setLastValidDate(isoFormattedInputDate);
    } else {
      monthDate = new Date(lastValidDate);
    }

    ref.current.showMonth(monthDate);
  }, [inputDate, lastValidDate]);

  const handleDayClick = (date, modifiers) => {
    if (!modifiers.disabled) {
      handleDateSelect(date);
    }
  };

  const datePickerProps = {
    disabledDays: getDisabledDays(minDate, maxDate),
    enableOutsideDays: true,
    fixedWeeks: true,
    initialMonth: selectedDate || undefined,
    inline: true,
    locale: I18n.locale,
    localeUtils: LocaleUtils,
    navbarElement: <Navbar />,
    onDayClick: handleDayClick,
    selectedDays: selectedDate || undefined,
    weekdayElement: (weekdayElementProps) => {
      const { className, weekday, localeUtils } = weekdayElementProps;
      const weekdayLong = localeUtils.formatWeekdayLong(weekday, I18n.locale);
      const weekdayShort = localeUtils.formatWeekdayShort(weekday, I18n.locale);

      return (
        <Weekday className={className} title={weekdayLong}>
          {weekdayShort}
        </Weekday>
      );
    },
  };

  return (
    <Popover
      placement="bottom-start"
      reference={inputElement}
      modifiers={popoverModifiers}
      disablePortal={disablePortal}
    >
      <StyledDayPicker>
        <DayPicker {...datePickerProps} ref={ref} />
      </StyledDayPicker>
    </Popover>
  );
};

DatePicker.propTypes = {
  /** Minimum possible date */
  minDate: PropTypes.string,
  /** Maximum possible date */
  maxDate: PropTypes.string,
  /** Boolean to toggle where DatePicker is rendered in relation to the Date Input */
  disablePortal: PropTypes.bool,
  /* The string value in the date input */
  inputDate: PropTypes.string,
  /** Element that the DatePicker will be displayed under */
  inputElement: PropTypes.object.isRequired,
  /** Currently selected date */
  selectedDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** Callback to set selected date */
  handleDateSelect: PropTypes.func,
  /** Size of an input */
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

/**
 * Checks if date can be transformed to native js Date object
 */
function isDateValid(string) {
  const date = new Date(string);
  return date.toString() !== "Invalid Date";
}

function isoFormattedValueString(valueToFormat) {
  return DateHelper.formatValue(valueToFormat);
}

/**
 * Returns the disabled array of days specified by props maxDate and minDate
 */
function getDisabledDays(minDate, maxDate) {
  const days = [];

  if (!minDate && !maxDate) {
    return null;
  }

  if (minDate && checkIsoFormatAndLength(minDate)) {
    days.push({ before: DateHelper.stringToDate(minDate) });
  }

  if (maxDate && checkIsoFormatAndLength(maxDate)) {
    days.push({ after: DateHelper.stringToDate(maxDate) });
  }

  return days;
}

function checkIsoFormatAndLength(date) {
  if (
    date.length !== 10 ||
    !DateHelper.isValidDate(date, { defaultValue: "YYYY-MM-DD" })
  ) {
    return false;
  }
  const array = date.split("-");
  return (
    array.length === 3 &&
    array[0].length === 4 &&
    array[1].length === 2 &&
    array[2].length === 2
  );
}

export default DatePicker;
