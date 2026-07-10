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
} from "../../utils";

export interface CustomDateEvent {
  type: string;
  target: {
    id?: string;
    name?: string;
    value: string;
  };
}

interface BuildDateChangeEventProps {
  allowEmptyValue?: boolean;
  event: CustomDateEvent;
  format: string;
  formats: string[];
  selectedDate?: Date;
}

interface GetDateInputValueProps {
  format: string;
  formats: string[];
  isInitialValue: boolean;
  value: string;
}

const getInvalidRawValue = (inputValue: string, allowEmptyValue?: boolean) =>
  allowEmptyValue && !inputValue.length ? inputValue : null;

export const getInitialSelectedDate = (
  value: string,
  dateFnsLocale: Locale,
  format: string,
) => {
  if (!isValidLocaleDate(value, dateFnsLocale)) {
    return undefined;
  }

  return checkISOFormatAndLength(value)
    ? parseISODate(value)
    : parseDate(format, value);
};

export const getSelectedDateFromValue = (
  value: string,
  formats: string[],
  isInitialValue: boolean,
) => {
  const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
    value,
    formats,
  );

  if (
    matchedFormat &&
    matchedValue &&
    isDateValid(parseDate(matchedFormat, matchedValue))
  ) {
    return parseDate(...additionalYears(matchedFormat, matchedValue));
  }

  if (checkISOFormatAndLength(value) && isInitialValue) {
    return parseISODate(value);
  }

  return undefined;
};

export const buildDateChangeEvent = ({
  allowEmptyValue,
  event,
  format,
  formats,
  selectedDate,
}: BuildDateChangeEventProps) => {
  const { id, name, value } = event.target;

  const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
    value,
    formats,
  );

  const formattedValueString =
    event.type === "blur" ? formattedValue(format, selectedDate) : value;
  const rawValue = isDateValid(parseDate(matchedFormat, matchedValue))
    ? formatToISO(...additionalYears(matchedFormat, matchedValue))
    : getInvalidRawValue(value, allowEmptyValue);

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

export const getCurrentMatchedValue = (
  value: string,
  format: string,
  formats: string[],
) => {
  const currentValue = checkISOFormatAndLength(value)
    ? formattedValue(format, parseISODate(value))
    : value;
  const [, matchedValue] = findMatchedFormatAndValue(currentValue, formats);

  return matchedValue;
};

export const getDateInputValue = ({
  format,
  formats,
  isInitialValue,
  value,
}: GetDateInputValueProps) => {
  if (checkISOFormatAndLength(value) && isInitialValue) {
    return {
      inputValue: formattedValue(format, parseISODate(value)),
      shouldMarkInitialValueChanged: false,
    };
  }

  const valueSeparator = getSeparator(value);
  const formatSeparator = getSeparator(format);
  const valueWithFormatSeparators = value
    .split("")
    .map((char) => (char === valueSeparator ? formatSeparator : char))
    .join("");

  if (
    isInitialValue &&
    valueSeparator !== formatSeparator &&
    isDateValid(parseDate(format, valueWithFormatSeparators))
  ) {
    const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
      valueWithFormatSeparators,
      formats,
    );

    return {
      inputValue: formattedValue(
        format,
        parseDate(...additionalYears(matchedFormat, matchedValue)),
      ),
      shouldMarkInitialValueChanged: true,
    };
  }

  return {
    inputValue: value,
    shouldMarkInitialValueChanged: false,
  };
};
