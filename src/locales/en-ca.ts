import enCADateLocale from "date-fns/locale/en-CA";

import Locale from "./locale";

const enCA: Partial<Locale> = {
  locale: () => "en-CA",
  date: {
    dateFnsLocale: () => enCADateLocale,
    ariaLabels: {
      previousMonthButton: () => "Previous month",
      nextMonthButton: () => "Next month",
    },
  },
};

export default enCA;
