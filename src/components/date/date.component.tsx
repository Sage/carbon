import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { formattedValue, isDateValid } from "./__internal__/utils/utils";
import useLocale from "../../hooks/__internal__/useLocale";
import Events from "../../__internal__/utils/helpers/events";
import {
  filterOutStyledSystemSpacingProps,
  filterStyledSystemMarginProps,
} from "../../style/utils";
import getFormatData from "./__internal__/date-formats";
import StyledDateInput, { dateInputWidthBySize } from "./date.style";
import Textbox, { TextboxProps } from "../textbox";
import DatePicker, { PickerProps } from "./__internal__/date-picker";
import DateRangeContext, {
  InputName,
} from "../date-range/__internal__/date-range.context";
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import guid from "../../__internal__/utils/helpers/guid";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import FieldsetContext from "../fieldset/__internal__/fieldset.context";
import DatePickerTrigger from "./__internal__/date-picker-trigger/date-picker-trigger.component";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import useDatePickerState from "./__internal__/hooks/useDatePickerState";
import useDateInputState from "./__internal__/hooks/useDateInputState";
import useUniqueId from "../../hooks/__internal__/useUniqueId";

const TYPICAL_UNSUPPORTED_PROPS = new Set([
  "helpAriaLabel",
  "info",
  "labelSpacing",
  "labelWidth",
  "reverse",
  "tooltipId",
  "tooltipPosition",
  "validationIconId",
  "validationOnLabel",
]);

const filterTypicalInputProps = (props: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(props).filter(
      ([key]) => !TYPICAL_UNSUPPORTED_PROPS.has(key),
    ),
  );

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
  /** Date input presentation. Typical is the default; legacy retains its icon trigger. */
  variant?: "legacy" | "typical";
}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      adaptiveLabelBreakpoint,
      allowEmptyValue,
      autoFocus,
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      className,
      "data-element": dataElement,
      "data-role": dataRole,
      disabled,
      disablePortal = true,
      helpAriaLabel,
      error,
      fieldHelp,
      id,
      inputHint,
      label,
      labelAlign,
      labelHelp,
      labelInline,
      minDate,
      maxDate,
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyDown,
      pickerProps,
      prefix,
      readOnly,
      required,
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
      variant = "typical",
      warning,
      name,
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
    const { open, setOpen, closePicker, togglePicker } = useDatePickerState({
      onPickerOpen,
      onPickerClose,
    });
    const {
      displayValue,
      selectedDate,
      createDateChangeEvent,
      valueNeedsFormatting,
      trackEditedValue,
    } = useDateInputState({
      allowEmptyValue,
      format,
      formats,
      value,
    });
    const [pickerTabGuardId] = useState(() => guid());
    const [pickerId] = useState(() => `date-picker-${guid()}`);
    const showValidationMessageOnTop =
      validationMessagePositionTopContext ?? validationMessagePositionTop;

    const { size: fieldsetSize } = useContext(FieldsetContext);
    const actualSize = fieldsetSize || size;
    const labelHelpString =
      typeof labelHelp === "string" ? labelHelp : undefined;
    const fieldHelpString =
      typeof fieldHelp === "string" ? fieldHelp : undefined;
    const resolvedInputHint =
      inputHint ||
      labelHelpString ||
      (variant === "typical" ? fieldHelpString : undefined);
    const [inputId, uniqueName] = useUniqueId(id, name);
    const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
    const resolvedLabelInline = adaptiveLabelBreakpoint
      ? largeScreen
      : labelInline;

    const handleClickAway = () => {
      if (open) {
        alreadyFocused.current = true;
        internalInputRef.current?.focus();
        isBlurBlocked.current = false;
        internalInputRef.current?.blur();
        closePicker();
        alreadyFocused.current = false;
      }
    };

    const handleClickInside = useClickAwayListener(
      handleClickAway,
      "mousedown",
    );

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      trackEditedValue(ev.target.value);
      onChange(createDateChangeEvent({ type: "change", target: ev.target }));
    };

    const focusInput = () => {
      focusedViaPicker.current = true;
      internalInputRef.current?.focus();
    };

    const handleDayClick = (
      day: Date,
      ev: React.MouseEvent<HTMLDivElement>,
    ) => {
      onChange(
        createDateChangeEvent({
          type: "click",
          target: {
            ...ev.target,
            value: formattedValue(format, day),
          },
        }),
      );
      focusInput();
    };

    const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        return;
      }

      const event = createDateChangeEvent({
        type: "blur",
        target: ev.target,
      });

      if (isDateValid(selectedDate) && valueNeedsFormatting) {
        onChange(event);
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
          closePicker();
        } else if (!disablePortal) {
          ev.preventDefault();
          (
            document?.querySelector(`[id="${pickerTabGuardId}"]`) as HTMLElement
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

      if (variant === "typical" && open && disablePortal) {
        closePicker();
      }
    };

    const handleMouseDown = () => {
      if (setInputRefMap) {
        isBlurBlocked.current = true;
      }

      if (!open) {
        onPickerOpen?.();
      }
    };

    const handleTriggerClick = (
      ev:
        | React.MouseEvent<HTMLAnchorElement>
        | React.MouseEvent<HTMLButtonElement>,
    ) => {
      onClick?.(ev);
      isBlurBlocked.current = true;
      alreadyFocused.current = true;

      togglePicker();
    };

    const handleTriggerMouseDown = () => {
      isBlurBlocked.current = true;
      alreadyFocused.current = true;
    };

    const handleLegacyIconMouseDown = () => {
      isBlurBlocked.current = true;
      alreadyFocused.current = true;
      togglePicker();
    };

    const handleMonthYearChange = (date: Date) => {
      onChange({
        target: {
          ...(uniqueName && { name: uniqueName }),
          ...(inputId && { id: inputId }),
          value: {
            formattedValue: formattedValue(format, date),
            rawValue: formattedValue("yyyy-MM-dd", date),
          },
        },
      });
    };

    const handlePickerMouseDown = () => {
      isBlurBlocked.current = true;
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
      [inputName, inputRefMap, setInputRefMap, ref, setOpen],
    );

    const marginProps = filterStyledSystemMarginProps(rest);

    return (
      <StyledDateInput
        ref={wrapperRef}
        role="presentation"
        size={actualSize}
        labelInline={variant === "typical" ? resolvedLabelInline : labelInline}
        {...marginProps}
        applyDateRangeStyling={!!inputRefMap}
        maxWidth={maxWidth}
        inputWidth={inputWidth}
        {...tagComponent("date", {
          "data-element": dataElement,
          "data-role": dataRole,
        })}
        onMouseDown={handleClickInside}
        className={`date date-${variant}`}
      >
        <Textbox
          {...(variant === "typical"
            ? filterTypicalInputProps(filterOutStyledSystemSpacingProps(rest))
            : filterOutStyledSystemSpacingProps(rest))}
          aria-describedby={ariaDescribedBy}
          aria-labelledby={ariaLabelledBy}
          className={className}
          error={error}
          fieldHelp={variant === "legacy" ? fieldHelp : undefined}
          id={inputId}
          inputHint={variant === "typical" ? resolvedInputHint : inputHint}
          label={label}
          labelAlign={labelAlign}
          labelHelp={variant === "legacy" ? labelHelp : undefined}
          name={uniqueName}
          prefix={prefix}
          required={required}
          warning={warning}
          data-component="date-input"
          data-role={variant === "typical" ? "date-input-wrapper" : undefined}
          value={displayValue}
          onBlur={handleBlur}
          onChange={handleChange}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          iconOnClick={variant === "legacy" ? handleClick : undefined}
          iconOnMouseDown={
            variant === "legacy" ? handleLegacyIconMouseDown : undefined
          }
          onMouseDown={handleMouseDown}
          inputIcon={
            variant === "typical" ? (
              <DatePickerTrigger
                disabled={disabled}
                open={open}
                pickerId={pickerId}
                readOnly={readOnly}
                size={actualSize}
                onClick={handleTriggerClick}
                onMouseDown={handleTriggerMouseDown}
              />
            ) : (
              "calendar_today"
            )
          }
          labelInline={
            variant === "typical" ? resolvedLabelInline : labelInline
          }
          ref={assignInput}
          adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
          tooltipPosition={tooltipPosition}
          helpAriaLabel={helpAriaLabel}
          autoFocus={autoFocus}
          size={actualSize}
          disabled={disabled}
          readOnly={readOnly}
          inputWidth={inputWidth}
          labelWidth={labelWidth}
          maxWidth={maxWidth ?? dateInputWidthBySize[actualSize]}
          m={0}
          validationMessagePositionTop={showValidationMessageOnTop}
        />
        <DatePicker
          disablePortal={disablePortal}
          inputContainerRef={parentRef}
          dayPickerProps={pickerProps}
          selectedDate={selectedDate}
          onDayClick={handleDayClick}
          onMonthYearChange={handleMonthYearChange}
          minDate={minDate}
          maxDate={maxDate}
          onPickerMouseDown={handlePickerMouseDown}
          open={open}
          onRequestPickerClose={closePicker}
          pickerTabGuardId={pickerTabGuardId}
          ariaLabel={datePickerAriaLabel}
          ariaLabelledBy={datePickerAriaLabelledBy}
          pickerId={pickerId}
          size={actualSize}
        />
      </StyledDateInput>
    );
  },
);

export default DateInput;
