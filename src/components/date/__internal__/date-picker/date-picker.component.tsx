import { flip, offset } from "@floating-ui/dom";
import React, {
  useCallback,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
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

import StyledDayPicker from "./day-picker.style";

type CustomRefObject<T> = {
  current?: T | null;
};

export interface PickerProps
  extends Omit<
    DayPickerProps,
    "mode" | "disabledDays" | "modifiers" | "selectedDays"
  > {
  disabledDays?: NonNullable<Date> | NonNullable<Date>[] | undefined[];
  modifiers?: Partial<Modifiers>;
  selectedDays?: NonNullable<Date> | NonNullable<Date>[] | undefined[];
}

export interface DatePickerProps {
  /** Boolean to toggle where DatePicker is rendered in relation to the Date Input */
  disablePortal?: boolean;
  /** Minimum possible date YYYY-MM-DD */
  minDate?: string;
  /** Maximum possible date YYYY-MM-DD */
  maxDate?: string;
  /** Pass any props that match the DayPickerProps interface to override default behaviors */
  pickerProps?: PickerProps;
  /** Element that the DatePicker will be displayed under */
  inputElement: CustomRefObject<HTMLElement>;
  /** Currently selected date */
  selectedDays?: Date | undefined;
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

export const DatePicker = ({
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
  pickerTabGuardId,
  onPickerClose,
  ariaLabel: datePickerAriaLabel,
  ariaLabelledBy: datePickerAriaLabelledBy,
}: DatePickerProps) => {
  const [focusedMonth, setFocusedMonth] = useState<Date | undefined>(
    selectedDays || new Date(),
  );
  const locale = useLocale();
  const { localize, options } = locale.date.dateFnsLocale();
  const { weekStartsOn } = options || /* istanbul ignore next */ {};
  const monthsLong = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => {
        const month = localize?.month(i);
        return month[0].toUpperCase() + month.slice(1);
      }),
    [localize],
  );
  const weekdaysLong = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => localize?.day(i)),
    [localize],
  );
  const weekdaysShort = useMemo(() => {
    const isGivenLocale = (str: string) => locale.locale().includes(str);
    return Array.from({ length: 7 }).map((_, i) =>
      localize
        ?.day(
          i,
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
        setFocusedMonth(selectedDays);
        inputElement.current?.querySelector("input")?.focus();
        setOpen(false);
        onPickerClose?.();
        ev.stopPropagation();
      }
    },
    [inputElement, onPickerClose, open, selectedDays, setOpen],
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
          (el) => Number(el.tabIndex) !== -1 && !elementsInPicker.includes(el),
        );
        const nextIndex = filteredElements.indexOf(input as HTMLElement) + 1;
        filteredElements[nextIndex]?.focus();
      }
    }
  };

  useEffect(() => {
    if (selectedDays) {
      setFocusedMonth(selectedDays);
    }
  }, [selectedDays]);

  useEffect(() => {
    if (!open && selectedDays) {
      const fMonth = focusedMonth?.getMonth();
      const sMonth = selectedDays?.getMonth();
      if (fMonth !== sMonth) setFocusedMonth(selectedDays);
    }
  }, [focusedMonth, open, selectedDays]);

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
                `${localize?.month(month.getMonth())} ${month.getFullYear()}`,
            }}
            required={false}
            weekStartsOn={weekStartsOn}
            onMonthChange={setFocusedMonth}
            disabled={getDisabledDays(minDate, maxDate)}
            locale={{
              localize: {
                ...defaultLocale.localize,
                months: monthsLong,
                weekdaysLong,
                weekdaysShort,
              },
            }}
            selected={focusedMonth}
            month={focusedMonth || /* istanbul ignore next */ new Date()}
            onDayClick={(d, _, e) => {
              const date = d as Date;
              handleDayClick(date, e);
            }}
            components={{
              Nav: (props) => {
                return <Navbar {...props} />;
              },
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
            mode="single"
          />
        </StyledDayPicker>
      </Popover>
    </>
  );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;
