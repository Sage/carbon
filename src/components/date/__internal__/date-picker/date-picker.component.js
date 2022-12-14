import React, { useMemo } from "react";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import { flip, offset } from "@floating-ui/dom";

import { getDisabledDays } from "../utils";
import Popover from "../../../../__internal__/popover";
import useLocale from "../../../../hooks/__internal__/useLocale";
import Navbar from "../navbar";
import Weekday from "../weekday";
import StyledDayPicker from "./day-picker.style";
import Events from "../../../../__internal__/utils/helpers/events";
import { defaultFocusableSelectors } from "../../../../__internal__/focus-trap/focus-trap-utils";

const popoverMiddleware = [
  offset(3),
  flip({
    fallbackStrategy: "initialPlacement",
  }),
];

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
      open,
      setOpen,
    },
    ref
  ) => {
    const l = useLocale();
    const { localize, options } = l.date.dateFnsLocale();
    const { weekStartsOn } = options;
    const monthsLong = useMemo(
      () =>
        Array.from({ length: 12 }).map((_, i) => {
          const month = localize.month(i);
          return month[0].toUpperCase() + month.slice(1);
        }),
      [localize]
    );
    const monthsShort = useMemo(
      () =>
        Array.from({ length: 12 }).map((_, i) =>
          localize.month(i, { width: "abbreviated" }).substring(0, 3)
        ),
      [localize]
    );
    const weekdaysLong = useMemo(
      () => Array.from({ length: 7 }).map((_, i) => localize.day(i)),
      [localize]
    );
    const weekdaysShort = useMemo(
      () =>
        Array.from({ length: 7 }).map((_, i) =>
          localize
            .day(
              i,
              ["de", "pl"].filter((str) => l.locale().includes(str)).length
                ? { width: "wide" }
                : { width: "abbreviated" }
            )
            .substring(0, 3)
        ),
      [l, localize]
    );

    const handleDayClick = (date, { disabled }, ev) => {
      if (!disabled) {
        const { id, name } = inputElement?.current?.firstChild;
        ev.target = {
          ...ev.target,
          id,
          name,
        };
        onDayClick(date, ev);
      }
    };

    const formatDay = (date) =>
      `${weekdaysShort[date.getDay()]} ${date.getDate()} ${
        monthsShort[date.getMonth()]
      } ${date.getFullYear()}`;

    if (!open) {
      return null;
    }

    return (
      <Popover
        placement="bottom-start"
        reference={inputElement}
        middleware={popoverMiddleware}
        disablePortal={disablePortal}
      >
        <StyledDayPicker
          onKeyDown={(ev) => {
            if (Events.isEscKey(ev)) {
              inputElement.current?.querySelector("input")?.focus();
            }

            if (
              ref.current?.querySelector(".DayPicker-wrapper") ===
                document.activeElement &&
              Events.isTabKey(ev) &&
              Events.isShiftKey(ev)
            ) {
              ev.preventDefault();
              inputElement.current?.querySelector("input")?.focus();
            }
          }}
          ref={ref}
          tabIndex={-1}
          onMouseDown={pickerMouseDown}
        >
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
            fixedWeeks
            initialMonth={selectedDays || undefined}
            disabledDays={getDisabledDays(minDate, maxDate)}
            inline
            locale={l.locale()}
            localeUtils={{ formatDay }}
            onDayKeyDown={(_, __, ev) => {
              if (Events.isTabKey(ev) && !Events.isShiftKey(ev)) {
                ev.preventDefault();

                const elements = Array.from(
                  document.querySelectorAll(defaultFocusableSelectors)
                ).filter((el) => Number(el.tabIndex) !== -1);

                const inputIndex = elements.indexOf(
                  inputElement.current?.querySelector("input")
                );

                // // timeout enforces that the "hide" method will be run after browser focuses on the next element
                setTimeout(() => setOpen(false), 0);
                elements[inputIndex + 1]?.focus();
              }
            }}
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
  /** Sets whether the picker should be displayed */
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default DatePicker;
