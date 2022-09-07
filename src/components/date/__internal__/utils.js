import { format, formatISO, isMatch, parse, parseISO } from "date-fns/fp";

export function parseDate(formatString, valueString) {
  if (!valueString || !formatString) return null;

  return parse(new Date(), formatString, valueString);
}

export function formatToISO(formatString, valueString) {
  const dateValue = parseDate(formatString, valueString);

  if (!isDateValid(dateValue)) {
    return null;
  }

  return formatISO(dateValue).split("T")[0];
}

export function formattedValue(formatString, value) {
  return format(formatString, value);
}

export function isDateValid(date) {
  return date && date.toString() !== "Invalid Date";
}

function hasMatchedFormat(formatString, valueString, fullFormat, fullValue) {
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

const THRESHOLD_FOR_ADDITIONAL_YEARS = 69;

export function additionalYears(formatString, value) {
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
    dayAndMonthStringEndIndex
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

function makeSeparatedValues(arr, str) {
  return arr.map((_, i) => str.substring(arr[i], arr[i + 1]));
}

function checkForCompleteMatch(formatArray, valueArray) {
  return formatArray.every((formatString, i) =>
    hasMatchedFormat(formatString, valueArray[i], formatArray, valueArray)
  );
}

function findMatchWithNoSeparators(valueString, formatString) {
  const indexArray = formatString.split("").reduce((arr, char, index) => {
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

function findMatchWithSeparators(valueString, formatString, separator) {
  const formatArray = formatString.split(separator);
  const valueArray = valueString.split(separator);

  if (checkForCompleteMatch(formatArray, valueArray)) {
    return [formatString, valueString];
  }

  return null;
}

export const getSeparator = (value) => {
  const separator = ["", ".", ",", "-", "/", " ", ":"]
    .slice(1)
    .find((char) => value.includes(char));

  return separator || "";
};

export function findMatchedFormatAndValue(valueString, formats) {
  if (!valueString) {
    return ["", ""];
  }

  const valueSeparator = getSeparator(valueString);
  const filteredFormats = formats.filter(
    (formatString) =>
      formatString.length === valueString.length &&
      getSeparator(formatString) === valueSeparator
  );

  const matchedFormatAndValue = filteredFormats.reduce((acc, formatString) => {
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
        valueSeparator
      );

      if (match) {
        return match;
      }
    }
    return acc;
  }, []);

  return matchedFormatAndValue;
}

export function parseISODate(value) {
  return parseISO(value);
}

/**
 * Returns the disabled array of days specified by props maxDate and minDate
 */
export function getDisabledDays(minDate, maxDate) {
  const days = [];

  if (!minDate && !maxDate) {
    return null;
  }

  if (checkISOFormatAndLength(minDate)) {
    days.push({ before: parseISODate(minDate) });
  }

  if (checkISOFormatAndLength(maxDate)) {
    days.push({ after: parseISODate(maxDate) });
  }

  return days;
}

export function checkISOFormatAndLength(value) {
  if (!value || value.length !== 10 || !isValidISODate(value)) {
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

function isValidISODate(dateString) {
  return parseISODate(dateString).toString() !== "Invalid Date";
}
