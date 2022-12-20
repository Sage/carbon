import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
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
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import Logger from "../../__internal__/utils/logger";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

let deprecateInputRefWarnTriggered = false;

const DateInput = React.forwardRef(
  (
    {
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
      inputRef,
      ...rest
    },
    ref
  ) => {
    const wrapperRef = useRef();
    const parentRef = useRef();
    const internalInputRef = useRef();
    const alreadyFocused = useRef(false);
    const isBlurBlocked = useRef(false);
    const focusedViaPicker = useRef(false);
    const l = useLocale();
    const { dateFnsLocale } = l.date;
    const { format, formats } = useMemo(() => getFormatData(dateFnsLocale()), [
      dateFnsLocale,
    ]);
    const { inputRefMap, setInputRefMap } = useContext(DateRangeContext);
    const inputName = dataElement?.split("-")[0];
    const [open, setOpen] = useState(false);
    const [selectedDays, setSelectedDays] = useState(
      checkISOFormatAndLength(value)
        ? parseISODate(value)
        : parseDate(format, value)
    );
    const isInitialValue = useRef(true);

    if (!deprecateInputRefWarnTriggered && inputRef) {
      deprecateInputRefWarnTriggered = true;
      Logger.deprecate(
        "The `inputRef` prop in `DateInput` component is deprecated and will soon be removed. Please use `ref` instead."
      );
    }

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
        ? formatToISO(...additionalYears(matchedFormat, matchedValue))
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

    const handleClickAway = () => {
      if (open) {
        alreadyFocused.current = true;
        internalInputRef.current.focus();
        isBlurBlocked.current = false;
        internalInputRef.current.blur();
        setOpen(false);
        alreadyFocused.current = false;
      }
    };

    const handleClickInside = useClickAwayListener(
      handleClickAway,
      "mousedown"
    );

    const handleChange = (ev) => {
      isInitialValue.current = false;
      onChange(buildCustomEvent(ev));
    };

    const focusInput = () => {
      focusedViaPicker.current = true;
      internalInputRef.current?.focus();
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

        const currentValue = checkISOFormatAndLength(value)
          ? formattedValue(format, parseISODate(value))
          : value;
        const [, matchedValue] = findMatchedFormatAndValue(
          currentValue,
          formats
        );

        if (formattedValue(format, selectedDays) !== matchedValue) {
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
      handleClickInside(ev);

      if (disabled || readOnly) {
        return;
      }

      if (setInputRefMap) {
        isBlurBlocked.current = true;
      }

      if (ev.target.type === "text" && !open) {
        setOpen(true);
      } else if (ev.target.type !== "text") {
        alreadyFocused.current = true;
        setOpen((prev) => !prev);
      }
    };

    const handleIconMouseDown = (e) => {
      isBlurBlocked.current = true;
      handleMouseDown(e);
    };

    const handlePickerMouseDown = (ev) => {
      isBlurBlocked.current = true;
      handleClickInside(ev);
    };

    const assignInput = useCallback(
      (inputElement) => {
        internalInputRef.current = inputElement;
        parentRef.current = inputElement?.parentElement;

        if (ref) {
          if (typeof ref === "function") {
            ref(inputElement);
          } else {
            ref.current = inputElement;
          }
        }

        if (inputRefMap && inputRefMap[inputName]?.setOpen !== setOpen) {
          setInputRefMap({
            [inputName]: { isBlurBlocked, setOpen },
          });
        }
      },
      [inputName, inputRefMap, setInputRefMap, ref]
    );

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
      } else if (checkISOFormatAndLength(value) && isInitialValue.current) {
        setSelectedDays(parseISODate(value));
      } else {
        setSelectedDays(undefined);
      }
    }, [value, formats]);

    const computedValue = () => {
      if (checkISOFormatAndLength(value) && isInitialValue.current) {
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
        isInitialValue.current = false;

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
        applyDateRangeStyling={!!inputRefMap}
      >
        <Textbox
          {...filterOutStyledSystemSpacingProps(rest)}
          inputRef={inputRef}
          value={computedValue()}
          onBlur={handleBlur}
          onChange={handleChange}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          iconOnClick={handleClick}
          onMouseDown={handleMouseDown}
          iconOnMouseDown={handleIconMouseDown}
          inputIcon="calendar"
          labelInline={labelInline}
          ref={assignInput}
          adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
          tooltipPosition={tooltipPosition}
          helpAriaLabel={helpAriaLabel}
          autoFocus={autoFocus}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
        />
        <DatePicker
          disablePortal={disablePortal}
          inputElement={parentRef}
          pickerProps={pickerProps}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          onDayClick={handleDayClick}
          minDate={minDate}
          maxDate={maxDate}
          pickerMouseDown={handlePickerMouseDown}
          open={open}
        />
      </StyledDateInput>
    );
  }
);

DateInput.propTypes = {
  ...Textbox.propTypes,
  ...marginPropTypes,
  /** Pass any props that match the [DayPickerProps](https://react-day-picker-v7.netlify.app/docs/getting-started/)
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

DateInput.displayName = "DateInput";

export default DateInput;
