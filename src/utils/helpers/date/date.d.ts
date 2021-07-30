interface Locale {
  locale: string;
  formats: string[];
  format: string;
}

interface FormatDateToCurrentLocaleArgs extends Locale {
  value: string;
}

interface IsValidDateArgs extends FormatDateToCurrentLocaleArgs {
  options?: object;
}

interface FormatValueArgs extends IsValidDateArgs {
  formatTo?: string;
}

interface WithinRangeArgs extends FormatDateToCurrentLocaleArgs {
  limit: number;
  units: string;
}

export interface DateHelper {
  sanitizeDateInput: (value: string) => string;
  isValidDate: (IsValidDateArgs) => boolean;
  formatValue: (FormatValueArgs) => string;
  stringToDate: (value: string) => Date;
  formatDateString: (value: string, formatTo?: string) => string;
  todayFormatted: (format?: string) => string;
  weekdaysMinified: (locale: string) => string[];
  withinRange: (WithinRangeArgs) => boolean;
  formatDateToCurrentLocale: (FormatDateToCurrentLocaleArgs) => string;
}
