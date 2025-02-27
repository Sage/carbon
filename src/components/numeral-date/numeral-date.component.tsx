import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import invariant from "invariant";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import { ValidationProps } from "../../__internal__/validations";
import { filterStyledSystemMarginProps } from "../../style/utils";
import Events from "../../__internal__/utils/helpers/events";
import {
  StyledNumeralDate,
  StyledDateField,
  StyledFieldset,
} from "./numeral-date.style";
import Textbox from "../textbox";
import Box from "../box";
import ErrorBorder from "../textbox/textbox.style";
import ValidationMessage from "../../__internal__/validation-message";
import guid from "../../__internal__/utils/helpers/guid";
import useLocale from "../../hooks/__internal__/useLocale";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import NewValidationContext from "../carbon-provider/__internal__/new-validation.context";
import NumeralDateContext from "./__internal__/numeral-date.context";
import Logger from "../../__internal__/utils/logger";
import Locale from "../../locales/locale";
import FieldHelp from "../../__internal__/field-help";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility";
import HintText from "../../__internal__/hint-text";

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

export type NumeralDateObject = DayMonthDate | MonthYearDate | FullDate;

export interface NumeralDateEvent<
  DateType extends NumeralDateObject = FullDate,
> {
  target: {
    name?: string;
    id: string;
    value: DateType;
  };
}

export interface NumeralDateProps<DateType extends NumeralDateObject = FullDate>
  extends ValidationProps,
    MarginProps,
    TagProps {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
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
  /** [Legacy] Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /** `id` for events */
  id?: string;
  /** `name` for events */
  name?: string;
  /** Label */
  label?: string;
  /** Label alignment */
  labelAlign?: "left" | "right";
  /** Field labels alignment */
  fieldLabelsAlign?: "left" | "right";
  /**
   * Text applied to label help tooltip, will be rendered as
   * hint text when `validationRedesignOptIn` is true.
   */
  labelHelp?: React.ReactNode;
  /** [Legacy] When true, label is placed in line with an input */
  labelInline?: boolean;
  /** [Legacy] Label width */
  labelWidth?: number;
  /** [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Blur event handler */
  onBlur?: (ev: NumeralDateEvent<DateType>) => void;
  /** Change event handler */
  onChange?: (ev: NumeralDateEvent<DateType>) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /** [Legacy] When true, validation icons will be placed on labels instead of being placed on the inputs */
  validationOnLabel?: boolean;
  /** [Legacy] Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** [Legacy] Aria label for rendered help component */
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
  /** Flag to configure component as optional. */
  isOptional?: boolean;
}

export type ValidDateFormat = (typeof ALLOWED_DATE_FORMATS)[number];

const incorrectDateFormatMessage =
  "Forbidden prop dateFormat supplied to NumeralDate. " +
  "Only one of these date formats is allowed: " +
  "['dd', 'mm', 'yyyy'], " +
  "['mm', 'dd', 'yyyy'], " +
  "['yyyy', 'mm', 'dd'], " +
  "['dd', 'mm'], " +
  "['mm', 'dd'], " +
  "['mm', 'yyyy']";

const getMonthsForLocale = (localeName: string) => {
  const year = new Date().getFullYear();
  const { format } = new Intl.DateTimeFormat(localeName, { month: "long" });

  return [...Array(12).keys()].map((m) => format(new Date(Date.UTC(year, m))));
};

const validationMessages = (
  locale: Locale,
  month?: string,
  daysInMonth?: string,
) => ({
  dd: locale.numeralDate.validation.day(
    month ? getMonthsForLocale(locale.locale())[+month - 1] : undefined,
    daysInMonth,
  ),
  mm: locale.numeralDate.validation.month(),
  yyyy: locale.numeralDate.validation.year(),
});

const getDaysInMonth = (month?: string, year?: string) => {
  if (!month || +month > 12 || +month < 1) {
    return 31;
  }
  const currentDate = new Date();
  const computedYear = +(year || currentDate.getFullYear());

  // passing 0 as the third argument ensures we handle for months being 0 indexed
  return new Date(computedYear, +month, 0).getDate();
};

const validate = (locale: Locale, { dd, mm, yyyy }: Partial<FullDate>) => {
  const failed = {
    dd: "",
    mm: "",
    yyyy: "",
  };
  const daysInMonth = getDaysInMonth(mm, yyyy);

  if (dd && (+dd > daysInMonth || +dd < 1)) {
    failed.dd = validationMessages(locale, mm, String(daysInMonth)).dd;
  }

  if (mm && (+mm > 12 || +mm < 1)) {
    failed.mm = validationMessages(locale).mm;
  }

  if (yyyy && (+yyyy < 1800 || +yyyy > 2200)) {
    failed.yyyy = validationMessages(locale).yyyy;
  }

  return failed;
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
  fieldLabelsAlign,
  labelHelp,
  labelSpacing,
  fieldHelp,
  adaptiveLabelBreakpoint,
  required,
  isOptional,
  readOnly,
  size = "medium",
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
  const inputIds = useRef({ dd: guid(), mm: guid(), yyyy: guid() });
  const inputHintId = useRef(guid());
  const isControlled = useRef(value !== undefined);
  const initialValue = isControlled.current ? value : defaultValue;

  const refs = useRef<(HTMLInputElement | null)[]>(dateFormat.map(() => null));

  const [internalMessages, setInternalMessages] = useState<DateType>({
    ...(Object.fromEntries(
      dateFormat.map((datePart) => [datePart, ""]),
    ) as Partial<FullDate> as DateType),
  });

  const hasCorrectDateFormat = useMemo(() => {
    const isAllowed =
      !dateFormat ||
      ALLOWED_DATE_FORMATS.find(
        (allowedDateFormat) =>
          JSON.stringify(allowedDateFormat) === JSON.stringify(dateFormat),
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
      modeSwitchedMessage,
    );
  }, [value]);

  const [dateValue, setDateValue] = useState<DateType>({
    ...((initialValue ||
      (Object.fromEntries(
        dateFormat.map((datePart) => [datePart, ""]),
      ) as Partial<FullDate>)) as DateType),
  });

  const createCustomEventObject = (
    newValue: DateType,
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
      Events.isEnterKey(event) ||
      event.key === "Delete" ||
      event.key === "Backspace";

    if (!isValidKey) {
      event.preventDefault();
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    datePart: keyof NumeralDateObject,
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

  const handleBlur = () => {
    const internalValidationEnabled =
      enableInternalError || enableInternalWarning;
    /* istanbul ignore else */
    if (internalValidationEnabled) {
      setInternalMessages((prev) => ({
        ...prev,
        ...validate(locale, dateValue),
      }));
    }
    setTimeout(() => {
      const hasBlurred = !refs.current.find(
        (ref) => ref === document.activeElement,
      );
      /* istanbul ignore else */
      if (onBlur && hasBlurred) {
        onBlur(createCustomEventObject(dateValue));
      }
    }, 5);
  };

  const internalMessage = (
    Object.keys(internalMessages) as (keyof DateType)[]
  ).reduce(
    (combinedMessage, datePart) =>
      internalMessages[datePart]
        ? `${combinedMessage + internalMessages[datePart]}\n`
        : combinedMessage,
    "",
  );
  const internalError = enableInternalError ? internalMessage + error : error;

  const internalWarning = enableInternalWarning
    ? internalMessage + warning
    : warning;

  if (!deprecateUncontrolledWarnTriggered && !isControlled.current) {
    deprecateUncontrolledWarnTriggered = true;
    Logger.deprecate(
      "Uncontrolled behaviour in `Numeral Date` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
    );
  }

  const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
  let inline: boolean | undefined = labelInline;
  if (adaptiveLabelBreakpoint) {
    inline = largeScreen;
  }

  const handleRef = (
    element: HTMLInputElement | null,
    index: number,
    inputRef: React.ForwardedRef<HTMLInputElement> | undefined,
  ) => {
    refs.current[index] = element;
    if (!inputRef) {
      return;
    }
    if (typeof inputRef === "function") {
      inputRef(element);
    } else {
      inputRef.current = element;
    }
  };

  const { validationId, fieldHelpId, ariaDescribedBy } = useInputAccessibility({
    id: uniqueId,
    // we still want to add the validationId to aria-describedby with the legacy validation
    validationRedesignOptIn: true,
    error: internalError,
    warning: internalWarning,
    info,
    fieldHelp,
  });

  const combinedAriaDescribedBy = [ariaDescribedBy, inputHintId.current]
    .filter(Boolean)
    .join(" ");

  const renderInputs = () => {
    return (
      <StyledNumeralDate onKeyDown={onKeyDown}>
        {dateFormat.map((datePart, index) => {
          const isEnd = index === dateFormat.length - 1;
          let inputRef: React.ForwardedRef<HTMLInputElement> | undefined;

          const validation = internalError || internalWarning || info;
          const validationInField =
            !validationRedesignOptIn &&
            typeof validation === "string" &&
            validation !== "";

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
                size={size}
                isYearInput={datePart.length === 4}
                hasValidationIconInField={
                  !validationOnLabel && isEnd && validationInField
                }
              >
                <Textbox
                  id={inputIds.current[datePart]}
                  label={getDateLabel(datePart, locale)}
                  labelAlign={fieldLabelsAlign}
                  disabled={disabled}
                  readOnly={readOnly}
                  error={!!internalError}
                  warning={!!internalWarning}
                  info={!!info}
                  size={size}
                  value={dateValue[datePart as keyof NumeralDateObject]}
                  onChange={(e) =>
                    handleChange(e, datePart as keyof NumeralDateObject)
                  }
                  onBlur={handleBlur}
                  ref={(element) => handleRef(element, index, inputRef)}
                  {...(isEnd &&
                    !validationOnLabel &&
                    !validationRedesignOptIn && {
                      error: internalError,
                      warning: internalWarning,
                      info,
                    })}
                  tooltipPosition={tooltipPosition}
                  tooltipId={validationId}
                />
              </StyledDateField>
            </NumeralDateContext.Provider>
          );
        })}
      </StyledNumeralDate>
    );
  };

  if (!validationRedesignOptIn) {
    return (
      <TooltipProvider helpAriaLabel={helpAriaLabel}>
        <StyledFieldset
          id={uniqueId}
          legend={label}
          legendMargin={{ mb: 0 }}
          isRequired={required}
          isOptional={isOptional}
          isDisabled={disabled}
          name={name}
          error={validationOnLabel && internalError}
          warning={validationOnLabel && internalWarning}
          info={validationOnLabel && info}
          inline={inline}
          size={size}
          labelHelp={labelHelp}
          legendAlign={labelAlign}
          legendWidth={labelWidth}
          legendSpacing={labelSpacing}
          validationId={validationId}
          aria-describedby={validationOnLabel ? ariaDescribedBy : fieldHelpId}
          {...filterStyledSystemMarginProps(rest)}
          {...tagComponent("numeral-date", rest)}
        >
          <Box display="flex" flexDirection="column" mt={inline ? 0 : 1}>
            {renderInputs()}
            {fieldHelp && <FieldHelp id={fieldHelpId}>{fieldHelp}</FieldHelp>}
          </Box>
        </StyledFieldset>
      </TooltipProvider>
    );
  }

  return (
    <StyledFieldset
      id={uniqueId}
      legend={label}
      legendMargin={{ mb: 0 }}
      legendAlign={labelAlign}
      isRequired={required}
      isOptional={isOptional}
      isDisabled={disabled}
      name={name}
      aria-describedby={combinedAriaDescribedBy}
      {...filterStyledSystemMarginProps(rest)}
      {...tagComponent("numeral-date", rest)}
    >
      {labelHelp && (
        <HintText align={labelAlign} id={inputHintId.current}>
          {labelHelp}
        </HintText>
      )}

      <Box position="relative" mt={labelHelp ? 0 : 1}>
        {(internalError || internalWarning) && (
          <>
            <ValidationMessage
              error={internalError}
              warning={internalWarning}
              validationId={validationId}
            />
            <ErrorBorder warning={!!(!internalError && internalWarning)} />
          </>
        )}
        {renderInputs()}
      </Box>
    </StyledFieldset>
  );
};

export default NumeralDate;
