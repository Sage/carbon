import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import {
  additionalYears,
  findMatchedFormatAndValue,
  formattedValue,
  formatToISO,
  isDateValid,
  parseDate,
  parseISODate,
  checkISOFormatAndLength,
  getSeparator,
} from "./__internal__/utils";
import useLocale from "../../hooks/__internal__/useLocale";
import Events from "../../__internal__/utils/helpers/events";
import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import getFormatData from "./__internal__/date-formats";
import StyledDateInput from "./date.style";
import Textbox from "../textbox";
import DatePicker from "./__internal__/date-picker";
import DateRangeContext from "../date-range/date-range.context";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const DateInput = ({
  adaptiveLabelBreakpoint,
  allowEmptyValue,
  autoFocus,
  "data-component": dataComponent,
  "data-element": dataElement,
  "data-role": dataRole,
  disabled,
  disablePortal = false,
  helpAriaLabel,
  labelInline,
  minDate,
  maxDate,
  onBlur,
  onChange,
  onClick,
  onFocus,
  onKeyDown,
  pickerProps = {},
  readOnly,
  size = "medium",
  tooltipPosition,
  value,
  ...rest
}) => {
  const wrapperRef = useRef();
  const parentRef = useRef();
  const inputRef = useRef();
  const pickerRef = useRef();
  const alreadyFocused = useRef(false);
  const isBlurBlocked = useRef(false);
  const focusedViaPicker = useRef(false);
  const l = useLocale();
  const { dateFnsLocale } = l.date;
  const { format, formats } = useMemo(
    () => getFormatData(dateFnsLocale()),
    [dateFnsLocale]
  );
  const { inputRefMap, setInputRefMap } = useContext(DateRangeContext);
  const inputName = dataElement?.split("-")[0];
  const [open, setOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState(
    checkISOFormatAndLength(value)
      ? parseISODate(value)
      : parseDate(format, value)
  );
  const isInitialValue = useRef(true);

  const computeInvalidRawValue = (inputValue) =>
    allowEmptyValue && !inputValue.length ? inputValue : null;

  const buildCustomEvent = (ev) => {
    const { id, name } = ev.target;

    const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
      ev.target.value,
      formats
    );

    const formattedValueString =
      ev.type === "blur"
        ? formattedValue(format, selectedDays)
        : ev.target.value;
    const rawValue = isDateValid(parseDate(matchedFormat, matchedValue))
      ? formatToISO(matchedFormat, matchedValue)
      : computeInvalidRawValue(ev.target.value);

    ev.target = {
      ...(name && { name }),
      ...(id && { id }),
      value: {
        formattedValue: formattedValueString,
        rawValue,
      },
    };

    return ev;
  };

  const handleChange = (ev) => {
    isInitialValue.current = false;
    onChange(buildCustomEvent(ev));
  };

  const focusInput = () => {
    focusedViaPicker.current = true;
    inputRef.current?.focus();
  };

  const handleDayClick = (day, ev) => {
    setSelectedDays(day);
    onChange(
      buildCustomEvent({
        ...ev,
        target: {
          ...ev.target,
          value: formattedValue(format, day),
        },
      })
    );
    focusInput();
    setOpen(false);
  };

  const handleBlur = (ev) => {
    if (disabled || readOnly) {
      return;
    }

    let event;

    if (isDateValid(selectedDays)) {
      event = buildCustomEvent(ev);

      if (formattedValue(format, selectedDays) !== value) {
        onChange(event);
      }
    } else {
      const { id, name } = ev.target;

      ev.target = {
        ...(name && { name }),
        ...(id && { id }),
        value: {
          formattedValue: ev.target.value,
          rawValue: computeInvalidRawValue(ev.target.value),
        },
      };

      event = ev;
    }

    if (isBlurBlocked.current) {
      return;
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleFocus = (ev) => {
    if (disabled || readOnly) {
      return;
    }

    isBlurBlocked.current = false;

    if (!open && !alreadyFocused.current) {
      setOpen(true);
    } else {
      alreadyFocused.current = false;
    }

    if (onFocus) {
      onFocus(ev);
    }
  };

  const handleKeyDown = (ev) => {
    if (onKeyDown) {
      onKeyDown(ev);
    }

    if (Events.isTabKey(ev)) {
      setOpen(false);
      alreadyFocused.current = false;
    }
  };

  const handleClick = (ev) => {
    if (disabled || readOnly) {
      return;
    }

    if (onClick) {
      onClick(ev);
    }
  };

  const handleMouseDown = (ev) => {
    if (disabled || readOnly) {
      return;
    }

    isBlurBlocked.current = true;

    if (ev.target.type === "text" && !open) {
      setOpen(true);
    } else if (ev.target.type !== "text") {
      alreadyFocused.current = true;
      setOpen((prev) => !prev);
    }
  };

  const handlePickerMouseDown = () => {
    isBlurBlocked.current = true;
  };

  const assignInput = (input) => {
    inputRef.current = input.current;
    parentRef.current = input.current.parentElement;

    if (inputRefMap && inputRefMap[inputName]?.setOpen !== setOpen) {
      setInputRefMap({
        [inputName]: { isBlurBlocked, setOpen },
      });
    }
  };

  useEffect(() => {
    const fnClosePicker = (ev) => {
      if (
        open &&
        !Events.composedPath(ev).includes(parentRef.current) &&
        !Events.composedPath(ev).includes(pickerRef.current)
      ) {
        alreadyFocused.current = true;
        inputRef.current.focus();
        isBlurBlocked.current = false;
        inputRef.current.blur();
        setOpen(false);
        alreadyFocused.current = false;
      }
    };

    document.addEventListener("mousedown", fnClosePicker);

    return function cleanup() {
      document.removeEventListener("mousedown", fnClosePicker);
    };
  }, [open]);

  useEffect(() => {
    const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
      value,
      formats
    );

    if (
      matchedFormat &&
      matchedValue &&
      isDateValid(parseDate(matchedFormat, matchedValue))
    ) {
      setSelectedDays(
        parseDate(...additionalYears(matchedFormat, matchedValue))
      );
    } else if (checkISOFormatAndLength(value)) {
      setSelectedDays(parseISODate(value));
    } else {
      setSelectedDays(undefined);
    }
  }, [value, formats]);

  const computedValue = () => {
    if (checkISOFormatAndLength(value)) {
      return formattedValue(format, parseISODate(value));
    }

    const valueSeparator = getSeparator(value);
    const formatSeparator = getSeparator(format);
    const replaceSeparators = () =>
      value
        .split("")
        .map((char) => (char === valueSeparator ? formatSeparator : char))
        .join("");

    if (
      isInitialValue.current &&
      valueSeparator !== formatSeparator &&
      isDateValid(parseDate(format, replaceSeparators()))
    ) {
      const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
        replaceSeparators(),
        formats
      );
      return formattedValue(
        format,
        parseDate(...additionalYears(matchedFormat, matchedValue))
      );
    }

    return value;
  };

  return (
    <StyledDateInput
      ref={wrapperRef}
      role="presentation"
      size={size}
      labelInline={labelInline}
      data-component={dataComponent || "date"}
      data-element={dataElement}
      data-role={dataRole}
      {...filterStyledSystemMarginProps(rest)}
    >
      <Textbox
        {...filterOutStyledSystemSpacingProps(rest)}
        value={computedValue()}
        onBlur={handleBlur}
        onChange={handleChange}
        onClick={handleClick}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        iconOnClick={handleClick}
        onMouseDown={handleMouseDown}
        iconOnMouseDown={handleMouseDown}
        inputIcon="calendar"
        labelInline={labelInline}
        inputRef={assignInput}
        adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
        tooltipPosition={tooltipPosition}
        helpAriaLabel={helpAriaLabel}
        autoFocus={autoFocus}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
      />
      {open && (
        <DatePicker
          disablePortal={disablePortal}
          inputElement={parentRef}
          pickerProps={pickerProps}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          onDayClick={handleDayClick}
          minDate={minDate}
          maxDate={maxDate}
          ref={pickerRef}
          pickerMouseDown={handlePickerMouseDown}
        />
      )}
    </StyledDateInput>
  );
};

DateInput.propTypes = {
  ...Textbox.propTypes,
  ...marginPropTypes,
  /** Pass any props that match the [DayPickerProps](https://react-day-picker.js.org/api/DayPicker)
   * interface to override default behaviors
   * */
  pickerProps: PropTypes.object,
  /** Boolean to toggle where DatePicker is rendered in relation to the Date Input */
  disablePortal: PropTypes.bool,
  /** Minimum possible date YYYY-MM-DD */
  minDate: PropTypes.string,
  /** Maximum possible date YYYY-MM-DD */
  maxDate: PropTypes.string,
  /** Specify a callback triggered on change */
  onChange: PropTypes.func.isRequired,
  /** The current date string */
  value: PropTypes.string.isRequired,
  /** Boolean to allow the input to have an empty value */
  allowEmptyValue: PropTypes.bool,
};

export default DateInput;
