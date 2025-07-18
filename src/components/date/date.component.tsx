/* eslint-disable no-lonely-if */
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

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
  isValidLocaleDate,
} from "./__internal__/utils";
import useLocale from "../../hooks/__internal__/useLocale";
import Events from "../../__internal__/utils/helpers/events";
import {
  filterOutStyledSystemSpacingProps,
  filterStyledSystemMarginProps,
} from "../../style/utils";
import getFormatData from "./__internal__/date-formats";
import StyledDateInput from "./date.style";
import Textbox, { TextboxProps } from "../textbox";
import DatePicker, { PickerProps } from "./__internal__/date-picker";
import DateRangeContext, {
  InputName,
} from "../date-range/__internal__/date-range.context";
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import guid from "../../__internal__/utils/helpers/guid";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";

interface CustomDateEvent {
  type: string;
  target: {
    id?: string;
    name?: string;
    value: string;
  };
}

export interface DateChangeEvent {
  target: {
    id?: string;
    name?: string;
    value: {
      formattedValue: string;
      rawValue: string | null;
    };
  };
}

export interface DateInputProps
  extends Omit<
    TextboxProps,
    | "value"
    | "formattedValue"
    | "rawValue"
    | "onChange"
    | "onBlur"
    | "onMouseDown"
    | "onChangeDeferred"
    | "deferTimeout"
    | "children"
    | "leftChildren"
    | "placeholder"
    | "iconOnClick"
    | "iconOnMouseDown"
    | "characterLimit"
    | "warnOverLimit"
    | "iconTabIndex"
    | "inputIcon"
    | "data-component"
  > {
  /** Boolean to allow the input to have an empty value */
  allowEmptyValue?: boolean;
  /** Boolean to toggle where DatePicker is rendered in relation to the Date Input */
  disablePortal?: boolean;
  /** Minimum possible date YYYY-MM-DD */
  minDate?: string;
  /** Maximum possible date YYYY-MM-DD */
  maxDate?: string;
  /** Specify a callback triggered on change */
  onChange: (ev: DateChangeEvent) => void;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: DateChangeEvent) => void;
  /** The current date string */
  value: string;
  /**
   * Pass any props that match the DayPickerProps interface to override default behaviors
   * See [DayPickerProps](https://daypicker.dev/api/type-aliases/DayPickerProps) for a full list of available props
   * */
  pickerProps?: PickerProps;
  /**
   * @private
   * @ignore
   * Name passed from DateRange to allow it to know which input is updating
   * */
  inputName?: InputName;
  /** Callback triggered when the picker is opened */
  onPickerOpen?: () => void;
  /** Callback triggered when the picker is closed */
  onPickerClose?: () => void;
  /** Date format string to be applied to the date inputs */
  dateFormatOverride?: string;
  /** Prop to specify the aria-label attribute of the date picker */
  datePickerAriaLabel?: string;
  /** Prop to specify the aria-labelledby attribute of the date picker */
  datePickerAriaLabelledBy?: string;
}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      adaptiveLabelBreakpoint,
      allowEmptyValue,
      autoFocus,
      "data-element": dataElement,
      "data-role": dataRole,
      disabled,
      disablePortal = true,
      helpAriaLabel,
      labelInline,
      minDate,
      maxDate,
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyDown,
      pickerProps,
      readOnly,
      size = "medium",
      tooltipPosition,
      value,
      inputWidth,
      labelWidth,
      maxWidth,
      inputName,
      onPickerClose,
      onPickerOpen,
      dateFormatOverride: dateFormatOverrideProp,
      datePickerAriaLabel,
      datePickerAriaLabelledBy,
      validationMessagePositionTop = true,
      ...rest
    }: DateInputProps,
    ref,
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLElement | null>(null);
    const internalInputRef = useRef<HTMLInputElement | null>(null);
    const alreadyFocused = useRef(false);
    const isBlurBlocked = useRef(false);
    const focusedViaPicker = useRef(false);
    const locale = useLocale();
    const { dateFnsLocale, dateFormatOverride } = locale.date;
    const { format, formats } = useMemo(
      () =>
        getFormatData(
          dateFnsLocale(),
          dateFormatOverrideProp || dateFormatOverride,
        ),
      [dateFnsLocale, dateFormatOverride, dateFormatOverrideProp],
    );
    const {
      inputRefMap,
      setInputRefMap,
      validationMessagePositionTop: validationMessagePositionTopContext,
    } = useContext(DateRangeContext);
    const [open, setOpen] = useState(false);
    const [selectedDays, setSelectedDays] = useState(() => {
      const isValidDate = isValidLocaleDate(value, dateFnsLocale());
      if (!isValidDate) {
        return undefined;
      }

      return checkISOFormatAndLength(value)
        ? parseISODate(value)
        : parseDate(format, value);
    });
    const isInitialValue = useRef(true);
    const pickerTabGuardId = useRef(guid());
    const showValidationMessageOnTop =
      validationMessagePositionTopContext ?? validationMessagePositionTop;

    const computeInvalidRawValue = (inputValue: string) =>
      allowEmptyValue && !inputValue.length ? inputValue : null;

    const buildCustomEvent = (ev: CustomDateEvent) => {
      const { id, name } = ev.target;

      const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
        ev.target.value,
        formats,
      );

      const formattedValueString =
        ev.type === "blur"
          ? formattedValue(format, selectedDays)
          : ev.target.value;
      const rawValue = isDateValid(parseDate(matchedFormat, matchedValue))
        ? formatToISO(...additionalYears(matchedFormat, matchedValue))
        : computeInvalidRawValue(ev.target.value);

      const customEvent = {
        target: {
          ...(name && { name }),
          ...(id && { id }),
          value: {
            formattedValue: formattedValueString,
            rawValue,
          },
        },
      };

      return customEvent;
    };

    const handleClickAway = () => {
      if (open) {
        alreadyFocused.current = true;
        internalInputRef.current?.focus();
        isBlurBlocked.current = false;
        internalInputRef.current?.blur();
        setOpen(false);
        onPickerClose?.();
        alreadyFocused.current = false;
      }
    };

    const handleClickInside = useClickAwayListener(
      handleClickAway,
      "mousedown",
    );

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      isInitialValue.current = false;
      onChange(buildCustomEvent(ev));
    };

    const focusInput = () => {
      focusedViaPicker.current = true;
      internalInputRef.current?.focus();
    };

    const handleDayClick = (
      day: Date,
      ev: React.MouseEvent<HTMLDivElement>,
    ) => {
      setSelectedDays(day);
      onChange(
        buildCustomEvent({
          ...ev,
          target: {
            ...ev.target,
            value: formattedValue(format, day),
          },
        }),
      );
      focusInput();
      setOpen(false);
    };

    const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        return;
      }

      let event: DateChangeEvent;

      if (isDateValid(selectedDays)) {
        event = buildCustomEvent(ev);

        const currentValue = checkISOFormatAndLength(value)
          ? formattedValue(format, parseISODate(value))
          : value;
        const [, matchedValue] = findMatchedFormatAndValue(
          currentValue,
          formats,
        );

        if (formattedValue(format, selectedDays) !== matchedValue) {
          onChange(event);
        }
      } else {
        const { id, name } = ev.target;

        event = {
          target: {
            ...(name && { name }),
            ...(id && { id }),
            value: {
              formattedValue: ev.target.value,
              rawValue: computeInvalidRawValue(ev.target.value),
            },
          },
        };
      }

      if (isBlurBlocked.current) {
        return;
      }

      if (onBlur) {
        onBlur(event);
      }
    };

    const handleFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        return;
      }

      isBlurBlocked.current = false;

      if (onFocus) {
        onFocus(ev);
      }
    };

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown) {
        onKeyDown(ev);
      }

      if (open && Events.isTabKey(ev)) {
        if (Events.isShiftKey(ev)) {
          setOpen(false);
          onPickerClose?.();
        } else if (!disablePortal) {
          ev.preventDefault();
          (
            document?.querySelector(
              `[id="${pickerTabGuardId.current}"]`,
            ) as HTMLElement
          )?.focus();
        }
        alreadyFocused.current = false;
      }
    };

    const handleClick = (
      ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) => {
      if (onClick) {
        onClick(ev);
      }
    };

    const handleMouseDown = () => {
      handleClickInside();

      if (setInputRefMap) {
        isBlurBlocked.current = true;
      }

      if (!open) {
        onPickerOpen?.();
      }
    };

    const handleIconMouseDown = () => {
      isBlurBlocked.current = true;
      alreadyFocused.current = true;

      handleClickInside();

      if (open) {
        setOpen(false);
        onPickerClose?.();
      } else {
        setOpen(true);
        onPickerOpen?.();
      }
    };

    const handlePickerMouseDown = () => {
      isBlurBlocked.current = true;
      handleClickInside();
    };

    const assignInput = useCallback(
      (inputElement: HTMLInputElement) => {
        internalInputRef.current = inputElement;
        parentRef.current = inputElement?.parentElement;

        if (ref) {
          if (typeof ref === "function") {
            ref(inputElement);
          } else {
            ref.current = inputElement;
          }
        }

        if (
          inputName &&
          inputRefMap?.[inputName as keyof typeof inputRefMap]?.setOpen !==
            setOpen
        ) {
          setInputRefMap?.({
            [inputName]: { isBlurBlocked, setOpen },
          });
        }
      },
      [inputName, inputRefMap, setInputRefMap, ref],
    );

    useEffect(() => {
      const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
        value,
        formats,
      );

      if (
        matchedFormat &&
        matchedValue &&
        isDateValid(parseDate(matchedFormat, matchedValue))
      ) {
        setSelectedDays(
          parseDate(...additionalYears(matchedFormat, matchedValue)),
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
          formats,
        );
        return formattedValue(
          format,
          parseDate(...additionalYears(matchedFormat, matchedValue)),
        );
      }

      return value;
    };

    const marginProps = filterStyledSystemMarginProps(rest);

    return (
      <StyledDateInput
        ref={wrapperRef}
        role="presentation"
        size={size}
        labelInline={labelInline}
        {...marginProps}
        applyDateRangeStyling={!!inputRefMap}
        maxWidth={maxWidth}
        inputWidth={inputWidth}
        {...tagComponent("date", {
          "data-element": dataElement,
          "data-role": dataRole,
        })}
      >
        <Textbox
          {...filterOutStyledSystemSpacingProps(rest)}
          data-component="date-input"
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
          inputWidth={inputWidth}
          labelWidth={labelWidth}
          maxWidth={maxWidth}
          m={0}
          validationMessagePositionTop={showValidationMessageOnTop}
        />
        <DatePicker
          disablePortal={disablePortal}
          inputElement={parentRef}
          pickerProps={pickerProps}
          selectedDays={selectedDays}
          onDayClick={handleDayClick}
          minDate={minDate}
          maxDate={maxDate}
          pickerMouseDown={handlePickerMouseDown}
          open={open}
          setOpen={setOpen}
          pickerTabGuardId={pickerTabGuardId.current}
          onPickerClose={onPickerClose}
          ariaLabel={datePickerAriaLabel}
          ariaLabelledBy={datePickerAriaLabelledBy}
        />
      </StyledDateInput>
    );
  },
);

export default DateInput;
