import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { MarginProps } from "styled-system";
import { ValidationProps } from "../../__internal__/validations";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import { Sizes } from "../../__internal__/legacy-input/input-presentation.component";
import guid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";

import Fieldset from "../../__internal__/fieldset/__next__/fieldset.component";
import Box from "../box";
import Textbox from "../textbox";
import Label from "../../__internal__/label";
import StyledLabelWrapper, { StyledColon } from "./time.style";
import { TimeToggle, ToggleDataProps } from "./__internal__/time-toggle";
import FieldsetValidationContext from "../../__internal__/fieldset-validation-context";

export type ToggleValue = "AM" | "PM";

export type TimeValue = {
  hours: string;
  minutes: string;
  period?: ToggleValue;
  formattedHours?: string;
  formattedMinutes?: string;
};

export interface TimeInputEvent {
  target: {
    name?: string;
    id: string;
    value: TimeValue;
  };
}

interface TimeInputProps extends TagProps, Omit<ValidationProps, "info"> {
  /** Set an id value on the input element */
  id?: string;
  /** Override the default label text on the input */
  label?: string;
  /** Override the default aria-label text on the input */
  "aria-label"?: string;
}

export interface TimeProps extends TagProps, MarginProps {
  /** Legend text for the component */
  legend?: string;
  /** Additional hint text rendered below the legend */
  legendHint?: string;
  /** @deprecated Use `legend` instead. Label text for the component */
  label?: string;
  /** @deprecated Alignment is no longer supported and this prop will be removed */
  labelAlign?: "left" | "right";
  /** @deprecated Alignment is no longer supported and this prop will be removed */
  fieldLabelsAlign?: "left" | "right";
  /** Sets the size of the inputs */
  size?: Sizes;
  /** @deprecated Use `legendHint` instead. Additional hint text rendered below the legend */
  inputHint?: string;
  /**
   * Set custom `data-` and `id` attributes on the input element.
   * Set the `label` and `aria-label` values for the associated Label element.
   * Set the `error` and `warning` states for the input
   *  */
  hoursInputProps?: TimeInputProps;
  /**
   * Set custom `data-` and `id` attributes on the input element.
   * Set the `label` and `aria-label` values for the associated Label element.
   * Set the `error` and `warning` states for the input
   *  */
  minutesInputProps?: TimeInputProps;
  /** The value of the input elements */
  value: TimeValue;
  /** Callback to handle change events in input elements */
  onChange: (ev: TimeInputEvent) => void;
  /** Set a name value on the component */
  name?: string;
  /** Callback called when focus is lost on input elements */
  onBlur?: (ev?: React.FocusEvent<HTMLInputElement>, value?: TimeValue) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Set custom data- attributes on the toggle elements */
  toggleProps?: ToggleDataProps;
  /** Render the ValidationMessage above the Time inputs */
  validationMessagePositionTop?: boolean;
}

export type TimeHandle = {
  /** Programmatically focus the hours input. */
  focusHoursInput: () => void;
  /** Programmatically focus the minutes input. */
  focusMinutesInput: () => void;
} | null;

const SIZES = {
  small: "48px",
  medium: "56px",
  large: "64px",
};

const Time = React.forwardRef<TimeHandle, TimeProps>(
  (
    {
      legend,
      legendHint,
      label,
      size = "medium",
      inputHint,
      hoursInputProps = {},
      minutesInputProps = {},
      value,
      name,
      onChange,
      onBlur,
      required,
      disabled,
      readOnly,
      toggleProps = {},
      validationMessagePositionTop = true,
      ...rest
    },
    ref,
  ) => {
    const {
      id: hoursInputId,
      label: hoursLabel,
      "aria-label": hoursInputAriaLabel,
      error: hoursError,
      warning: hoursWarning,
    } = hoursInputProps;
    const {
      id: minutesInputId,
      label: minutesLabel,
      "aria-label": minutesInputAriaLabel,
      error: minutesError,
      warning: minutesWarning,
    } = minutesInputProps;
    const internalHrsId = useRef(hoursInputId || guid());
    const internalMinsId = useRef(minutesInputId || guid());
    const internalId = useRef(
      `${internalHrsId.current}-${internalMinsId.current}`,
    );
    const {
      hours: hourValue,
      minutes: minuteValue,
      period: toggleValue,
    } = value;
    const formattedHoursValue = hourValue.length
      ? hourValue.padStart(2, "0")
      : hourValue;
    const formattedMinutesValue = minuteValue.length
      ? minuteValue.padStart(2, "0")
      : minuteValue;
    const [inputValues, setInputValues] = useState([hourValue, minuteValue]);
    const [formattedInputValues, setFormattedInputValues] = useState([
      formattedHoursValue,
      formattedMinutesValue,
    ]);
    const locale = useLocale();
    const showToggle = toggleValue !== undefined;
    const [period, setPeriod] = useState(toggleValue);
    const hrsLabel = hoursLabel || locale.time.hoursLabelText();
    const minsLabel = minutesLabel || locale.time.minutesLabelText();
    const hrsAriaLabel =
      hoursInputAriaLabel || locale.time.hoursAriaLabelText();
    const minsAriaLabel =
      minutesInputAriaLabel || locale.time.minutesAriaLabelText();
    const hoursRef = useRef<HTMLInputElement>(null);
    const minsRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const updates = [...inputValues];

      if (inputValues[0] !== hourValue) {
        updates[0] = hourValue;
      }

      if (inputValues[1] !== minuteValue) {
        updates[1] = minuteValue;
      }

      if (inputValues[0] !== hourValue || inputValues[1] !== minuteValue) {
        setInputValues(updates);

        const formattedHours = hourValue.length
          ? hourValue.padStart(2, "0")
          : hourValue;
        const formattedMinutes = minuteValue.length
          ? minuteValue.padStart(2, "0")
          : minuteValue;

        setFormattedInputValues([formattedHours, formattedMinutes]);
      }
    }, [hourValue, minuteValue, inputValues]);

    const computedValidations = (
      hrs?: string | boolean,
      mins?: string | boolean,
    ): string | undefined => {
      const hoursIsString = typeof hrs === "string";
      const minutesIsString = typeof mins === "string";
      if (!hoursIsString && !minutesIsString) {
        return undefined;
      }

      if (hoursIsString && !minutesIsString) {
        return hrs;
      }

      if (minutesIsString && !hoursIsString) {
        return mins;
      }

      return `${hrs} ${mins}`;
    };

    const error = computedValidations(hoursError, minutesError);
    const warning = computedValidations(hoursWarning, minutesWarning);

    useImperativeHandle<TimeHandle, TimeHandle>(
      ref,
      () => ({
        focusHoursInput() {
          hoursRef.current?.focus();
        },
        focusMinutesInput() {
          minsRef.current?.focus();
        },
      }),
      [],
    );

    const handleChange = (
      ev: React.ChangeEvent<HTMLInputElement>,
      inputName: "hrs" | "mins",
    ) => {
      const rawValue = ev.target.value.replace(/[^0-9]/g, "");
      const hours = inputName === "hrs" ? rawValue : inputValues[0];
      const minutes = inputName === "mins" ? rawValue : inputValues[1];
      setInputValues([hours, minutes]);

      const formattedHours = hours.length ? hours.padStart(2, "0") : hours;
      const formattedMinutes = minutes.length
        ? minutes.padStart(2, "0")
        : minutes;
      setFormattedInputValues([formattedHours, formattedMinutes]);

      onChange({
        target: {
          name,
          id: internalId.current,
          value: { hours, minutes, period, formattedHours, formattedMinutes },
        },
      });
    };

    const handlePeriodChange = (periodName: ToggleValue) => {
      const [hours, minutes] = inputValues;
      const [formattedHours, formattedMinutes] = formattedInputValues;
      setPeriod(periodName);
      onChange({
        target: {
          name,
          id: internalId.current,
          value: {
            hours,
            minutes,
            period: periodName,
            formattedHours,
            formattedMinutes,
          },
        },
      });
    };

    const handleBlur = useCallback(
      (ev: React.FocusEvent<HTMLInputElement>) => {
        setTimeout(() => {
          const [hours, minutes] = inputValues;
          const [formattedHours, formattedMinutes] = formattedInputValues;
          const timeValueObj = {
            hours,
            minutes,
            period,
            formattedHours,
            formattedMinutes,
          };

          if (
            hoursRef.current !== document.activeElement &&
            minsRef.current !== document.activeElement
          ) {
            onBlur?.(ev, timeValueObj);
          }
        });
      },
      [formattedInputValues, inputValues, onBlur, period],
    );

    return (
      <Fieldset
        id={internalId.current}
        legend={legend || label}
        legendHint={legendHint || inputHint}
        isRequired={required}
        isDisabled={disabled}
        name={name}
        error={error}
        warning={warning}
        validationMessagePositionTop={validationMessagePositionTop}
        {...rest}
        {...filterStyledSystemMarginProps(rest)}
        {...tagComponent("time", rest)}
      >
        <FieldsetValidationContext.Provider
          value={{ disableErrorBorder: true }}
        >
          <Box display="flex" className="time">
            <div>
              <StyledLabelWrapper>
                <Label
                  htmlFor={internalHrsId.current}
                  size={size}
                  disabled={disabled}
                  readOnly={readOnly}
                >
                  {hrsLabel}
                </Label>
              </StyledLabelWrapper>
              <Textbox
                {...hoursInputProps}
                label={undefined}
                data-component="hours"
                ref={hoursRef}
                value={hourValue}
                onChange={(ev) => handleChange(ev, "hrs")}
                onBlur={handleBlur}
                id={internalHrsId.current}
                size={size}
                error={!!hoursError}
                warning={!!hoursWarning}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                maxWidth={SIZES[size]}
                my={0} // prevents any form spacing being applied
                inputMode="numeric"
                aria-label={hrsAriaLabel}
              />
            </div>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              mx={1}
              aria-hidden="true"
            >
              <span>&nbsp;</span>
              <StyledColon
                $size={size}
                $isDisabled={disabled}
                $isReadOnly={readOnly}
              >
                :
              </StyledColon>
            </Box>
            <div>
              <StyledLabelWrapper>
                <Label
                  htmlFor={internalMinsId.current}
                  size={size}
                  disabled={disabled}
                  readOnly={readOnly}
                >
                  {minsLabel}
                </Label>
              </StyledLabelWrapper>
              <Textbox
                {...minutesInputProps}
                label={undefined}
                data-component="minutes"
                ref={minsRef}
                value={minuteValue}
                onChange={(ev) => handleChange(ev, "mins")}
                onBlur={handleBlur}
                id={internalMinsId.current}
                size={size}
                error={!!minutesError}
                warning={!!minutesWarning}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                maxWidth={SIZES[size]}
                my={0} // prevents any form spacing being applied
                inputMode="numeric"
                aria-label={minsAriaLabel}
              />
            </div>
            {showToggle && (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                width="max-content"
              >
                <TimeToggle
                  toggleProps={toggleProps}
                  size={size}
                  onChange={handlePeriodChange}
                  toggleValue={toggleValue}
                  disabled={disabled || readOnly}
                />
              </Box>
            )}
          </Box>
        </FieldsetValidationContext.Provider>
      </Fieldset>
    );
  },
);

Time.displayName = "Time";

export default Time;
