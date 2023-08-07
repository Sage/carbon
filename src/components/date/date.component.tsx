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
} from "./__internal__/utils";
import useLocale from "../../hooks/__internal__/useLocale";
import Events from "../../__internal__/utils/helpers/events";
import { filterOutStyledSystemSpacingProps } from "../../style/utils";
import getFormatData from "./__internal__/date-formats";
import StyledDateInput from "./date.style";
import Textbox, { TextboxProps } from "../textbox";
import DatePicker, { PickerProps } from "./__internal__/date-picker";
import DateRangeContext, { InputName } from "../date-range/date-range.context";
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import Logger from "../../__internal__/utils/logger";
import useFormSpacing from "../../hooks/__internal__/useFormSpacing";

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
    | "enforceCharacterLimit"
    | "characterLimit"
    | "warnOverLimit"
    | "iconTabIndex"
    | "inputIcon"
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
   * See [DayPickerProps](https://react-day-picker-v7.netlify.app/docs/getting-started/) for a full list of available props
   * */
  pickerProps?: PickerProps;
  /**
   * @private
   * @ignore
   * Name passed from DateRange to allow it to know which input is updating
   * */
  inputName?: InputName;
}

let deprecateInputRefWarnTriggered = false;

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
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
      inputWidth,
      labelWidth,
      maxWidth,
      inputName,
      ...rest
    }: DateInputProps,
    ref
  ) => {
    const wrapperRef = useRef(null);
    const parentRef = useRef(null);
    const internalInputRef = useRef<HTMLInputElement | null>(null);
    const alreadyFocused = useRef(false);
    const isBlurBlocked = useRef(false);
    const focusedViaPicker = useRef(false);
    const l = useLocale();
    const { dateFnsLocale } = l.date;
    const { format, formats } = useMemo(() => getFormatData(dateFnsLocale()), [
      dateFnsLocale,
    ]);
    const { inputRefMap, setInputRefMap } = useContext(DateRangeContext);
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

    const computeInvalidRawValue = (inputValue: string) =>
      allowEmptyValue && !inputValue.length ? inputValue : null;

    const buildCustomEvent = (ev: CustomDateEvent) => {
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
        alreadyFocused.current = false;
      }
    };

    const handleClickInside = useClickAwayListener(
      handleClickAway,
      "mousedown"
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
      ev: React.MouseEvent<HTMLDivElement>
    ) => {
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
          formats
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

      if (!open && !alreadyFocused.current) {
        setOpen(true);
      } else {
        alreadyFocused.current = false;
      }

      if (onFocus) {
        onFocus(ev);
      }
    };

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown) {
        onKeyDown(ev);
      }

      if (Events.isTabKey(ev)) {
        setOpen(false);
        alreadyFocused.current = false;
      }
    };

    const handleClick = (
      ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
    ) => {
      if (disabled || readOnly) {
        return;
      }

      if (onClick) {
        onClick(ev);
      }
    };

    const handleMouseDown = (ev: React.MouseEvent<HTMLElement>) => {
      handleClickInside();

      if (disabled || readOnly) {
        return;
      }

      if (setInputRefMap) {
        isBlurBlocked.current = true;
      }

      const { type } = ev.target as HTMLInputElement;

      if (type !== "text") {
        alreadyFocused.current = true;
        setOpen((prev) => !prev);
      } else if (!open) {
        setOpen(true);
      }
    };

    const handleIconMouseDown = (ev: React.MouseEvent<HTMLElement>) => {
      isBlurBlocked.current = true;
      handleMouseDown(ev);
    };

    const handlePickerMouseDown = () => {
      isBlurBlocked.current = true;
      handleClickInside();
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

    const marginProps = useFormSpacing(rest);

    return (
      <StyledDateInput
        ref={wrapperRef}
        role="presentation"
        size={size}
        labelInline={labelInline}
        data-component={dataComponent || "date"}
        data-element={dataElement}
        data-role={dataRole}
        {...marginProps}
        applyDateRangeStyling={!!inputRefMap}
        maxWidth={maxWidth}
        inputWidth={inputWidth}
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
          inputWidth={inputWidth}
          labelWidth={labelWidth}
          maxWidth={maxWidth}
          m={0}
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
        />
      </StyledDateInput>
    );
  }
);

DateInput.displayName = "DateInput";

export default DateInput;
