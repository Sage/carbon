import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { MarginProps } from "styled-system";
import { ValidationProps } from "../../__internal__/validations";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import { Sizes } from "../../__internal__/input/input-presentation.component";
import guid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility";

import Fieldset from "../../__internal__/fieldset";
import Box from "../box";
import { ErrorBorder } from "../textbox/textbox.style";
import ValidationMessage from "../../__internal__/validation-message";
import Number from "../number";
import Typography from "../typography";
import { StyledLabel as Label, StyledHintText as Hint } from "./time.style";
import { TimeToggle, ToggleDataProps } from "./__internal__/time-toggle";

export type ToggleValue = "AM" | "PM";

export type TimeValue = {
  hours: string;
  minutes: string;
  period?: ToggleValue;
};

export interface TimeInputEvent {
  target: {
    name?: string;
    id: string;
    value: TimeValue;
  };
}

interface TimeInputProps
  extends Omit<TagProps, "data-component">,
    Omit<ValidationProps, "info"> {
  /** Set an id value on the input */
  id?: string;
  /** Override the default label text */
  label?: string;
  /** Override the default aria-label text */
  "aria-label"?: string;
}

export interface TimeProps
  extends Omit<TagProps, "data-component">,
    MarginProps {
  /** Label text for the component */
  label?: string;
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
  onBlur?: (ev?: React.FocusEvent<HTMLInputElement>) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** Flag to configure component as optional */
  isOptional?: boolean;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Set custom data- attributes on the toggle elements */
  toggleProps?: ToggleDataProps;
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
      size = "medium",
      inputHint,
      hoursInputProps = {},
      minutesInputProps = {},
      value,
      name,
      onChange,
      onBlur,
      required,
      isOptional,
      disabled,
      readOnly,
      toggleProps = {},
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
    const inputHintId = useRef(guid());
    const internalId = useRef(
      `${internalHrsId.current} ${internalMinsId.current}`,
    );
    const {
      hours: hourValue,
      minutes: minuteValue,
      period: toggleValue,
    } = value;
    const [inputValues, setInputValues] = useState([hourValue, minuteValue]);
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
    const hasValidationFailure = !!(error || warning);

    const { validationId, ariaDescribedBy } = useInputAccessibility({
      id: internalId.current,
      validationRedesignOptIn: true,
      error,
      warning,
    });

    const combinedAriaDescribedBy = [ariaDescribedBy, inputHintId.current]
      .filter(Boolean)
      .join(" ");

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
      onChange({
        target: {
          name,
          id: internalId.current,
          value: { hours, minutes, period },
        },
      });
    };

    const handlePeriodChange = (periodName: ToggleValue) => {
      const [hours, minutes] = inputValues;
      setPeriod(periodName);
      onChange({
        target: {
          name,
          id: internalId.current,
          value: { hours, minutes, period: periodName },
        },
      });
    };

    const handleBlur = useCallback(
      (ev: React.FocusEvent<HTMLInputElement>) => {
        setTimeout(() => {
          if (
            hoursRef.current !== document.activeElement &&
            minsRef.current !== document.activeElement
          ) {
            onBlur?.(ev);
          }
        });
      },
      [onBlur],
    );

    return (
      <Fieldset
        legend={label}
        legendMargin={{ mb: 0 }}
        width="fit-content"
        isRequired={required}
        isOptional={isOptional}
        isDisabled={disabled}
        name={name}
        id={internalId.current}
        {...rest}
        {...tagComponent("time", rest)}
        aria-describedby={combinedAriaDescribedBy}
      >
        {inputHint && (
          <Hint id={inputHintId.current} isDisabled={disabled}>
            {inputHint}
          </Hint>
        )}
        <Box position="relative">
          <ValidationMessage
            validationId={validationId}
            error={error}
            warning={warning}
          />
          {hasValidationFailure && (
            <ErrorBorder warning={!!(!error && warning)} />
          )}
          <Box display="flex">
            <div>
              <Label
                aria-label={hrsAriaLabel}
                htmlFor={internalHrsId.current}
                disabled={disabled}
              >
                {hrsLabel}
              </Label>
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
              <Typography isDisabled={disabled} variant="span" mb="-4px">
                :
              </Typography>
            </Box>
            <div>
              <Label
                aria-label={minsAriaLabel}
                htmlFor={internalMinsId.current}
                disabled={disabled}
              >
                {minsLabel}
              </Label>
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
              />
            </div>
            {showToggle && (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
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
        </Box>
      </Fieldset>
    );
  },
);

Time.displayName = "Time";

export default Time;
