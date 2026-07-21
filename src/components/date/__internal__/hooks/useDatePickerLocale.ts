import { useMemo } from "react";
import type { Day } from "date-fns";

import useLocale from "../../../../hooks/__internal__/useLocale";

const useDatePickerLocale = () => {
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

  return {
    closeButtonLabel: locale.date.ariaLabels.closeButton(),
    localize,
    weekStartsOn: options?.weekStartsOn,
    weekdaysLong,
    weekdaysShort,
  };
};

export default useDatePickerLocale;
