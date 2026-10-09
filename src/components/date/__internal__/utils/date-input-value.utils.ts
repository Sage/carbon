import type { Locale } from "react-day-picker";

import {
  additionalYears,
  checkISOFormatAndLength,
  findMatchedFormatAndValue,
  formatToISO,
  formattedValue,
  getSeparator,
  isDateValid,
  isValidLocaleDate,
  parseDate,
  parseISODate,
} from "./utils";

export interface DateInputEvent {
  type: "blur" | "change" | "click";
  target: {
    id?: string;
    name?: string;
    value: string;
  };
}

interface BuildDateChangeEventOptions {
  allowEmptyValue?: boolean;
  event: DateInputEvent;
  format: string;
  formats: string[];
  selectedDate?: Date;
}

const getMatchedDate = (value: string, formats: string[]) => {
  const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
    value,
    formats,
  );

  if (!matchedFormat || !matchedValue) {
    return {
      date: undefined,
      normalizedFormat: "",
      normalizedValue: "",
    };
  }

  const [normalizedFormat, normalizedValue] = additionalYears(
    matchedFormat,
    matchedValue,
  );
  const date = parseDate(normalizedFormat, normalizedValue);

  return {
    date: isDateValid(date) ? date : undefined,
    normalizedFormat,
    normalizedValue,
  };
};

export const getInitialSelectedDate = (
  value: string,
  dateFnsLocale: Locale,
  format: string,
) => {
  if (checkISOFormatAndLength(value)) {
    return parseISODate(value);
  }

  if (!isValidLocaleDate(value, dateFnsLocale)) {
    return undefined;
  }

  return parseDate(format, value);
};

export const getSelectedDate = (
  value: string,
  formats: string[],
  shouldParseISOValue: boolean,
) => {
  const { date } = getMatchedDate(value, formats);

  if (date) {
    return date;
  }

  if (checkISOFormatAndLength(value) && shouldParseISOValue) {
    return parseISODate(value);
  }

  return undefined;
};

export const getDisplayValue = (
  value: string,
  format: string,
  formats: string[],
  shouldFormatValue: boolean,
) => {
  if (checkISOFormatAndLength(value) && shouldFormatValue) {
    return formattedValue(format, parseISODate(value));
  }

  const valueSeparator = getSeparator(value);
  const formatSeparator = getSeparator(format);
  const valueWithFormatSeparators = value
    .split("")
    .map((char) => (char === valueSeparator ? formatSeparator : char))
    .join("");

  if (
    shouldFormatValue &&
    valueSeparator !== formatSeparator &&
    isDateValid(parseDate(format, valueWithFormatSeparators))
  ) {
    const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
      valueWithFormatSeparators,
      formats,
    );

    return formattedValue(
      format,
      parseDate(...additionalYears(matchedFormat, matchedValue)),
    );
  }

  return value;
};

export const getDateInputState = (
  value: string,
  format: string,
  formats: string[],
  shouldFormatValue: boolean,
) => ({
  displayValue: getDisplayValue(value, format, formats, shouldFormatValue),
  selectedDate: getSelectedDate(value, formats, shouldFormatValue),
});

const getRawValueForInvalidInput = (
  inputValue: string,
  allowEmptyValue?: boolean,
) => (allowEmptyValue && !inputValue.length ? inputValue : null);

export const buildDateChangeEvent = ({
  allowEmptyValue,
  event,
  format,
  formats,
  selectedDate,
}: BuildDateChangeEventOptions) => {
  const {
    type,
    target: { id, name, value: inputValue },
  } = event;
  const { date, normalizedFormat, normalizedValue } = getMatchedDate(
    inputValue,
    formats,
  );
  const formattedValueString =
    type === "blur" && isDateValid(selectedDate)
      ? formattedValue(format, selectedDate)
      : inputValue;
  const rawValue = date
    ? formatToISO(normalizedFormat, normalizedValue)
    : getRawValueForInvalidInput(inputValue, allowEmptyValue);

  return {
    target: {
      ...(name && { name }),
      ...(id && { id }),
      value: {
        formattedValue: formattedValueString,
        rawValue,
      },
    },
  };
};
