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
import { TextboxProps } from "../textbox";
import TextInput from "../textbox/__internal__/__next__";
import DatePicker, { PickerProps } from "./__internal__/date-picker";
import DateRangeContext, {
  InputName,
} from "../date-range/__internal__/date-range.context";
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import guid from "../../__internal__/utils/helpers/guid";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import FieldsetContext from "../fieldset/__internal__/fieldset.context";
import DatePickerTrigger from "./__internal__/date-picker-trigger/date-picker-trigger.component";
import useDatePickerState from "./__internal__/hooks/useDatePickerState";
import useDateInputState from "./__internal__/hooks/useDateInputState";
import useUniqueId from "../../hooks/__internal__/useUniqueId";

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
      adaptiveLabelBreakpoint: _adaptiveLabelBreakpoint,
      allowEmptyValue,
      autoFocus,
      "aria-describedby": ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      className,
      "data-element": dataElement,
      "data-role": dataRole,
      disabled,
      disablePortal = true,
      helpAriaLabel: _helpAriaLabel,
      error,
      fieldHelp: _fieldHelp,
      id,
      inputHint,
      info: _info,
      label,
      labelAlign: _labelAlign,
      labelHelp: _labelHelp,
      labelInline,
      labelSpacing: _labelSpacing,
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
      reverse: _reverse,
      size = "medium",
      tooltipPosition: _tooltipPosition,
      tooltipId: _tooltipId,
      value,
      inputWidth,
      labelWidth: _labelWidth,
      maxWidth,
      inputName,
      onPickerClose,
      onPickerOpen,
      dateFormatOverride: dateFormatOverrideProp,
      datePickerAriaLabel,
      datePickerAriaLabelledBy,
      validationMessagePositionTop = true,
      validationIconId: _validationIconId,
      validationOnLabel: _validationOnLabel,
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
    const [inputId, uniqueName] = useUniqueId(id, name);

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

    const handleClick = (ev: React.MouseEvent<HTMLElement>) => {
      if (onClick) {
        onClick(ev);
      }

      if (variant === "typical" && open && disablePortal) {
        closePicker();
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

    const handleTriggerClick = (ev: React.MouseEvent<HTMLElement>) => {
      if (disabled || readOnly) {
        return;
      }

      onClick?.(ev);
      isBlurBlocked.current = true;
      alreadyFocused.current = true;

      togglePicker();
    };

    const handleTriggerMouseDown = () => {
      handleClickInside();

      if (disabled || readOnly) {
        return;
      }

      isBlurBlocked.current = true;
      alreadyFocused.current = true;
    };

    const handlePickerMouseDown = () => {
      handleClickInside();
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
        labelInline={labelInline}
        {...marginProps}
        applyDateRangeStyling={!!inputRefMap}
        maxWidth={maxWidth}
        inputWidth={inputWidth}
        {...tagComponent("date", {
          "data-element": dataElement,
          "data-role": dataRole,
        })}
        className={`date date-${variant}`}
      >
        <TextInput
          {...filterOutStyledSystemSpacingProps(rest)}
          aria-describedby={ariaDescribedBy}
          aria-labelledby={ariaLabelledBy}
          autoFocus={autoFocus}
          className={className}
          data-component="date-input"
          data-role="date-input-wrapper"
          disabled={disabled}
          error={error}
          id={inputId}
          inputHint={inputHint}
          inputIcon={
            <DatePickerTrigger
              disabled={disabled}
              open={open}
              pickerId={pickerId}
              readOnly={readOnly}
              size={actualSize}
              variant={variant}
              onClick={handleTriggerClick}
              onMouseDown={handleTriggerMouseDown}
            />
          }
          inputWidth={inputWidth}
          label={label ?? ""}
          labelInline={labelInline}
          maxWidth={maxWidth ?? dateInputWidthBySize[actualSize]}
          name={uniqueName}
          onBlur={handleBlur}
          onChange={handleChange}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          prefix={prefix}
          readOnly={readOnly}
          ref={assignInput}
          required={required}
          size={actualSize}
          validationMessagePositionTop={showValidationMessageOnTop}
          value={displayValue}
          warning={warning}
        />
        <DatePicker
          disablePortal={disablePortal}
          inputContainerRef={parentRef}
          dayPickerProps={pickerProps}
          selectedDate={selectedDate}
          onDayClick={handleDayClick}
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
