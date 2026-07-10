import type { Day } from "date-fns";
import { useMemo } from "react";

import useLocale from "../../../../../../hooks/__internal__/useLocale";

const useDatePickerLocale = () => {
  const locale = useLocale();
  const dateFnsLocale = locale.date.dateFnsLocale();
  const { localize, options } = dateFnsLocale;
  const weekdaysLong = useMemo(
    () => Array.from({ length: 7 }, (_, index) => localize?.day(index as Day)),
    [localize],
  );
  const weekdaysShort = useMemo(() => {
    const isGivenLocale = (language: string) =>
      locale.locale().includes(language);

    return Array.from({ length: 7 }, (_, index) =>
      localize
        ?.day(
          index as Day,
          ["de", "pl"].some(isGivenLocale)
            ? { width: "wide" }
            : { width: "abbreviated" },
        )
        .substring(0, isGivenLocale("de") ? 2 : 3),
    );
  }, [locale, localize]);

  return {
    localize,
    weekStartsOn: options?.weekStartsOn,
    weekdaysLong,
    weekdaysShort,
  };
};

export default useDatePickerLocale;
