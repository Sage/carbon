import { useCallback, useMemo } from "react";

import useLocale from "../../../hooks/__internal__/useLocale";
import getFormatData from "../../date/__internal__/date-formats";
import {
  checkISOFormatAndLength,
  formatToISO,
  formattedValue as formatDisplayDate,
  isDateValid,
  parseDate,
  parseISODate,
} from "../../date/__internal__/utils/utils";
import type {
  DateInputValue,
  DateRangeChangeEvent,
} from "../date-range.component";

const useDateRangeValue = ({
  dateFormatOverride,
  id,
  name,
}: {
  dateFormatOverride?: string;
  id?: string;
  name?: string;
}) => {
  const localeDate = useLocale().date;
  const { format } = useMemo(
    () =>
      getFormatData(
        localeDate.dateFnsLocale(),
        dateFormatOverride || localeDate.dateFormatOverride,
      ),
    [localeDate, dateFormatOverride],
  );

  const toDisplayValue = useCallback(
    (value: string) =>
      checkISOFormatAndLength(value)
        ? formatDisplayDate(format, parseISODate(value))
        : value,
    [format],
  );

  const toDate = useCallback(
    (value?: string): Date | undefined => {
      if (!value) return undefined;

      const date = parseDate(format, toDisplayValue(value));
      return isDateValid(date) ? date : undefined;
    },
    [toDisplayValue, format],
  );

  const toDateInputValue = useCallback(
    (
      value: string,
      { allowEmptyValue }: { allowEmptyValue?: boolean },
    ): DateInputValue => {
      const formattedValue = toDisplayValue(value);
      const canBeEmpty = allowEmptyValue && formattedValue === "";

      return {
        formattedValue,
        rawValue: canBeEmpty ? "" : formatToISO(format, formattedValue),
      };
    },
    [toDisplayValue, format],
  );

  const toRangeChangeEvent = useCallback(
    (start: DateInputValue, end: DateInputValue): DateRangeChangeEvent => ({
      target: {
        ...(name && { name }),
        ...(id && { id }),
        value: [start, end],
      },
    }),
    [id, name],
  );

  return {
    format,
    toDisplayValue,
    toDate,
    toDateInputValue,
    toRangeChangeEvent,
  };
};

export default useDateRangeValue;
