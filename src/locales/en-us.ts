import { enUS as enUSDateLocale } from "date-fns/locale/en-US";

import Locale from "./locale";

const enUS: Partial<Locale> = {
  locale: () => "en-US",
  colorPicker: {
    colors: {
      blue: () => "Blue",
      teal: () => "Teal",
      green: () => "Green",
      lime: () => "Lime",
      orange: () => "Orange",
      red: () => "Red",
      pink: () => "Pink",
      purple: () => "Purple",
      gray: () => "Gray",
      slate: () => "Slate",
    },
  },
  date: {
    dateFnsLocale: () => enUSDateLocale,
    ariaLabels: {
      previousMonthButton: () => "Previous month",
      nextMonthButton: () => "Next month",
    },
  },
};

export default enUS;
