import { flip, offset } from "@floating-ui/dom";
import type { Day, Month } from "date-fns";
import React, {
  useCallback,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
  RefObject,
} from "react";
import {
  DayPicker,
  DayPickerProps,
  defaultLocale,
  Modifiers,
} from "react-day-picker";

import useLocale from "../../../../hooks/__internal__/useLocale";
import Popover from "../../../../__internal__/popover";
import Navbar from "../navbar";
import Weekday from "../weekday";
import { getDisabledDays } from "../utils";
import { defaultFocusableSelectors } from "../../../../__internal__/focus-trap/focus-trap-utils";
import Events from "../../../../__internal__/utils/helpers/events";
import FlatTableContext from "../../../flat-table/__internal__/flat-table.context";
import Logger from "../../../../__internal__/utils/logger";

import StyledDayPicker from "./day-picker.style";

export interface PickerProps
  extends Omit<DayPickerProps, "mode" | "modifiers"> {
  modifiers?: Partial<Modifiers>;
}

export type DatePickerMode = "single" | "range";

export interface DatePickerLabels {
  closeButton?: string;
  monthSelect?: string;
  selectDatesButton?: string;
  yearSelect?: string;
}

export interface DatePickerYearRange {
  end: number;
  start: number;
}

export interface DateRangeSelection {
  startDate?: Date;
  endDate?: Date;
}

export interface SharedDatePickerProps {
  /** Selection mode to support single date and date range flows. */
  pickerMode?: DatePickerMode;
  /** Currently focused calendar month. */
  focusedMonth?: Date;
  /** Callback triggered when the focused calendar month changes. */
  onFocusedMonthChange?: (month: Date | undefined) => void;
  /** Currently selected date for single date mode. */
  selectedDays?: Date | undefined;
  /** Currently selected date range for date range mode. */
  selectedRange?: DateRangeSelection;
  /** Accessible labels for internal calendar controls. */
  labels?: DatePickerLabels;
  /** Available year range for the calendar year selector. */
  yearRange?: DatePickerYearRange;
  /** Callback triggered when the select-dates action is used in range mode. */
  onSelectDates?: () => void;
}

export interface DatePickerProps extends SharedDatePickerProps {
  /**
   * [Legacy] Boolean to toggle where DatePicker is rendered in relation to the Date Input
   * @deprecated
   */
  disablePortal?: boolean;
  /** Minimum possible date YYYY-MM-DD */
  minDate?: string;
  /** Maximum possible date YYYY-MM-DD */
  maxDate?: string;
  /**
   * Pass any props that match the DayPickerProps interface to override default behaviors
   * See [DayPickerProps](https://daypicker.dev/api/type-aliases/DayPickerProps) for a full list of available props
   * */
  pickerProps?: PickerProps;
  /** Element that the DatePicker will be displayed under */
  inputElement: RefObject<HTMLElement>;
  /** Callback to handle mousedown event on picker container */
  pickerMouseDown?: () => void;
  /** Sets whether the picker should be displayed */
  open?: boolean;
  /** Callback triggered when a Day is clicked */
  onDayClick?: (date: Date, ev: React.MouseEvent<HTMLDivElement>) => void;
  /** Sets the picker open state */
  setOpen: (isOpen: boolean) => void;
  /** Id passed to tab guard element */
  pickerTabGuardId?: string;
  /** Callback triggered when the picker is closed */
  onPickerClose?: () => void;
  /** Prop to specify the aria-label attribute of the date picker */
  ariaLabel?: string;
  /** Prop to specify the aria-labelledby attribute of the date picker */
  ariaLabelledBy?: string;
}

const popoverMiddleware = [
  offset(3),
  flip({
    fallbackStrategy: "initialPlacement",
  }),
];

const Nav = Navbar;
let deprecateDisablePortalWarnTriggered = false;

export const DatePicker = ({
  inputElement,
  minDate,
  maxDate,
  selectedDays,
  selectedRange,
  focusedMonth: focusedMonthProp,
  onFocusedMonthChange,
  disablePortal = true,
  onDayClick,
  pickerMouseDown,
  pickerProps,
  open,
  setOpen,
  pickerTabGuardId,
  onPickerClose,
  ariaLabel: datePickerAriaLabel,
  ariaLabelledBy: datePickerAriaLabelledBy,
}: DatePickerProps) => {
  if (!deprecateDisablePortalWarnTriggered && !!disablePortal) {
    deprecateDisablePortalWarnTriggered = true;
    Logger.deprecate(
      "`disablePortal` is deprecated in DateInput and DateRange, and support will soon be removed.",
    );
  }

  const [uncontrolledFocusedMonth, setUncontrolledFocusedMonth] = useState<
    Date | undefined
  >(selectedDays || selectedRange?.startDate || new Date());
  const focusedMonth = focusedMonthProp || uncontrolledFocusedMonth;
  const setFocusedMonth = useCallback(
    (month: Date | undefined) => {
      if (!focusedMonthProp) {
        setUncontrolledFocusedMonth(month);
      }
      onFocusedMonthChange?.(month);
    },
    [focusedMonthProp, onFocusedMonthChange],
  );
  const locale = useLocale();
  const { localize, options } = locale.date.dateFnsLocale();
  const { weekStartsOn } = options || /* istanbul ignore next */ {};
  const weekdaysLong = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => localize?.day(i as Day)),
    [localize],
  );
  const weekdaysShort = useMemo(() => {
    const isGivenLocale = (str: string) => locale.locale().includes(str);
    return Array.from({ length: 7 }).map((_, i) =>
      localize
        ?.day(
          i as Day,
          ["de", "pl"].some(isGivenLocale)
            ? { width: "wide" }
            : { width: "abbreviated" },
        )
        .substring(0, isGivenLocale("de") ? 2 : 3),
    );
  }, [locale, localize]);
  const ref = useRef<HTMLDivElement>(null);

  const handleDayClick = (
    date?: Date,
    e?: React.MouseEvent<Element, MouseEvent>,
  ) => {
    /* istanbul ignore else */
    if (date) onDayClick?.(date, e as React.MouseEvent<HTMLDivElement>);
    onPickerClose?.();
  };

  const handleKeyUp = useCallback(
    (ev: KeyboardEvent) => {
      /* istanbul ignore else */
      if (open && Events.isEscKey(ev)) {
        // resets the focused month to the currently selected single date on Esc
        // TODO: in range mode selectedDays will be undefined, causing the focused month
        // to fall back to the current date - when range mode is wired up this should
        // reset to selectedRange.startDate instead
        setFocusedMonth(selectedDays);
        inputElement.current?.querySelector("input")?.focus();
        setOpen(false);
        onPickerClose?.();
        ev.stopPropagation();
      }
    },
    [inputElement, onPickerClose, open, selectedDays, setFocusedMonth, setOpen],
  );

  const handleOnKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    /* istanbul ignore else */
    if (
      ref.current?.querySelector(".rdp-nav button") ===
        document.activeElement &&
      Events.isTabKey(ev) &&
      Events.isShiftKey(ev)
    ) {
      ev.preventDefault();
      setOpen(false);
      onPickerClose?.();
      inputElement.current?.querySelector("input")?.focus();
    }
  };

  const handleOnDayKeyDown = (
    _day: Date,
    _modifiers: Modifiers,
    ev: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    // timeout added to prevent this handler from interfering with the useFocusPortalContent hook, when the date-range
    // is used inside of a popover-container and it is the last focusable element of the popover-container
    setTimeout(() => {
      // we need to manually handle this as the picker may be in a Portal
      /* istanbul ignore else */
      if (Events.isTabKey(ev) && !Events.isShiftKey(ev)) {
        ev.preventDefault();
        setOpen(false);
        onPickerClose?.();
        const input = inputElement.current?.querySelector("input");

        /* istanbul ignore else */
        if (input) {
          const elements = Array.from(
            document.querySelectorAll(defaultFocusableSelectors) ||
              /* istanbul ignore next */ [],
          ) as HTMLElement[];
          const elementsInPicker = Array.from(
            ref.current?.querySelectorAll("button, [tabindex]") ||
              /* istanbul ignore next */ [],
          ) as HTMLElement[];
          const filteredElements = elements.filter(
            (el) =>
              Number(el.tabIndex) !== -1 && !elementsInPicker.includes(el),
          );
          const nextIndex = filteredElements.indexOf(input as HTMLElement) + 1;
          filteredElements[nextIndex]?.focus();
        }
      }
    }, 0);
  };

  const { isInFlatTable, setHasOpenDatePicker } = useContext(FlatTableContext);

  useEffect(() => {
    setHasOpenDatePicker?.(!!open);
  }, [open, setHasOpenDatePicker]);

  useEffect(() => {
    if (selectedDays) {
      setFocusedMonth(selectedDays);
    } else if (selectedRange?.startDate) {
      setFocusedMonth(selectedRange.startDate);
    }
  }, [selectedDays, selectedRange?.startDate, setFocusedMonth]);

  useEffect(() => {
    // when the picker closes, re-sync the focused month if it has drifted from the
    // selected single date (e.g. the user navigated months without confirming a selection)
    // TODO: in range mode selectedDays is undefined so this effect is a no-op -
    // when range mode is wired up, selectedRange.startDate should be used here too,
    // consistent with the selection-change effect above
    if (!open && selectedDays) {
      const fMonth = focusedMonth?.getMonth();
      const sMonth = selectedDays?.getMonth();
      if (fMonth !== sMonth) setFocusedMonth(selectedDays);
    }
  }, [focusedMonth, open, selectedDays, setFocusedMonth]);

  if (!open) {
    return null;
  }

  const handleTabGuardFocus = () => {
    ref.current?.querySelector("button")?.focus();
  };

  return (
    <>
      <Popover
        placement="bottom-start"
        reference={inputElement}
        middleware={popoverMiddleware}
        disablePortal={disablePortal}
        disableBackgroundUI={isInFlatTable}
        popoverStrategy="fixed"
      >
        <StyledDayPicker
          id="styled-day-picker"
          data-role="date-picker"
          ref={ref}
          onMouseDown={pickerMouseDown}
          onKeyUp={handleKeyUp}
          onKeyDown={handleOnKeyDown}
          role="region"
          aria-label={datePickerAriaLabel}
          aria-labelledby={datePickerAriaLabelledBy}
        >
          <div
            id={pickerTabGuardId}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            onFocus={handleTabGuardFocus}
          />
          <DayPicker
            formatters={{
              formatCaption: (month) =>
                `${localize?.month(month.getMonth() as Month)} ${month.getFullYear()}`,
            }}
            required={false}
            weekStartsOn={weekStartsOn}
            onMonthChange={setFocusedMonth}
            disabled={getDisabledDays(minDate, maxDate)}
            locale={{
              localize: {
                ...defaultLocale.localize,
              },
            }}
            selected={selectedDays}
            month={focusedMonth || /* istanbul ignore next */ new Date()}
            onDayClick={(d, _, e) => {
              const date = d as Date;
              handleDayClick(date, e);
            }}
            components={{
              Nav,
              Weekday: (props) => {
                const fixedDays = {
                  Sunday: 0,
                  Monday: 1,
                  Tuesday: 2,
                  Wednesday: 3,
                  Thursday: 4,
                  Friday: 5,
                  Saturday: 6,
                };
                const { className, "aria-label": ariaLabel } = props;
                const dayIndex = fixedDays[ariaLabel as keyof typeof fixedDays];

                return (
                  <Weekday className={className} title={weekdaysLong[dayIndex]}>
                    {weekdaysShort[dayIndex]}
                  </Weekday>
                );
              },
            }}
            fixedWeeks
            defaultMonth={selectedDays || undefined}
            onDayKeyDown={(date, modifiers, e) => {
              handleOnDayKeyDown(
                date,
                modifiers,
                e as React.KeyboardEvent<HTMLDivElement>,
              );
            }}
            {...pickerProps}
            showOutsideDays
            // TODO: wire pickerMode - currently hardcoded; update when range mode is implemented
            mode="single"
          />
        </StyledDayPicker>
      </Popover>
    </>
  );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;
