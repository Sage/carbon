import { Locale as DateFnsLocale } from "date-fns";

interface LocaleFormats {
  formats: string[];
  format: string;
}

declare function getFormatData(locale: DateFnsLocale): LocaleFormats;

export default getFormatData;
