import React, { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import LocaleUtils from "react-day-picker/moment";
import DayPicker from "react-day-picker";
import isEqual from "lodash/isEqual";

import Popover from "../../__internal__/popover";
import DateHelper from "../../__internal__/date";
import useLocale from "../../hooks/__internal__/useLocale";
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
}) => {
  const l = useLocale();
  const locale = l.locale();
  const formats = l.date.formats.inputs();
  const format = l.date.formats.javascript();
  const [lastValidDate, setLastValidDate] = useState(
    DateHelper.formatDateString(new Date().toString())
  );
  const [localeData, setLocaleData] = useState({
    locale,
    formats,
    format,
  });
  const ref = useRef(null);

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

  useEffect(() => {
    if (
      localeData.format === format &&
      isEqual(localeData.formats, formats) &&
      localeData.locale === locale
    ) {
      return;
    }
    setLocaleData({
      locale,
      formats,
      format,
    });
  }, [
    localeData.format,
    localeData.formats,
    localeData.locale,
    format,
    formats,
    locale,
  ]);

  useEffect(() => {
    let monthDate;
    const isoFormattedInputDate = DateHelper.formatValue({
      value: inputDate,
      ...localeData,
    });

    if (isDateValid(isoFormattedInputDate)) {
      monthDate = new Date(isoFormattedInputDate);
      setLastValidDate(isoFormattedInputDate);
    } else {
      monthDate = new Date(lastValidDate);
    }

    ref.current.showMonth(monthDate);
  }, [inputDate, lastValidDate, localeData]);

  const handleDayClick = (date, modifiers) => {
    if (!modifiers.disabled) {
      handleDateSelect(date);
    }
  };

  const datePickerProps = {
    disabledDays: getDisabledDays(minDate, maxDate, localeData),
    enableOutsideDays: true,
    fixedWeeks: true,
    initialMonth: selectedDate || undefined,
    inline: true,
    locale: l.locale(),
    localeUtils: LocaleUtils,
    navbarElement: <Navbar />,
    onDayClick: handleDayClick,
    selectedDays: selectedDate || undefined,
    weekdayElement: (weekdayElementProps) => {
      const { className, weekday, localeUtils } = weekdayElementProps;
      const weekdayLong = localeUtils.formatWeekdayLong(weekday, l.locale());
      const weekdayShort = localeUtils.formatWeekdayShort(weekday, l.locale());

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
};

/**
 * Checks if date can be transformed to native js Date object
 */
function isDateValid(string) {
  const date = new Date(string);
  return date.toString() !== "Invalid Date";
}

/**
 * Returns the disabled array of days specified by props maxDate and minDate
 */
function getDisabledDays(minDate, maxDate, { locale, formats, format }) {
  const days = [];

  if (!minDate && !maxDate) {
    return null;
  }

  if (minDate && checkIsoFormatAndLength(minDate, locale, formats, format)) {
    days.push({ before: DateHelper.stringToDate(minDate) });
  }

  if (maxDate && checkIsoFormatAndLength(maxDate, locale, formats, format)) {
    days.push({ after: DateHelper.stringToDate(maxDate) });
  }

  return days;
}

function checkIsoFormatAndLength(date, locale, formats, format) {
  if (
    date.length !== 10 ||
    !DateHelper.isValidDate({
      value: date,
      options: { defaultValue: "YYYY-MM-DD" },
      locale,
      formats,
      format,
    })
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
