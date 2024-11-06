import React, { useCallback, useEffect, useMemo, useRef } from "react";
import DayPicker, {
  DayPickerProps,
  DayModifiers,
  Modifier,
  LocaleUtils,
} from "react-day-picker";
import { flip, offset } from "@floating-ui/dom";

import { getDisabledDays } from "../utils";
import Popover from "../../../../__internal__/popover";
import useLocale from "../../../../hooks/__internal__/useLocale";
import Navbar from "../navbar";
import Weekday from "../weekday";
import StyledDayPicker from "./day-picker.style";
import Events from "../../../../__internal__/utils/helpers/events";
import { defaultFocusableSelectors } from "../../../../__internal__/focus-trap/focus-trap-utils";

type CustomRefObject<T> = {
  current?: T | null;
};

/** there is an issue with typescript-to-proptypes package that means we need to override these types */
interface Modifiers {
  today: NonNullable<Modifier> | NonNullable<Modifier>[];
  outside: NonNullable<Modifier> | NonNullable<Modifier>[];
  [other: string]: NonNullable<Modifier> | NonNullable<Modifier>[];
}

export interface PickerProps
  extends Omit<DayPickerProps, "disabledDays" | "modifiers" | "selectedDays"> {
  disabledDays?: NonNullable<Modifier> | NonNullable<Modifier>[] | undefined[];
  modifiers?: Partial<Modifiers>;
  selectedDays?: NonNullable<Modifier> | NonNullable<Modifier>[] | undefined[];
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
  selectedDays?: Date;
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
}: DatePickerProps) => {
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
  const monthsShort = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) =>
        localize?.month(i, { width: "abbreviated" }).substring(0, 3),
      ),
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

  useEffect(() => {
    if (open) {
      // this is a temporary fix for some axe issues that are baked into the library we use for the picker
      const captionElement = ref.current?.querySelector(".DayPicker-Caption");
      /* istanbul ignore else */
      if (captionElement) {
        captionElement.removeAttribute("role");
        captionElement.removeAttribute("aria-live");
      }

      // focus the selected or today's date first
      const selectedDay =
        ref.current?.querySelector(".DayPicker-Day--selected") ||
        ref.current?.querySelector(".DayPicker-Day--today");
      const firstDay = ref.current?.querySelector(
        ".DayPicker-Day[tabindex='0']",
      );

      /* istanbul ignore else */
      if (selectedDay && firstDay !== selectedDay) {
        selectedDay?.setAttribute("tabindex", "0");
        firstDay?.setAttribute("tabindex", "-1");
      }
    }
  }, [open]);

  const handleDayClick = (
    date: Date,
    modifiers: DayModifiers,
    ev: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!modifiers.disabled) {
      const { id, name } = inputElement?.current
        ?.firstChild as HTMLInputElement;
      ev.target = {
        ...ev.target,
        id,
        name,
      } as HTMLInputElement;
      onDayClick?.(date, ev);
      onPickerClose?.();
    }
  };

  const handleKeyUp = useCallback(
    (ev) => {
      /* istanbul ignore else */
      if (open && Events.isEscKey(ev)) {
        inputElement.current?.querySelector("input")?.focus();
        setOpen(false);
        onPickerClose?.();
        ev.stopPropagation();
      }
    },
    [inputElement, onPickerClose, open, setOpen],
  );

  const handleOnKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    /* istanbul ignore else */
    if (
      ref.current?.querySelector(".DayPicker-NavBar button") ===
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
    _modifiers: DayModifiers,
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

  const formatDay = (date: Date) =>
    `${weekdaysShort[date.getDay()]} ${date.getDate()} ${
      monthsShort[date.getMonth()]
    } ${date.getFullYear()}`;

  if (!open) {
    return null;
  }

  const localeUtils = { formatDay } as LocaleUtils;

  const handleTabGuardFocus = () => {
    ref.current?.querySelector("button")?.focus();
  };

  return (
    <Popover
      placement="bottom-start"
      reference={inputElement}
      middleware={popoverMiddleware}
      disablePortal={disablePortal}
    >
      <StyledDayPicker
        ref={ref}
        onMouseDown={pickerMouseDown}
        onKeyUp={handleKeyUp}
        onKeyDown={handleOnKeyDown}
      >
        <div
          id={pickerTabGuardId}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onFocus={handleTabGuardFocus}
        />
        <DayPicker
          month={selectedDays}
          months={monthsLong}
          firstDayOfWeek={weekStartsOn}
          onDayClick={handleDayClick}
          selectedDays={selectedDays}
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
          locale={locale.locale()}
          localeUtils={localeUtils}
          onDayKeyDown={handleOnDayKeyDown}
          {...pickerProps}
        />
      </StyledDayPicker>
    </Popover>
  );
};

DatePicker.displayName = "DatePicker";

export default DatePicker;
