import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import invariant from "invariant";
import { MarginProps } from "styled-system";

import { ValidationProps } from "../../__internal__/validations";
import { filterStyledSystemMarginProps } from "../../style/utils";
import Events from "../../__internal__/utils/helpers/events";
import { StyledNumeralDate, StyledDateField } from "./numeral-date.style";
import Textbox from "../textbox";
import Box from "../box";
import Typography from "../typography";
import { ErrorBorder, StyledHintText } from "../textbox/textbox.style";
import ValidationMessage from "../../__internal__/validation-message";
import guid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import FormField from "../../__internal__/form-field";
import { InputGroupBehaviour } from "../../__internal__/input-behaviour";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import { NewValidationContext } from "../carbon-provider/carbon-provider.component";
import NumeralDateContext from "./numeral-date-context";
import FormSpacingProvider from "../../__internal__/form-spacing-provider";
import Logger from "../../__internal__/utils/logger";
import Locale from "../../locales/locale";

let deprecateUncontrolledWarnTriggered = false;

export const ALLOWED_DATE_FORMATS = [
  ["dd", "mm", "yyyy"],
  ["mm", "dd", "yyyy"],
  ["yyyy", "mm", "dd"],
  ["dd", "mm"],
  ["mm", "dd"],
  ["mm", "yyyy"],
] as const;

export interface DayMonthDate {
  dd: string;
  mm: string;
}

export interface MonthYearDate {
  mm: string;
  yyyy: string;
}

export interface FullDate extends DayMonthDate {
  yyyy: string;
}

interface ValidationsObject {
  dd: (datePart: string) => boolean;
  mm: (datePart: string) => boolean;
  yyyy: (datePart: string) => boolean;
}

export type NumeralDateObject = DayMonthDate | MonthYearDate | FullDate;

export interface NumeralDateEvent<
  DateType extends NumeralDateObject = FullDate
> {
  target: {
    name?: string;
    id: string;
    value: DateType;
  };
}

export interface NumeralDateProps<DateType extends NumeralDateObject = FullDate>
  extends ValidationProps,
    MarginProps {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /* Array of strings to define custom input layout.
  Allowed formats:
  ['dd', 'mm', 'yyyy'],
  ['mm', 'dd', 'yyyy'],
  ['yyyy', 'mm', 'dd'],
  ['dd', 'mm'],
  ['mm', 'dd'],
  ['mm', 'yyyy'] */
  dateFormat?: ValidDateFormat;
  /** Default value for use in uncontrolled mode  */
  defaultValue?: DateType;
  /**  Value for use in controlled mode  */
  value?: DateType;
  /** When true, enables the internal errors to be displayed */
  enableInternalError?: boolean;
  /** When true, enables the internal warnings to be displayed */
  enableInternalWarning?: boolean;
  /** Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /** `id` for events */
  id?: string;
  /** `name` for events */
  name?: string;
  /** Label */
  label?: string;
  /** Label alignment. Works only when labelInline is true */
  labelAlign?: "left" | "right";
  /** Text applied to label help tooltip */
  labelHelp?: React.ReactNode;
  /** When true, label is placed in line with an input */
  labelInline?: boolean;
  /** Label width */
  labelWidth?: number;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Blur event handler */
  onBlur?: (ev: NumeralDateEvent<DateType>) => void;
  /** Change event handler */
  onChange?: (ev: NumeralDateEvent<DateType>) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /** When true, validation icons will be placed on labels instead of being placed on the inputs */
  validationOnLabel?: boolean;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
  /**
   * A React ref to pass to the input corresponding to the day
   */
  dayRef?: React.ForwardedRef<HTMLInputElement>;
  /**
   * A React ref to pass to the input corresponding to the month
   */
  monthRef?: React.ForwardedRef<HTMLInputElement>;
  /**
   * A React ref to pass to the input corresponding to the year
   */
  yearRef?: React.ForwardedRef<HTMLInputElement>;
}

export type ValidDateFormat = typeof ALLOWED_DATE_FORMATS[number];

const incorrectDateFormatMessage =
  "Forbidden prop dateFormat supplied to NumeralDate. " +
  "Only one of these date formats is allowed: " +
  "['dd', 'mm', 'yyyy'], " +
  "['mm', 'dd', 'yyyy'], " +
  "['yyyy', 'mm', 'dd'], " +
  "['dd', 'mm'], " +
  "['mm', 'dd'], " +
  "['mm', 'yyyy']";

const isDayValid = (day: string) => (day ? +day > 0 && +day < 32 : true);

const isMonthValid = (month: string) =>
  month ? +month > 0 && +month < 13 : true;

const isYearValid = (year: string) =>
  year ? +year > 1799 && +year < 2201 : true;

const validations: ValidationsObject = {
  dd: isDayValid,
  mm: isMonthValid,
  yyyy: isYearValid,
};

const getDateLabel = (datePart: string, locale: Locale) => {
  switch (datePart) {
    case "mm":
      return locale.numeralDate.labels.month();
    case "yyyy":
      return locale.numeralDate.labels.year();
    default:
      return locale.numeralDate.labels.day();
  }
};

export const NumeralDate = <DateType extends NumeralDateObject = FullDate>({
  dateFormat = ["dd", "mm", "yyyy"],
  defaultValue,
  disabled,
  error = "",
  warning = "",
  "data-component": dataComponent,
  "data-element": dataElement,
  "data-role": dataRole,
  info,
  id,
  name,
  onBlur,
  onChange,
  value,
  validationOnLabel = false,
  label,
  labelInline,
  labelWidth,
  labelAlign,
  labelHelp,
  labelSpacing,
  fieldHelp,
  adaptiveLabelBreakpoint,
  required,
  readOnly,
  size,
  enableInternalError,
  enableInternalWarning,
  tooltipPosition,
  helpAriaLabel,
  dayRef,
  monthRef,
  yearRef,
  ...rest
}: NumeralDateProps<DateType>) => {
  const locale = useLocale();
  const { validationRedesignOptIn } = useContext(NewValidationContext);

  const { current: uniqueId } = useRef(id || guid());
  const isControlled = useRef(value !== undefined);
  const initialValue = isControlled.current ? value : defaultValue;

  const refs = useRef<(HTMLInputElement | null)[]>(dateFormat.map(() => null));

  const labelIds = useRef([guid(), guid(), guid()]);

  const [internalMessages, setInternalMessages] = useState<DateType>({
    ...((Object.fromEntries(
      dateFormat.map((datePart) => [datePart, ""])
    ) as Partial<FullDate>) as DateType),
  });

  const hasCorrectDateFormat = useMemo(() => {
    const isAllowed =
      !dateFormat ||
      ALLOWED_DATE_FORMATS.find(
        (allowedDateFormat) =>
          JSON.stringify(allowedDateFormat) === JSON.stringify(dateFormat)
      );
    return isAllowed;
  }, [dateFormat]);

  invariant(hasCorrectDateFormat, incorrectDateFormatMessage);

  useEffect(() => {
    const modeSwitchedMessage =
      "Input elements should not switch from uncontrolled to controlled (or vice versa). " +
      "Decide between using a controlled or uncontrolled input element for the lifetime of the component";

    invariant(
      isControlled.current === (value !== undefined),
      modeSwitchedMessage
    );
  }, [value]);

  const validationMessages = {
    dd: locale.numeralDate.validation.day(),
    mm: locale.numeralDate.validation.month(),
    yyyy: locale.numeralDate.validation.year(),
  };

  const [dateValue, setDateValue] = useState<DateType>({
    ...((initialValue ||
      (Object.fromEntries(
        dateFormat.map((datePart) => [datePart, ""])
      ) as Partial<FullDate>)) as DateType),
  });

  const createCustomEventObject = (
    newValue: DateType
  ): NumeralDateEvent<DateType> => ({
    target: {
      name,
      id: uniqueId,
      value: newValue,
    },
  });

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isValidKey =
      Events.isNumberKey(event) ||
      Events.isTabKey(event) ||
      event.key === "Delete" ||
      event.key === "Backspace";

    if (!isValidKey) {
      event.preventDefault();
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    datePart: keyof NumeralDateObject
  ) => {
    const { value: newValue } = event.target;

    if (newValue.length <= datePart.length) {
      const newDateValue: DateType = {
        ...dateValue,
        [datePart]: newValue,
      };
      setDateValue(newDateValue);

      /* istanbul ignore else */
      if (onChange) {
        onChange(createCustomEventObject(newDateValue));
      }
    }
  };

  const handleBlur = (datePart: keyof NumeralDateObject) => {
    const internalValidationEnabled =
      enableInternalError || enableInternalWarning;
    /* istanbul ignore else */
    if (internalValidationEnabled) {
      const newDatePart: string = dateValue[datePart];
      const errorMessage = validations[datePart](newDatePart)
        ? ""
        : validationMessages[datePart];

      setInternalMessages((prev) => ({
        ...prev,
        [datePart]: errorMessage,
      }));
    }
    setTimeout(() => {
      const hasBlurred = !refs.current.find(
        (ref) => ref === document.activeElement
      );
      /* istanbul ignore else */
      if (onBlur && hasBlurred) {
        onBlur(createCustomEventObject(dateValue));
      }
    }, 5);
  };

  const internalMessage = (Object.keys(
    internalMessages
  ) as (keyof DateType)[]).reduce(
    (combinedMessage, datePart) =>
      internalMessages[datePart]
        ? `${combinedMessage + internalMessages[datePart]}\n`
        : combinedMessage,
    ""
  );
  const internalError = enableInternalError ? internalMessage + error : error;

  const internalWarning = enableInternalWarning
    ? internalMessage + warning
    : warning;

  if (!deprecateUncontrolledWarnTriggered && !isControlled.current) {
    deprecateUncontrolledWarnTriggered = true;
    Logger.deprecate(
      "Uncontrolled behaviour in `Numeral Date` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
    );
  }

  return (
    <TooltipProvider helpAriaLabel={helpAriaLabel}>
      <InputGroupBehaviour>
        <FormField
          data-component={dataComponent}
          data-element={dataElement}
          data-role={dataRole}
          disabled={disabled}
          useValidationIcon={validationOnLabel}
          id={uniqueId}
          error={internalError}
          warning={internalWarning}
          info={info}
          label={label}
          labelInline={labelInline}
          labelWidth={labelWidth}
          labelAlign={labelAlign}
          labelHelp={!validationRedesignOptIn && labelHelp}
          labelSpacing={labelSpacing}
          fieldHelp={fieldHelp}
          adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
          isRequired={required}
          validationRedesignOptIn={validationRedesignOptIn}
          {...filterStyledSystemMarginProps(rest)}
        >
          {validationRedesignOptIn && labelHelp && (
            <StyledHintText>{labelHelp}</StyledHintText>
          )}

          <Box position="relative">
            {validationRedesignOptIn && (
              <>
                <ValidationMessage
                  error={internalError}
                  warning={internalWarning}
                />

                {(internalError || internalWarning) && (
                  <ErrorBorder
                    warning={!!(!internalError && internalWarning)}
                  />
                )}
              </>
            )}

            <StyledNumeralDate
              name={name}
              onKeyDown={onKeyDown}
              data-component="numeral-date"
            >
              {dateFormat.map((datePart, index) => {
                const isEnd = index === dateFormat.length - 1;

                const labelId = labelIds.current[index];
                const validation = internalError || internalWarning || info;
                const isStringValidation = typeof validation === "string";
                const hasValidationIcon =
                  isStringValidation && !!validation.length;

                let inputRef: React.ForwardedRef<HTMLInputElement> | undefined;

                switch (datePart.slice(0, 2)) {
                  case "dd":
                    inputRef = dayRef;
                    break;
                  case "mm":
                    inputRef = monthRef;
                    break;
                  case "yy":
                    inputRef = yearRef;
                    break;
                  /* istanbul ignore next */
                  default:
                    break;
                }

                return (
                  <NumeralDateContext.Provider
                    value={{ disableErrorBorder: true }}
                    key={datePart}
                  >
                    <StyledDateField
                      key={datePart}
                      isYearInput={datePart.length === 4}
                      isEnd={isEnd}
                      hasValidationIconInField={
                        hasValidationIcon &&
                        !validationOnLabel &&
                        !validationRedesignOptIn
                      }
                    >
                      <FormSpacingProvider marginBottom={undefined}>
                        <Typography mb="4px" id={labelId}>
                          {getDateLabel(datePart, locale)}
                        </Typography>
                        <Textbox
                          {...(index === 0 && { id: uniqueId })}
                          disabled={disabled}
                          readOnly={readOnly}
                          value={dateValue[datePart as keyof NumeralDateObject]}
                          onChange={(e) =>
                            handleChange(e, datePart as keyof NumeralDateObject)
                          }
                          ref={(element) => {
                            refs.current[index] = element;
                            if (!inputRef) {
                              return;
                            }
                            if (typeof inputRef === "function") {
                              inputRef(element);
                            } else {
                              inputRef.current = element;
                            }
                          }}
                          onBlur={() =>
                            handleBlur(datePart as keyof NumeralDateObject)
                          }
                          error={!!internalError}
                          warning={!!internalWarning}
                          info={!!info}
                          {...(required && { required })}
                          {...(isEnd &&
                            !validationRedesignOptIn &&
                            !validationOnLabel && {
                              error: internalError,
                              warning: internalWarning,
                              info,
                            })}
                          size={size}
                          tooltipPosition={tooltipPosition}
                          aria-labelledby={labelId}
                        />
                      </FormSpacingProvider>
                    </StyledDateField>
                  </NumeralDateContext.Provider>
                );
              })}
            </StyledNumeralDate>
          </Box>
        </FormField>
      </InputGroupBehaviour>
    </TooltipProvider>
  );
};

export default NumeralDate;
