import { enCA as enCADateLocale } from "date-fns/locale/en-CA";

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
  pager: {
    pageX: (currentPage?: number | string) => `Page ${currentPage}`,
    ofTotalPages: (totalPages: number | string) => `of ${totalPages} pages`,
    itemsPerPage: () => "Items per page",
    totalItems: () => "total items",
  },
};

export default enCA;
