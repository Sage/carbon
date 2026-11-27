import { enCA as enCADateLocale } from "date-fns/locale/en-CA";

import Locale from "./locale";

const enCA: Partial<Locale> = {
  locale: () => "en-CA",
  actionPopover: {
    ariaLabel: () => "actions",
    buttonLabel: () => "Actions",
  },
  date: {
    dateFnsLocale: () => enCADateLocale,
    ariaLabels: {
      previousMonthButton: () => "Previous month",
      nextMonthButton: () => "Next month",
    },
  },
  popoverContainer: {
    openButton: {
      text: () => "Actions",
    },
  },
};

export default enCA;
