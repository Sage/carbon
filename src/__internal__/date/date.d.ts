interface Locale {
  locale: string;
  formats: string[];
  format: string;
}

interface FormatDateToCurrentLocaleArgs extends Locale {
  value: string;
}

interface IsValidDateArgs extends FormatDateToCurrentLocaleArgs {
  options?: Record<string, unknown>;
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
  isValidDate: (params: IsValidDateArgs) => boolean;
  formatValue: (params: FormatValueArgs) => string;
  stringToDate: (value: string) => Date;
  formatDateString: (value: string, formatTo?: string) => string;
  todayFormatted: (format?: string) => string;
  weekdaysMinified: (locale: string) => string[];
  withinRange: (params: WithinRangeArgs) => boolean;
  formatDateToCurrentLocale: (params: FormatDateToCurrentLocaleArgs) => string;
}
