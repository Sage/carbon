import { useMemo } from "react";
import type { Day } from "date-fns";

import useLocale from "../../../../hooks/__internal__/useLocale";

/** Derives localized picker labels and weekday names. */
const useDatePickerLocale = (mode: "single" | "range" = "single") => {
  const locale = useLocale();
  const dateFnsLocale = locale.date.dateFnsLocale();
  const { localize, options } = dateFnsLocale;
  const localeLanguage = dateFnsLocale.code.split("-")[0].toLowerCase();
  const { weekdaysLong, weekdaysShort } = useMemo(() => {
    const useWideWeekday = ["de", "pl"].includes(localeLanguage);

    return {
      weekdaysLong: Array.from({ length: 7 }, (_, index) =>
        localize.day(index as Day),
      ),
      weekdaysShort: Array.from({ length: 7 }, (_, index) =>
        localize
          .day(index as Day, {
            width: useWideWeekday ? "wide" : "abbreviated",
          })
          .substring(0, localeLanguage === "de" ? 2 : 3),
      ),
    };
  }, [localeLanguage, localize]);

  const { ariaLabels } = locale.date;

  return {
    datePickerDialogAriaLabel: ariaLabels.chooseDate?.(),
    datePickerDescription:
      mode === "range"
        ? ariaLabels.rangeCalendarDescription?.()
        : ariaLabels.openCalendarDescription?.(),
    closeButtonLabel: ariaLabels.closeButton?.(),
    clearButtonLabel: ariaLabels.clearButton?.(),
    applyButtonLabel: ariaLabels.applyButton?.(),
    // Do not fall back to react-day-picker's en-US default for standalone DateInput calendars.
    dayPickerLocale: dateFnsLocale,
    localize,
    weekStartsOn: options?.weekStartsOn,
    weekdaysLong,
    weekdaysShort,
  };
};

export default useDatePickerLocale;
