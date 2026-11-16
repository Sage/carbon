import { useMemo } from "react";
import type { Day, Locale } from "date-fns";

import useLocale from "../../../../hooks/__internal__/useLocale";

/** Derives localized picker labels and weekday names. */
const useDatePickerLocale = (localeOverride?: Partial<Locale>) => {
  const locale = useLocale();
  const calendarLocale = { ...locale.date.dateFnsLocale(), ...localeOverride };
  const { localize, options } = calendarLocale;
  const localeLanguage = calendarLocale.code.split("-")[0].toLowerCase();
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

  return {
    datePickerDialogAriaLabel: locale.date.ariaLabels.chooseDate?.(),
    datePickerDescription: locale.date.ariaLabels.openCalendarDescription?.(),
    closeButtonLabel: locale.date.ariaLabels.closeButton?.(),
    // Always pass an explicit locale so DayPicker does not fall back to its en-US default.
    dayPickerLocale: calendarLocale,
    localize,
    weekStartsOn: options?.weekStartsOn,
    weekdaysLong,
    weekdaysShort,
  };
};

export default useDatePickerLocale;
