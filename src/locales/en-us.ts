import { enUS as enUSDateLocale } from "date-fns/locale/en-US";

import Locale from "./locale";

const enUS: Partial<Locale> = {
  locale: () => "en-US",
  date: {
    dateFnsLocale: () => enUSDateLocale,
    ariaLabels: {
      previousMonthButton: () => "Previous month",
      nextMonthButton: () => "Next month",
      chooseMonth: () => "Choose the month",
      chooseYear: () => "Choose the year",
      closeButton: () => "Close",
    },
  },
};

export default enUS;
