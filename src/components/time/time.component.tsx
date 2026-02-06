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
import { Sizes } from "../../__internal__/input/input-presentation.component";
import guid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";

import Fieldset from "../../__internal__/fieldset";
import Box from "../box";
import Number from "../number";
import Typography from "../typography";
import StyledLabel from "./time.style";
import { TimeToggle, ToggleDataProps } from "./__internal__/time-toggle";

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
  /** Set an id value on the input */
  id?: string;
  /** Override the default label text */
  label?: string;
  /** Override the default aria-label text */
  "aria-label"?: string;
}

export interface TimeProps extends TagProps, MarginProps {
  /** Label text for the component */
  label?: string;
  /** Label alignment */
  labelAlign?: "left" | "right";
  /** Field labels alignment */
  fieldLabelsAlign?: "left" | "right";
  /** Sets the size of the inputs */
  size?: Sizes;
  /** Additional hint text rendered above the input elements */
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

const Time = React.forwardRef<TimeHandle, TimeProps>(
  (
    {
      label,
      labelAlign,
      fieldLabelsAlign,
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
      "aria-label": hoursAriaLabel,
      error: hoursError,
      warning: hoursWarning,
    } = hoursInputProps;
    const {
      id: minutesInputId,
      label: minutesLabel,
      "aria-label": minutesAriaLabel,
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
    const hrsAriaLabel = hoursAriaLabel || locale.time.hoursAriaLabelText();
    const minsAriaLabel =
      minutesAriaLabel || locale.time.minutesAriaLabelText();
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
    ) => {
      const hoursIsString = typeof hrs === "string";
      const minutesIsString = typeof mins === "string";
      if (!hoursIsString && !minutesIsString) {
        return hrs || mins;
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
      const hours = inputName === "hrs" ? ev.target.value : inputValues[0];
      const minutes = inputName === "mins" ? ev.target.value : inputValues[1];
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
        applyNewValidation
        id={internalId.current}
        legend={label}
        inputHint={inputHint}
        width="min-content"
        legendAlign={labelAlign}
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
        <Box display="flex" alignItems="end">
          <div>
            <StyledLabel
              aria-label={hrsAriaLabel}
              htmlFor={internalHrsId.current}
              disabled={disabled}
              align={fieldLabelsAlign}
            >
              {hrsLabel}
            </StyledLabel>
            <Number
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
              my={0} // prevents any form spacing being applied
            />
          </div>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mx={1}
            aria-hidden="true"
            alignSelf="center"
          >
            <span>&nbsp;</span>
            <Typography isDisabled={disabled} variant="span" mb="-4px">
              :
            </Typography>
          </Box>
          <div>
            <StyledLabel
              aria-label={minsAriaLabel}
              htmlFor={internalMinsId.current}
              disabled={disabled}
              align={fieldLabelsAlign}
            >
              {minsLabel}
            </StyledLabel>
            <Number
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
              my={0} // prevents any form spacing being applied
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
      </Fieldset>
    );
  },
);

Time.displayName = "Time";

export default Time;
