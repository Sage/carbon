import { enUS as enUSDateLocale } from "date-fns/locale/en-US";

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
  pager: {
    pageX: (currentPage?: number | string) => `Page ${currentPage}`,
    ofTotalPages: (totalPages: number | string) => `of ${totalPages} pages`,
    itemsPerPage: () => "Items per page",
    totalItems: () => "total items",
  },
};

export default enUS;
