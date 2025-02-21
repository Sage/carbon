import type { Locale, Matcher } from "react-day-picker";

import {
  format,
  formatISO,
  isMatch,
  isValid,
  parse,
  parseISO,
  parseWithOptions,
} from "./date-fns-fp";

const DATE_STRING_LENGTH = 10;
const THRESHOLD_FOR_ADDITIONAL_YEARS = 69;

export function isValidLocaleDate(date: string, locale: Locale) {
  const dateFormat = "P";
  const parseDateWithLocale = parseWithOptions({ locale });
  const parsedDate = parseDateWithLocale(new Date(), dateFormat, date);
  const isValidDate = isValid(parsedDate);

  return isValidDate;
}

export function parseDate(formatString?: string, valueString?: string) {
  if (!valueString || !formatString) return undefined;

  return parse(new Date(), formatString, valueString);
}

export function isDateValid(date?: Date) {
  return date && date.toString() !== "Invalid Date";
}

export function formatToISO(formatString?: string, valueString?: string) {
  const dateValue = parseDate(formatString, valueString);

  if (!dateValue || !isDateValid(dateValue)) {
    return null;
  }

  return formatISO(dateValue).split("T")[0];
}

export function formattedValue(formatString: string, value?: Date) {
  if (!value) return "";
  return format(formatString, value);
}

function hasMatchedFormat(
  formatString: string,
  valueString: string,
  fullFormat: string[],
  fullValue: string[],
) {
  if (formatString.includes("d")) {
    return (
      formatString.length === valueString.length &&
      isMatch(fullFormat.join("."), fullValue.join(".")) // need to check day value with month value
    );
  }

  return (
    formatString.length === valueString.length &&
    isMatch(formatString, valueString)
  );
}

export function additionalYears(formatString: string, value: string) {
  if (formatString.split("y").length - 1 !== 2) {
    return [formatString, value];
  }

  const formatStartWithYear = formatString.startsWith("yy");
  const yearStringStartIndex = formatStartWithYear ? 0 : value.length - 2;
  const yearStringEndIndex = formatStartWithYear ? 2 : value.length;
  const dayAndMonthStringStartIndex = formatStartWithYear
    ? yearStringEndIndex
    : 0;
  const dayAndMonthStringEndIndex = formatStartWithYear
    ? value.length
    : value.length - 2;

  let year = value.substring(yearStringStartIndex, yearStringEndIndex);
  const dayAndMonth = value.substring(
    dayAndMonthStringStartIndex,
    dayAndMonthStringEndIndex,
  );
  const yearAsNumber = Number(year);

  if (yearAsNumber < THRESHOLD_FOR_ADDITIONAL_YEARS) {
    year = String(2000 + yearAsNumber);
  } else {
    year = String(1900 + yearAsNumber);
  }

  if (formatStartWithYear) {
    return [
      `yyyy${formatString.substring(2, formatString.length)}`,
      `${year}${dayAndMonth}`,
    ];
  }

  return [
    `${formatString.substring(0, formatString.length - 2)}yyyy`,
    `${dayAndMonth}${year}`,
  ];
}

function makeSeparatedValues(arr: number[], str: string) {
  return arr.map((_, i) => str.substring(arr[i], arr[i + 1]));
}

function checkForCompleteMatch(formatArray: string[], valueArray: string[]) {
  return formatArray.every((formatString, i) =>
    hasMatchedFormat(formatString, valueArray[i], formatArray, valueArray),
  );
}

function findMatchWithNoSeparators(valueString: string, formatString: string) {
  const indexArray = formatString
    .split("")
    .reduce((arr: number[], char: string, index: number) => {
      if (index === 0 || char !== formatString[index - 1]) {
        return [...arr, index];
      }
      return arr;
    }, []);

  const formatArray = makeSeparatedValues(indexArray, formatString);
  const valueArray = makeSeparatedValues(indexArray, valueString);

  if (checkForCompleteMatch(formatArray, valueArray)) {
    return [formatArray.join(" "), valueArray.join(" ")];
  }

  return null;
}

function findMatchWithSeparators(
  valueString: string,
  formatString: string,
  separator: string,
) {
  const formatArray = formatString.split(separator);
  const valueArray = valueString.split(separator);

  if (checkForCompleteMatch(formatArray, valueArray)) {
    return [formatString, valueString];
  }

  return null;
}

export const getSeparator = (value: string) => {
  const separator = ["", ".", ",", "-", "/", " ", ":"]
    .slice(1)
    .find((char) => value.includes(char));

  return separator || "";
};

export function findMatchedFormatAndValue(
  valueString: string,
  formats: string[],
) {
  if (!valueString) {
    return ["", ""];
  }

  const valueSeparator = getSeparator(valueString);
  const filteredFormats = formats.filter(
    (formatString) =>
      formatString.length === valueString.length &&
      getSeparator(formatString) === valueSeparator,
  );

  const matchedFormatAndValue = filteredFormats.reduce(
    (acc: string[], formatString: string) => {
      const formatSeparator = getSeparator(formatString);
      if (valueSeparator === "" && formatSeparator === "") {
        // This check is added as there is a bug in date-fns https://github.com/date-fns/date-fns/issues/2785
        // it incorrectly matches or fails to parse valid dates with no separators
        const match = findMatchWithNoSeparators(valueString, formatString);

        if (match) {
          return match;
        }
      }

      if (
        valueSeparator &&
        formatSeparator &&
        valueSeparator === formatSeparator
      ) {
        const match = findMatchWithSeparators(
          valueString,
          formatString,
          valueSeparator,
        );

        if (match) {
          return match;
        }
      }
      return acc;
    },
    [],
  );

  return matchedFormatAndValue;
}

export function parseISODate(value: string) {
  return parseISO(value);
}

function isValidISODate(dateString: string) {
  return parseISODate(dateString).toString() !== "Invalid Date";
}

export function checkISOFormatAndLength(value: string) {
  if (value.length !== DATE_STRING_LENGTH || !isValidISODate(value)) {
    return false;
  }
  const array = value.split("-");
  return (
    array.length === 3 &&
    array[0].length === 4 &&
    array[1].length === 2 &&
    array[2].length === 2
  );
}

/**
 * Returns the disabled array of days specified by props maxDate and minDate
 */
export function getDisabledDays(
  minDate = "",
  maxDate = "",
): NonNullable<Matcher> | NonNullable<Matcher[]> | undefined {
  const days = [];

  if (!minDate && !maxDate) {
    return undefined;
  }

  if (checkISOFormatAndLength(minDate)) {
    days.push({ before: parseISODate(minDate) });
  }

  if (checkISOFormatAndLength(maxDate)) {
    days.push({ after: parseISODate(maxDate) });
  }

  return days;
}
