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
  /** Screen-reader status text for selected range updates. */
  rangeStatusText?: string;
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
  /** Element to focus when the picker closes */
  returnFocusElement?: RefObject<HTMLElement>;
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
  /** Id applied to the picker dialog */
  pickerId?: string;
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

let deprecateDisablePortalWarnTriggered = false;

const defaultYearRange = () => {
  const currentYear = new Date().getFullYear();

  return {
    end: currentYear + 10,
    start: currentYear - 10,
  };
};

const getYears = ({ start, end }: DatePickerYearRange) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

const focusWithoutDayPickerFocusEvent = (dayButton: HTMLElement) => {
  // DayPicker listens for focusin events internally and resets its focus state
  // when one fires. Blocking the first focusin prevents that reset when we
  // programmatically focus a day; the DOM focus moves, but DayPicker stays calm.
  const stopInitialFocusPropagation = (ev: FocusEvent) => {
    ev.stopPropagation();
  };

  dayButton.addEventListener("focusin", stopInitialFocusPropagation, {
    capture: true,
    once: true,
  });
  dayButton.focus();
};

const focusSelectedTodayOrFirstAvailableDay = (container: HTMLElement) => {
  const dayButton = [
    '[data-selected="true"] button:not(:disabled)',
    '[data-today="true"] button:not(:disabled)',
    ".rdp-day:not(.rdp-outside) button:not(:disabled)",
  ].reduce<HTMLElement | null>(
    (match, selector) =>
      match || container.querySelector<HTMLElement>(selector),
    null,
  );

  if (dayButton) {
    focusWithoutDayPickerFocusEvent(dayButton);
  }
};

const focusFirstAvailableDay = (container: HTMLElement) => {
  const dayButton = container.querySelector<HTMLElement>(
    ".rdp-day:not(.rdp-outside) button:not(:disabled)",
  );

  if (dayButton) {
    focusWithoutDayPickerFocusEvent(dayButton);
  }
};

export const DatePicker = ({
  inputElement,
  minDate,
  maxDate,
  selectedDays,
  selectedRange,
  pickerMode = "single",
  focusedMonth: focusedMonthProp,
  onFocusedMonthChange,
  labels,
  yearRange,
  onSelectDates,
  rangeStatusText,
  disablePortal = true,
  returnFocusElement,
  onDayClick,
  pickerMouseDown,
  pickerProps,
  open,
  setOpen,
  pickerTabGuardId,
  pickerId = "styled-day-picker",
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
  // Set to true by handleMonthChange / handleYearChange so the post-nav
  // effect knows to focus the first available day instead of the initial-open
  // effect doing it.
  const pendingFocusAfterNavChange = useRef(false);
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
  const months = useMemo(
    () =>
      Array.from(
        { length: 12 },
        (_, index) =>
          localize?.month(index as Month, { width: "wide" }) ||
          String(index + 1),
      ),
    [localize],
  );
  const years = useMemo(
    () => getYears(yearRange || defaultYearRange()),
    [yearRange],
  );
  const ref = useRef<HTMLDivElement>(null);
  const focusReturnElement = useCallback(() => {
    const fallbackInput = inputElement.current?.querySelector("input");

    (returnFocusElement?.current || fallbackInput)?.focus();
  }, [inputElement, returnFocusElement]);

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
        // Reset the calendar to the active selection so it re-opens at the
        // right place: the selected date in single mode, or the range start
        // date in range mode.
        setFocusedMonth(selectedDays ?? selectedRange?.startDate);
        focusReturnElement();
        setOpen(false);
        onPickerClose?.();
        ev.stopPropagation();
      }
    },
    [
      focusReturnElement,
      onPickerClose,
      open,
      selectedDays,
      selectedRange?.startDate,
      setFocusedMonth,
      setOpen,
    ],
  );

  // Shift+Tab from the month select (the first focusable element in the picker)
  // closes the picker and returns focus to the trigger/input.
  // This is the sole Shift+Tab handler for the nav; there is no container-level
  // duplicate so setOpen/focusReturnElement are called exactly once.
  const handleMonthKeyDown = (ev: React.KeyboardEvent<HTMLSelectElement>) => {
    if (Events.isTabKey(ev) && Events.isShiftKey(ev)) {
      ev.preventDefault();
      setOpen(false);
      onPickerClose?.();
      focusReturnElement();
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
        if (pickerMode === "range") {
          ev.preventDefault();
          ref.current
            ?.querySelector<HTMLElement>(
              '[data-role="date-picker-select-dates-button"]',
            )
            ?.focus();
          return;
        }

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
            ref.current?.querySelectorAll("button, select, [tabindex]") ||
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
    // When the picker closes, re-sync the focused month if it drifted from the
    // active selection (e.g. the user navigated months without confirming).
    // Covers both single mode (selectedDays) and range mode (selectedRange.startDate).
    const anchor = selectedDays ?? selectedRange?.startDate;
    if (!open && anchor) {
      // Compare both month AND year; same month in a different year is still a drift.
      if (
        focusedMonth?.getMonth() !== anchor.getMonth() ||
        focusedMonth?.getFullYear() !== anchor.getFullYear()
      ) {
        setFocusedMonth(anchor);
      }
    }
  }, [
    focusedMonth,
    open,
    selectedDays,
    selectedRange?.startDate,
    setFocusedMonth,
  ]);

  useEffect(() => {
    // After the user changes the month or year via the select controls, move
    // focus to the first available day in the newly displayed month.
    if (!open || !pendingFocusAfterNavChange.current || !ref.current) return;

    pendingFocusAfterNavChange.current = false;
    focusFirstAvailableDay(ref.current);
  }, [focusedMonth, open]);

  useEffect(() => {
    // On initial open (no pending nav change), focus the first available day.
    if (!open || pendingFocusAfterNavChange.current || !ref.current) return;

    focusSelectedTodayOrFirstAvailableDay(ref.current);
  }, [open]);

  if (!open) {
    return null;
  }

  const handleTabGuardFocus = () => {
    ref.current?.querySelector<HTMLElement>("select, button")?.focus();
  };

  const handleMonthChange = (month: number) => {
    const previousMonth = focusedMonth || new Date();
    pendingFocusAfterNavChange.current = true;
    setFocusedMonth(new Date(previousMonth.getFullYear(), month, 1));
  };

  const handleYearChange = (year: number) => {
    const previousMonth = focusedMonth || new Date();
    pendingFocusAfterNavChange.current = true;
    setFocusedMonth(new Date(year, previousMonth.getMonth(), 1));
  };

  const handleSelectDates = () => {
    onSelectDates?.();
    setOpen(false);
    onPickerClose?.();
    focusReturnElement();
  };

  const isRangePicker = pickerMode === "range";

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
          id={pickerId}
          data-role="date-picker"
          ref={ref}
          onMouseDown={pickerMouseDown}
          onKeyUp={handleKeyUp}
          role="dialog"
          aria-modal="true"
          aria-label={datePickerAriaLabel}
          aria-labelledby={datePickerAriaLabelledBy}
        >
          <div
            data-role="date-picker-tab-guard"
            data-testid="date-picker-tab-guard"
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
              Nav: ({ className }) => (
                <Navbar
                  className={className}
                  labels={labels}
                  months={months}
                  onMonthChange={handleMonthChange}
                  onMonthKeyDown={handleMonthKeyDown}
                  onYearChange={handleYearChange}
                  selectedMonth={focusedMonth?.getMonth()}
                  selectedYear={focusedMonth?.getFullYear()}
                  years={years}
                />
              ),
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
            // TODO: wire DayPicker range selection when the DateRange picker uses one shared calendar.
            mode="single"
          />
          {isRangePicker && (
            <>
              <div
                aria-live="polite"
                data-role="date-picker-range-status"
                role="status"
              >
                {rangeStatusText}
              </div>
              <button
                data-role="date-picker-select-dates-button"
                onClick={handleSelectDates}
                type="button"
              >
                {labels?.selectDatesButton || "Select dates"}
              </button>
            </>
          )}
        </StyledDayPicker>
      </Popover>
    </>
  );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;
