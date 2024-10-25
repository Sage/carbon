import enUSDateLocale from "date-fns/locale/en-US";

import Locale from "./locale";

const enUS: Partial<Locale> = {
  locale: () => "en-US",
  date: {
    dateFnsLocale: () => enUSDateLocale,
    ariaLabels: {
      previousMonthButton: () => "Previous month",
      nextMonthButton: () => "Next month",
    },
  },
};

export default enUS;
