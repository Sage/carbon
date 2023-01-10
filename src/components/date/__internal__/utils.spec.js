import MockDate from "mockdate";
import {
  isDateValid,
  parseDate,
  formattedValue,
  formatToISO,
  additionalYears,
  findMatchedFormatAndValue,
  parseISODate,
  getDisabledDays,
  checkISOFormatAndLength,
} from "./utils";

const formats = [
  "dMyyyy",
  "d.M.yyyy",
  "d,M,yyyy",
  "d-M-yyyy",
  "d/M/yyyy",
  "ddMyyyy",
  "dd.M.yyyy",
  "dd,M,yyyy",
  "dd-M-yyyy",
  "dd/M/yyyy",
  "dMMyyyy",
  "d.MM.yyyy",
  "d,MM,yyyy",
  "d-MM-yyyy",
  "d/MM/yyyy",
  "ddMMyyyy",
  "dd.MM.yyyy",
  "dd,MM,yyyy",
  "dd-MM-yyyy",
  "dd/MM/yyyy",
  "d.M.yy",
  "d,M,yy",
  "d-M-yy",
  "d/M/yy",
  "ddMyy",
  "dd.M.yy",
  "dd,M,yy",
  "dd-M-yy",
  "dd/M/yy",
  "dMMyy",
  "d.MM.yy",
  "d,MM,yy",
  "d-MM-yy",
  "d/MM/yy",
  "ddMMyy",
  "dd.MM.yy",
  "dd,MM,yy",
  "dd-MM-yy",
  "dd/MM/yy",
  "d",
  "d.",
  "d,",
  "d-",
  "d/",
  "d.M.",
  "d,M,",
  "d-M-",
  "d/M/",
  "dd",
  "dd.",
  "dd,",
  "dd-",
  "dd/",
  "dMM",
  "d.MM",
  "d,MM",
  "d-MM",
  "d/MM",
  "ddM",
  "dd.M",
  "dd,M",
  "dd-M",
  "dd/M",
  "ddMM",
  "dd.MM",
  "dd,MM",
  "dd-MM",
  "dd/MM",
];

const separators = [".", ",", "-", "/", ":"];

const separator = (format) => {
  const found = separators.find((s) => {
    return format.includes(s);
  });

  return found || "";
};

const parseParameters = (formatArray = formats) =>
  formatArray.reduce((acc, format) => {
    const valueString = format
      .split(separator(format))
      .map((splitFormatStr, index) => {
        const replaced = splitFormatStr
          .split("")
          .map(() => "1")
          .join("");

        return index === format.split(separator(format)).length - 1
          ? `${replaced}`
          : `${replaced}${separator(format)}`;
      })
      .join("");
    return [...acc, [format, valueString]];
  }, []);

const currentYear = new Date().getFullYear();

const result = (format, value = "01-01-2022") =>
  value.replace(/-/g, separator(format));

const yearValuesLessThan69 = Array.from({ length: 68 }).map((_, i) =>
  i < 9 ? `0${i + 1}` : `${i + 1}`
);
const yearValuesGreaterThan69 = Array.from({ length: 30 }).map(
  (_, i) => `${i + 1 + 69}`
);

describe("utils", () => {
  beforeAll(() => {
    MockDate.set(`${currentYear}-01-01`);
  });

  afterAll(() => {
    MockDate.reset();
  });

  describe("isDateValid", () => {
    const validDate = new Date("2022-01-15");
    const invalidDate = new Date("foo");

    it("returns true when passed valid date", () => {
      expect(isDateValid(validDate)).toBe(true);
    });

    it("returns false when passed invalid date", () => {
      expect(isDateValid(invalidDate)).toBe(false);
    });
  });

  describe("parseDate", () => {
    it.each(parseParameters())(
      "parses %s string to valid date for %s format",
      (format, value) => {
        expect(isDateValid(parseDate(format, value))).toBe(true);
      }
    );

    it("returns false when passed invalid date string", () => {
      expect(isDateValid(parseDate("dd/MM/yyyy", "foo"))).toBe(false);
    });
  });

  describe("formatToISO", () => {
    it.each(
      parseParameters([
        "ddMMyyyy",
        "dd.MM.yyyy",
        "dd,MM,yyyy",
        "dd-MM-yyyy",
        "dd/MM/yyyy",
      ])
    )(
      "returns the expected ISO formatted string when %s format and %s value passed in",
      (format, value) => {
        expect(formatToISO(format, value)).toEqual("1111-11-11");
      }
    );

    it.each(parseParameters(["d.M.yyyy", "d,M,yyyy", "d-M-yyyy", "d/M/yyyy"]))(
      "returns the expected ISO formatted string when %s format and %s value passed in",
      (format, value) => {
        expect(formatToISO(format, value)).toEqual("1111-01-01");
      }
    );

    it.each(parseParameters(["d.M.yy", "d,M,yy", "d-M-yy", "d/M/yy"]))(
      "returns the expected ISO formatted string when %s format and %s value passed in",
      (format, value) => {
        expect(formatToISO(format, value)).toEqual("2011-01-01");
      }
    );

    it.each(parseParameters(["dd.M.yy", "dd,M,yy", "dd-M-yy", "dd/M/yy"]))(
      "returns the expected ISO formatted string when %s format and %s value passed in",
      (format, value) => {
        expect(formatToISO(format, value)).toEqual("2011-01-11");
      }
    );

    it.each(
      parseParameters([
        "ddMMyy",
        "dd.MM.yy",
        "dd,MM,yy",
        "dd-MM-yy",
        "dd/MM/yy",
      ])
    )(
      "returns the expected ISO formatted string when %s format and %s value passed in",
      (format, value) => {
        expect(formatToISO(format, value)).toEqual("2011-11-11");
      }
    );

    it.each(parseParameters(["d", "d.M", "d,M", "d-M", "d/M"]))(
      "returns the expected ISO formatted string when %s format and %s value passed in",
      (format, value) => {
        expect(formatToISO(format, value)).toEqual(`${currentYear}-01-01`);
      }
    );

    it.each(parseParameters(["dd", "ddM", "dd.M", "dd,M", "dd-M", "dd/M"]))(
      "returns the expected ISO formatted string when %s format and %s value passed in",
      (format, value) => {
        expect(formatToISO(format, value)).toEqual(`${currentYear}-01-11`);
      }
    );

    it.each(parseParameters(["d.MM", "d,MM", "d-MM", "d/MM"]))(
      "returns the expected ISO formatted string when %s format and %s value passed in",
      (format, value) => {
        expect(formatToISO(format, value)).toEqual(`${currentYear}-11-01`);
      }
    );

    it.each(parseParameters(["ddMM", "dd.MM", "dd,MM", "dd-MM", "dd/MM"]))(
      "returns the expected ISO formatted string when %s format and %s value passed in",
      (format, value) => {
        expect(formatToISO(format, value)).toEqual(`${currentYear}-11-11`);
      }
    );

    it("returns null if invalid value passed in", () => {
      expect(formatToISO("dd/MM/yyyy", "foo")).toEqual(null);
    });
  });

  describe("formattedValue", () => {
    const date = new Date("2022-01-01");

    it.each([
      "ddMMyyyy",
      "dd.MM.yyyy",
      "dd,MM,yyyy",
      "dd-MM-yyyy",
      "dd/MM/yyyy",
    ])("formats a valid date to the expected %s format", (format) => {
      expect(formattedValue(format, date)).toEqual(result(format));
    });
  });

  describe("additionalYears", () => {
    it("returns passed in format and value if years length in format string is not 2", () => {
      expect(additionalYears("dd/MM/yyyy", "01/01/2022")).toEqual([
        "dd/MM/yyyy",
        "01/01/2022",
      ]);

      expect(additionalYears("yyyy/MM/dd", "2022/01/01")).toEqual([
        "yyyy/MM/dd",
        "2022/01/01",
      ]);
    });

    describe.each(yearValuesLessThan69)("when year value is %s", (year) => {
      it.each([
        "d.M.yy",
        "d,M,yy",
        "d-M-yy",
        "d/M/yy",
        "dd.M.yy",
        "dd,M,yy",
        "dd-M-yy",
        "dd/M/yy",
        "ddMMyy",
        "dd.MM.yy",
        "dd,MM,yy",
        "dd-MM-yy",
        "dd/MM/yy",
      ])("returns the expected when format is %s", (format) => {
        const input = result(format, `01-01-${year}`);
        const output = result(format, `01-01-20${year}`);
        expect(additionalYears(format, input)).toEqual([`${format}yy`, output]);
      });

      it.each([
        "yy.M.d",
        "yy,M,d",
        "yy-M-d",
        "yy/M/d",
        "yy.M.dd",
        "yy,M,dd",
        "yy-M-dd-M",
        "yy/M/dd/M",
        "yyMdd",
        "yy.MM.dd",
        "yy,MM,dd",
        "yy-MM-dd",
        "yy/MM/dd",
      ])("returns the expected when format is %s", (format) => {
        const input = result(format, `${year}-01-01`);
        const output = result(format, `20${year}-01-01`);
        expect(additionalYears(format, input)).toEqual([`yy${format}`, output]);
      });
    });

    describe.each(yearValuesGreaterThan69)("when year value is %s", (year) => {
      it.each([
        "d.M.yy",
        "d,M,yy",
        "d-M-yy",
        "d/M/yy",
        "dd.M.yy",
        "dd,M,yy",
        "dd-M-yy",
        "dd/M/yy",
        "ddMMyy",
        "dd.MM.yy",
        "dd,MM,yy",
        "dd-MM-yy",
        "dd/MM/yy",
      ])("returns the expected when format is %s", (format) => {
        const input = result(format, `01-01-${year}`);
        const output = result(format, `01-01-19${year}`);
        expect(additionalYears(format, input)).toEqual([`${format}yy`, output]);
      });

      it.each([
        "yy.M.d",
        "yy,M,d",
        "yy-M-d",
        "yy/M/d",
        "yy.M.dd",
        "yy,M,dd",
        "yy-M-dd-M",
        "yy/M/dd/M",
        "yyMdd",
        "yy.MM.dd",
        "yy,MM,dd",
        "yy-MM-dd",
        "yy/MM/dd",
      ])("returns the expected when format is %s", (format) => {
        const input = result(format, `${year}-01-01`);
        const output = result(format, `19${year}-01-01`);
        expect(additionalYears(format, input)).toEqual([`yy${format}`, output]);
      });
    });
  });

  describe("findMatchedFormatAndValue", () => {
    // when no separator is used it will return whitespace separated format and value due to bug in date-fns
    it.each([
      ["ddMMyyyy", "01012022", "dd MM yyyy", "01 01 2022"],
      ["ddMMyy", "010122", "dd MM yy", "01 01 22"],
      ["dMMyy", "10122", "d MM yy", "1 01 22"],
      ["ddMyy", "01122", "dd M yy", "01 1 22"],
      ["ddMyyyy", "0112022", "dd M yyyy", "01 1 2022"],
      ["dMyyyy", "112022", "d M yyyy", "1 1 2022"],
      ["dMMyyyy", "1012022", "d MM yyyy", "1 01 2022"],
      ["ddMMyyyy", "31012022", "dd MM yyyy", "31 01 2022"],
      ["ddMMyy", "300122", "dd MM yy", "30 01 22"],
      ["ddMyy", "28222", "dd M yy", "28 2 22"],
    ])(
      "should match the un-separated %s format and %s value and return the expected [%s, %s]",
      (format, value, formatResult, valueResult) => {
        const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
          value,
          formats
        );

        expect(matchedFormat).toEqual(formatResult);
        expect(matchedValue).toEqual(valueResult);
      }
    );

    it.each([
      ["dd/MM/yyyy", "01/01/2022", "dd/MM/yyyy", "01/01/2022"],
      ["dd/MM/yy", "01/01/22", "dd/MM/yy", "01/01/22"],
      ["d/MM/yy", "1/01/22", "d/MM/yy", "1/01/22"],
      ["dd/M/yy", "01/1/22", "dd/M/yy", "01/1/22"],
      ["dd/M/yyyy", "01/1/2022", "dd/M/yyyy", "01/1/2022"],
      ["d/M/yyyy", "1/1/2022", "d/M/yyyy", "1/1/2022"],
      ["d/MM/yyyy", "1/01/2022", "d/MM/yyyy", "1/01/2022"],
      ["dd/MM/yyyy", "31/01/2022", "dd/MM/yyyy", "31/01/2022"],
      ["dd/MM/yy", "30/01/22", "dd/MM/yy", "30/01/22"],
      ["dd/M/yy", "29/1/22", "dd/M/yy", "29/1/22"],
      ["dd/M/yyyy", "28/2/2022", "dd/M/yyyy", "28/2/2022"],
    ])(
      "should match the `/` separated %s format and %s value and return the expected [%s, %s]",
      (format, value, formatResult, valueResult) => {
        const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
          value,
          formats
        );

        expect(matchedFormat).toEqual(formatResult);
        expect(matchedValue).toEqual(valueResult);
      }
    );

    it.each([
      ["dd,MM,yyyy", "01,01,2022", "dd,MM,yyyy", "01,01,2022"],
      ["dd,MM,yy", "01,01,22", "dd,MM,yy", "01,01,22"],
      ["d,MM,yy", "1,01,22", "d,MM,yy", "1,01,22"],
      ["dd,M,yy", "01,1,22", "dd,M,yy", "01,1,22"],
      ["dd,M,yyyy", "01,1,2022", "dd,M,yyyy", "01,1,2022"],
      ["d,M,yyyy", "1,1,2022", "d,M,yyyy", "1,1,2022"],
      ["d,MM,yyyy", "1,01,2022", "d,MM,yyyy", "1,01,2022"],
    ])(
      "should match the `,` separated %s format and %s value and return the expected [%s, %s]",
      (format, value, formatResult, valueResult) => {
        const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
          value,
          formats
        );

        expect(matchedFormat).toEqual(formatResult);
        expect(matchedValue).toEqual(valueResult);
      }
    );

    it.each([
      ["dd-MM-yyyy", "01-01-2022", "dd-MM-yyyy", "01-01-2022"],
      ["dd-MM-yy", "01-01-22", "dd-MM-yy", "01-01-22"],
      ["d-MM-yy", "1-01-22", "d-MM-yy", "1-01-22"],
      ["dd-M-yy", "01-1-22", "dd-M-yy", "01-1-22"],
      ["dd-M-yyyy", "01-1-2022", "dd-M-yyyy", "01-1-2022"],
      ["d-M-yyyy", "1-1-2022", "d-M-yyyy", "1-1-2022"],
      ["d-MM-yyyy", "1-01-2022", "d-MM-yyyy", "1-01-2022"],
    ])(
      "should match the `-` separated %s format and %s value and return the expected [%s, %s]",
      (format, value, formatResult, valueResult) => {
        const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
          value,
          formats
        );

        expect(matchedFormat).toEqual(formatResult);
        expect(matchedValue).toEqual(valueResult);
      }
    );
  });

  describe("parseISODate", () => {
    it("generates a valid date when passed a valid string value", () => {
      expect(isDateValid(parseISODate("2022-01-01"))).toBe(true);
    });

    it("does not generate a valid date when passed a valid string value", () => {
      expect(isDateValid(parseISODate("foo"))).toBe(false);
    });
  });

  describe("getDisabledDays", () => {
    const invalidISOMin = "01/01/2022";
    const invalidISOMax = "02/01/2022";
    const validISOMin = "2022-01-01";
    const validISOMax = "2022-01-02";

    it("returns null if no params passed", () => {
      expect(getDisabledDays()).toEqual(null);
    });

    it("does not add the params to the array unless they are ISO formatted string", () => {
      expect(getDisabledDays(invalidISOMin, invalidISOMax)).toEqual([]);
    });

    it("returns an array containing the minDate value when it is an ISO formatted string", () => {
      expect(getDisabledDays(validISOMin)).toEqual([
        { before: parseISODate(validISOMin) },
      ]);
    });

    it("returns an array containing the maxDate value when it is an ISO formatted string", () => {
      expect(getDisabledDays(undefined, validISOMax)).toEqual([
        { after: parseISODate(validISOMax) },
      ]);
    });

    it("returns an array containing the minDate and maxDate value when params are ISO formatted strings", () => {
      expect(getDisabledDays(validISOMin, validISOMax)).toEqual([
        { before: parseISODate(validISOMin) },
        { after: parseISODate(validISOMax) },
      ]);
    });
  });

  describe("checkISOFormatAndLength", () => {
    it("returns true when valid ISO string passed", () => {
      expect(checkISOFormatAndLength("2022-01-01")).toEqual(true);
    });

    it.each(["foo", "2022-1-1", "2022-01-1", "22-01-01", " "])(
      "returns false when invalid ISO string %s passed",
      (value) => {
        expect(checkISOFormatAndLength(value)).toEqual(false);
      }
    );
  });
});
