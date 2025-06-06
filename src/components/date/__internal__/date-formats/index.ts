import { Locale as DateFnsLocale } from "date-fns";

// The order of this array is important, when an input value matches more than one format the last one is used
const EU_FORMATS = [
  "d M yyyy",
  "dd M yyyy",
  "d MM yyyy",
  "dd MM yyyy",
  "d M yy",
  "dd M yy",
  "d MM yy",
  "dd MM yy",
  "d",
  "d M",
  "dd",
  "d MM",
  "dd M",
  "dd MM",
];

// The order of this array is important, when an input value matches more than one format the last one is used
const NA_FORMATS = [
  "M",
  "M d",
  "MM",
  "M dd",
  "MM d",
  "MM dd",
  "M d yy",
  "MM d yy",
  "M dd yy",
  "MM dd yy",
  "M d yyyy",
  "MM d yyyy",
  "M dd yyyy",
  "MM dd yyyy",
];

// The order of this array is important, when an input value matches more than one format the last one is used
const CN_FORMATS = [
  "yyyy M",
  "yyyy M d",
  "yyyy MM d",
  "yyyy M dd",
  "yyyy MM dd",
  "yy M",
  "yy MM",
  "yy M d",
  "yy MM d",
  "yy M dd",
  "yy MM dd",
  "M",
  "M d",
  "MM",
  "M dd",
  "MM d",
  "MM dd",
];

const SEPARATORS = ["", ".", ",", "-", "/", ":"] as const;

const STANDARD_FORMAT_LENGTH = 10;

type Separator = (typeof SEPARATORS)[number];

const generateFormats = (
  formatArray: string[],
  separator: Separator,
  trailingChar?: string,
): string[] => {
  const separators = SEPARATORS.includes(separator)
    ? SEPARATORS
    : [...SEPARATORS, separator];

  return formatArray.reduce((arr: string[], formatString) => {
    const array = [...arr, formatString];
    if (formatString.includes(" ")) {
      separators.forEach((char) => {
        if (separator === char && trailingChar) {
          array.push(`${formatString.replace(/ /g, char)}${trailingChar}`);
        }
        array.push(formatString.replace(/ /g, char));
      });
    }
    return array;
  }, []);
};

const getOutputFormatForLocale = (localeCode: string) => {
  const formatMap = {
    day: "dd",
    month: "MM",
    year: "yyyy",
  };

  const formatter = new Intl.DateTimeFormat(localeCode);
  let separator: Separator = "";

  const format = formatter
    .formatToParts(new Date())
    .map(({ type, value }) => {
      if (["day", "month", "year"].includes(type)) {
        return formatMap[type as keyof typeof formatMap];
      }
      if (!separator) {
        separator = value as Separator;
      }
      return value;
    })
    .join("");

  if (localeCode.startsWith("bg")) {
    // this locale adds an additional char that has no effect on the output formatting
    return { format: format.substring(0, STANDARD_FORMAT_LENGTH), separator };
  }

  return { format, separator };
};

const getInputFormatsArrayForLocale = (format: string) => {
  if (format.startsWith("y")) {
    return CN_FORMATS;
  }
  if (format.startsWith("M")) {
    return NA_FORMATS;
  }

  return EU_FORMATS;
};

// we need this to handle for formats that add extra chars at the end of the format
const getTrailingChar = (format: string) => {
  const lastChar = format.split("").pop() as string;

  return ["y", "M", "d"].includes(lastChar) ? "" : lastChar;
};

interface LocaleFormats {
  formats: string[];
  format: string;
}

const getFormatData = (
  locale?: Partial<Pick<DateFnsLocale, "code">>,
  dateFormatOverride?: string,
): LocaleFormats => {
  const code = locale?.code || "en-GB";

  const dateFnsFormatOverrides: Record<
    string,
    { format: string; separator?: Separator }
  > = {
    "en-CA": { format: "MM/dd/yyyy", separator: "/" },
    "en-US": { format: "MM/dd/yyyy", separator: "/" },
    "fr-CA": { format: "dd/MM/yyyy" },
    "en-ZA": { format: "dd/MM/yyyy" },
    "ar-EG": { format: "dd/MM/yyyy" },
  };

  const { format: defaultFormat, separator: defaultSeparator } =
    getOutputFormatForLocale(code);

  const override = dateFnsFormatOverrides[code] || {};

  const format = dateFormatOverride ?? override.format ?? defaultFormat;
  const separator = override.separator ?? defaultSeparator;

  return {
    format,
    formats: generateFormats(
      getInputFormatsArrayForLocale(format),
      separator,
      getTrailingChar(format),
    ),
  };
};

export default getFormatData;
