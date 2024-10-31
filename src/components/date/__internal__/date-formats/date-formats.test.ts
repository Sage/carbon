import getFormatData from ".";

const euLocales = [
  "en-GB",
  "en-ZA",
  "fr",
  "es",
  "fr-CA",
  "de",
  "pl",
  "bg",
  "zh-HK", // currently still using EU style formatting
];
const naLocales = ["en-US", "en-CA"];
const cnLocales = ["zh", "zh-CN", "zh-TW", "hu"];

const euFormats = [
  "d M yyyy",
  "dMyyyy",
  "d.M.yyyy",
  "d,M,yyyy",
  "d-M-yyyy",
  "d/M/yyyy",
  "d:M:yyyy",
  "dd M yyyy",
  "ddMyyyy",
  "dd.M.yyyy",
  "dd,M,yyyy",
  "dd-M-yyyy",
  "dd/M/yyyy",
  "dd:M:yyyy",
  "d MM yyyy",
  "dMMyyyy",
  "d.MM.yyyy",
  "d,MM,yyyy",
  "d-MM-yyyy",
  "d/MM/yyyy",
  "d:MM:yyyy",
  "dd MM yyyy",
  "ddMMyyyy",
  "dd.MM.yyyy",
  "dd,MM,yyyy",
  "dd-MM-yyyy",
  "dd/MM/yyyy",
  "dd:MM:yyyy",
  "d M yy",
  "dMyy",
  "d.M.yy",
  "d,M,yy",
  "d-M-yy",
  "d/M/yy",
  "d:M:yy",
  "dd M yy",
  "ddMyy",
  "dd.M.yy",
  "dd,M,yy",
  "dd-M-yy",
  "dd/M/yy",
  "dd:M:yy",
  "d MM yy",
  "dMMyy",
  "d.MM.yy",
  "d,MM,yy",
  "d-MM-yy",
  "d/MM/yy",
  "d:MM:yy",
  "dd MM yy",
  "ddMMyy",
  "dd.MM.yy",
  "dd,MM,yy",
  "dd-MM-yy",
  "dd/MM/yy",
  "dd:MM:yy",
  "d",
  "d M",
  "dM",
  "d.M",
  "d,M",
  "d-M",
  "d/M",
  "d:M",
  "dd",
  "d MM",
  "dMM",
  "d.MM",
  "d,MM",
  "d-MM",
  "d/MM",
  "d:MM",
  "dd M",
  "ddM",
  "dd.M",
  "dd,M",
  "dd-M",
  "dd/M",
  "dd:M",
  "dd MM",
  "ddMM",
  "dd.MM",
  "dd,MM",
  "dd-MM",
  "dd/MM",
  "dd:MM",
];

const naFormats = [
  "M",
  "M d",
  "Md",
  "M.d",
  "M,d",
  "M-d",
  "M/d",
  "M:d",
  "MM",
  "M dd",
  "Mdd",
  "M.dd",
  "M,dd",
  "M-dd",
  "M/dd",
  "M:dd",
  "MM d",
  "MMd",
  "MM.d",
  "MM,d",
  "MM-d",
  "MM/d",
  "MM:d",
  "MM dd",
  "MMdd",
  "MM.dd",
  "MM,dd",
  "MM-dd",
  "MM/dd",
  "MM:dd",
  "M d yy",
  "Mdyy",
  "M.d.yy",
  "M,d,yy",
  "M-d-yy",
  "M/d/yy",
  "M:d:yy",
  "MM d yy",
  "MMdyy",
  "MM.d.yy",
  "MM,d,yy",
  "MM-d-yy",
  "MM/d/yy",
  "MM:d:yy",
  "M dd yy",
  "Mddyy",
  "M.dd.yy",
  "M,dd,yy",
  "M-dd-yy",
  "M/dd/yy",
  "M:dd:yy",
  "MM dd yy",
  "MMddyy",
  "MM.dd.yy",
  "MM,dd,yy",
  "MM-dd-yy",
  "MM/dd/yy",
  "MM:dd:yy",
  "M d yyyy",
  "Mdyyyy",
  "M.d.yyyy",
  "M,d,yyyy",
  "M-d-yyyy",
  "M/d/yyyy",
  "M:d:yyyy",
  "MM d yyyy",
  "MMdyyyy",
  "MM.d.yyyy",
  "MM,d,yyyy",
  "MM-d-yyyy",
  "MM/d/yyyy",
  "MM:d:yyyy",
  "M dd yyyy",
  "Mddyyyy",
  "M.dd.yyyy",
  "M,dd,yyyy",
  "M-dd-yyyy",
  "M/dd/yyyy",
  "M:dd:yyyy",
  "MM dd yyyy",
  "MMddyyyy",
  "MM.dd.yyyy",
  "MM,dd,yyyy",
  "MM-dd-yyyy",
  "MM/dd/yyyy",
  "MM:dd:yyyy",
];

const cnFormats = [
  "yyyy M",
  "yyyyM",
  "yyyy.M",
  "yyyy,M",
  "yyyy-M",
  "yyyy/M",
  "yyyy:M",
  "yyyy M d",
  "yyyyMd",
  "yyyy.M.d",
  "yyyy,M,d",
  "yyyy-M-d",
  "yyyy/M/d",
  "yyyy:M:d",
  "yyyy MM d",
  "yyyyMMd",
  "yyyy.MM.d",
  "yyyy,MM,d",
  "yyyy-MM-d",
  "yyyy/MM/d",
  "yyyy:MM:d",
  "yyyy M dd",
  "yyyyMdd",
  "yyyy.M.dd",
  "yyyy,M,dd",
  "yyyy-M-dd",
  "yyyy/M/dd",
  "yyyy:M:dd",
  "yyyy MM dd",
  "yyyyMMdd",
  "yyyy.MM.dd",
  "yyyy,MM,dd",
  "yyyy-MM-dd",
  "yyyy/MM/dd",
  "yyyy:MM:dd",
  "yy M",
  "yyM",
  "yy.M",
  "yy,M",
  "yy-M",
  "yy/M",
  "yy:M",
  "yy MM",
  "yyMM",
  "yy.MM",
  "yy,MM",
  "yy-MM",
  "yy/MM",
  "yy:MM",
  "yy M d",
  "yyMd",
  "yy.M.d",
  "yy,M,d",
  "yy-M-d",
  "yy/M/d",
  "yy:M:d",
  "yy MM d",
  "yyMMd",
  "yy.MM.d",
  "yy,MM,d",
  "yy-MM-d",
  "yy/MM/d",
  "yy:MM:d",
  "yy M dd",
  "yyMdd",
  "yy.M.dd",
  "yy,M,dd",
  "yy-M-dd",
  "yy/M/dd",
  "yy:M:dd",
  "yy MM dd",
  "yyMMdd",
  "yy.MM.dd",
  "yy,MM,dd",
  "yy-MM-dd",
  "yy/MM/dd",
  "yy:MM:dd",
  "M",
  "M d",
  "Md",
  "M.d",
  "M,d",
  "M-d",
  "M/d",
  "M:d",
  "MM",
  "M dd",
  "Mdd",
  "M.dd",
  "M,dd",
  "M-dd",
  "M/dd",
  "M:dd",
  "MM d",
  "MMd",
  "MM.d",
  "MM,d",
  "MM-d",
  "MM/d",
  "MM:d",
  "MM dd",
  "MMdd",
  "MM.dd",
  "MM,dd",
  "MM-dd",
  "MM/dd",
  "MM:dd",
];

const huFormats = [
  "yyyy M",
  "yyyyM",
  "yyyy.M",
  "yyyy,M",
  "yyyy-M",
  "yyyy/M",
  "yyyy:M",
  "yyyy. M.",
  "yyyy. M",
  "yyyy M d",
  "yyyyMd",
  "yyyy.M.d",
  "yyyy,M,d",
  "yyyy-M-d",
  "yyyy/M/d",
  "yyyy:M:d",
  "yyyy. M. d.",
  "yyyy. M. d",
  "yyyy MM d",
  "yyyyMMd",
  "yyyy.MM.d",
  "yyyy,MM,d",
  "yyyy-MM-d",
  "yyyy/MM/d",
  "yyyy:MM:d",
  "yyyy. MM. d.",
  "yyyy. MM. d",
  "yyyy M dd",
  "yyyyMdd",
  "yyyy.M.dd",
  "yyyy,M,dd",
  "yyyy-M-dd",
  "yyyy/M/dd",
  "yyyy:M:dd",
  "yyyy. M. dd.",
  "yyyy. M. dd",
  "yyyy MM dd",
  "yyyyMMdd",
  "yyyy.MM.dd",
  "yyyy,MM,dd",
  "yyyy-MM-dd",
  "yyyy/MM/dd",
  "yyyy:MM:dd",
  "yyyy. MM. dd.",
  "yyyy. MM. dd",
  "yy M",
  "yyM",
  "yy.M",
  "yy,M",
  "yy-M",
  "yy/M",
  "yy:M",
  "yy. M.",
  "yy. M",
  "yy MM",
  "yyMM",
  "yy.MM",
  "yy,MM",
  "yy-MM",
  "yy/MM",
  "yy:MM",
  "yy. MM.",
  "yy. MM",
  "yy M d",
  "yyMd",
  "yy.M.d",
  "yy,M,d",
  "yy-M-d",
  "yy/M/d",
  "yy:M:d",
  "yy. M. d.",
  "yy. M. d",
  "yy MM d",
  "yyMMd",
  "yy.MM.d",
  "yy,MM,d",
  "yy-MM-d",
  "yy/MM/d",
  "yy:MM:d",
  "yy. MM. d.",
  "yy. MM. d",
  "yy M dd",
  "yyMdd",
  "yy.M.dd",
  "yy,M,dd",
  "yy-M-dd",
  "yy/M/dd",
  "yy:M:dd",
  "yy. M. dd.",
  "yy. M. dd",
  "yy MM dd",
  "yyMMdd",
  "yy.MM.dd",
  "yy,MM,dd",
  "yy-MM-dd",
  "yy/MM/dd",
  "yy:MM:dd",
  "yy. MM. dd.",
  "yy. MM. dd",
  "M",
  "M d",
  "Md",
  "M.d",
  "M,d",
  "M-d",
  "M/d",
  "M:d",
  "M. d.",
  "M. d",
  "MM",
  "M dd",
  "Mdd",
  "M.dd",
  "M,dd",
  "M-dd",
  "M/dd",
  "M:dd",
  "M. dd.",
  "M. dd",
  "MM d",
  "MMd",
  "MM.d",
  "MM,d",
  "MM-d",
  "MM/d",
  "MM:d",
  "MM. d.",
  "MM. d",
  "MM dd",
  "MMdd",
  "MM.dd",
  "MM,dd",
  "MM-dd",
  "MM/dd",
  "MM:dd",
  "MM. dd.",
  "MM. dd",
];

const formatMap: Record<string, string> = [
  ...euLocales,
  ...naLocales,
  ...cnLocales,
].reduce((acc, code) => {
  if (["de", "pl", "bg"].includes(code)) {
    return {
      ...acc,
      [code]: "dd.MM.yyyy",
    };
  }

  if (code === "hu") {
    return {
      ...acc,
      [code]: "yyyy. MM. dd.",
    };
  }

  if (naLocales.includes(code)) {
    return {
      ...acc,
      [code]: "MM/dd/yyyy",
    };
  }

  if (cnLocales.includes(code)) {
    return {
      ...acc,
      [code]: "yyyy/MM/dd",
    };
  }

  return {
    ...acc,
    [code]: "dd/MM/yyyy",
  };
}, {});

const getExpectedFormatForLocale = (locale: string) => {
  if (naLocales.includes(locale)) {
    return naFormats;
  }

  if (locale === "hu") {
    return huFormats;
  }

  if (cnLocales.includes(locale)) {
    return cnFormats;
  }

  return euFormats;
};

test("should default to en-GB locale if no locale code string passed to `getFormatData`", () => {
  const { formats, format } = getFormatData({ code: undefined });

  const expectedFormats = getExpectedFormatForLocale("en-GB");

  expect(
    expectedFormats.every((formatStr) => formats.includes(formatStr)) &&
      formats.length === expectedFormats.length,
  ).toEqual(true);

  expect(format).toEqual(formatMap["en-GB"]);
});

describe.each(euLocales)(
  "when EU locales are passed to `getFormatData`",
  (locale: string) => {
    test(`should return the expected object shape for ${locale} locale`, () => {
      const { formats } = getFormatData({ code: locale });

      const expectedFormats = getExpectedFormatForLocale(locale);

      expect(
        expectedFormats.every((formatStr) => formats.includes(formatStr)) &&
          formats.length === expectedFormats.length,
      ).toEqual(true);
    });
  },
);

describe.each(naLocales)(
  "when NA locales are passed to `getFormatData`",
  (locale: string) => {
    test(`should return the expected object shape for ${locale} locale`, () => {
      const { formats } = getFormatData({ code: locale });

      const expectedFormats = getExpectedFormatForLocale(locale);

      expect(
        expectedFormats.every((formatStr) => formats.includes(formatStr)) &&
          formats.length === expectedFormats.length,
      ).toEqual(true);
    });
  },
);

describe.each(cnLocales)(
  "when CN locales are passed to `getFormatData`",
  (locale: string) => {
    test(`should return the expected object shape for ${locale} locale`, () => {
      const { formats } = getFormatData({ code: locale });

      const expectedFormats = getExpectedFormatForLocale(locale);

      expect(
        expectedFormats.every((formatStr) => formats.includes(formatStr)) &&
          formats.length === expectedFormats.length,
      ).toEqual(true);
    });
  },
);
