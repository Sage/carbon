import moment from "moment";
import DateHelper from "./date";
import enGB from "../../locales/en-gb";

const enUS = {
  ...enGB,
  locale: () => "en-US",
  date: {
    ...enGB.date,
    formats: {
      ...enGB.date.formats,
      inputs: () => ["MM/DD/YYYY"],
    },
  },
};

const localeData = {
  locale: enGB.locale(),
  formats: enGB.date.formats.inputs(),
  format: enGB.date.formats.javascript(),
};

const localeUSData = {
  locale: enUS.locale(),
  formats: enUS.date.formats.inputs(),
  format: enUS.date.formats.javascript(),
};

describe("DateHelper", () => {
  beforeEach(() => {
    moment.updateLocale("us", { parentLocale: "en" });
  });

  describe("sanitizeDateInput", () => {
    it("replaces all common separators with forward slashes", () => {
      expect(DateHelper.sanitizeDateInput("-")).toEqual("/");
      expect(DateHelper.sanitizeDateInput(".")).toEqual("/");
      expect(DateHelper.sanitizeDateInput(" ")).toEqual("/");
    });

    it("returns an empty string when the value is undefined or empty", () => {
      expect(DateHelper.sanitizeDateInput(undefined)).toEqual("");
      expect(DateHelper.sanitizeDateInput("")).toEqual("");
    });
  });

  describe("isValidDate", () => {
    it("returns true when date is valid", () => {
      expect(
        DateHelper.isValidDate({ value: "10/12/2012", ...localeData })
      ).toBeTruthy();
    });

    it("returns false when the date is not valid", () => {
      expect(
        DateHelper.isValidDate({ value: "FOO", ...localeData })
      ).toBeFalsy();
    });
  });

  describe("formatValue", () => {
    describe("when a valid date value", () => {
      it("returns the passed date value in the passed form", () => {
        expect(
          DateHelper.formatValue({
            value: "10/12/2012",
            formatTo: "YYYY-MM-DD",
            ...localeData,
          })
        ).toEqual("2012-12-10");
      });
    });

    describe("when an invalid date value", () => {
      it("returns passed value", () => {
        expect(
          DateHelper.formatValue({
            value: "FOO",
            formatTo: "YYYY-MM-DD",
            ...localeData,
          })
        ).toEqual("FOO");
      });
    });

    describe("options", () => {
      describe("sanitize", () => {
        it("does not sanitize the input before parsing", () => {
          expect(
            DateHelper.formatValue({
              value: "10-10-2015",
              formatTo: "DD/MM/YYYY",
              options: {
                sanitize: false,
              },
              ...localeData,
            })
          ).toEqual("10-10-2015");
        });
      });

      describe("locale", () => {
        it("overrides the default i18n locale", () => {
          expect(
            DateHelper.formatValue({
              value: "01/31/2015",
              formatTo: "DD/MM/YYYY",
              ...localeUSData,
            })
          ).toEqual("31/01/2015");

          expect(
            DateHelper.formatValue({
              value: "03/04/2015",
              formatTo: "DD/MM/YYYY",
              ...localeUSData,
            })
          ).toEqual("03/04/2015");
        });
      });

      describe("strict", () => {
        it("overrides the default strict bool", () => {
          expect(
            DateHelper.formatValue({
              value: "31-01-2015",
              formatTo: "DD/MM/YYYY",
              options: {
                strict: false,
              },
              ...localeUSData,
            })
          ).toEqual("31/01/2015");
        });
      });

      describe("formats", () => {
        it("overrides the i18n formats when passed", () => {
          expect(
            DateHelper.formatValue({
              value: "2016/01/01",
              formatTo: "DD/MM/YYYY",
              options: {
                formats: ["YYYY/MM/DD"],
              },
              ...localeUSData,
            })
          ).toEqual("01/01/2016");
        });
      });
    });
  });

  describe("stringToDate", () => {
    it('converts a value such as "2017-08-23" into a Javascript Date object', () => {
      const date = new Date(2017, 7, 23); // js Date month is zero indexed
      expect(DateHelper.stringToDate("2017-08-23")).toEqual(date);
    });
  });

  describe("formatDateString", () => {
    it("Formats the given date string to a specified format", () => {
      const dateString = "Wed Aug 23 2017 12:00:00 GMT+0100 (BST)";
      expect(DateHelper.formatDateString(dateString, "YYYY-MM-DD")).toEqual(
        "2017-08-23"
      );
    });
  });

  describe("todayFormatted", () => {
    it("returns todays date in a in a set format", () => {
      expect(DateHelper.todayFormatted("YYYY-MM-DD")).toEqual(
        moment().format("YYYY-MM-DD")
      );
    });
  });

  describe("weekdaysMinified", () => {
    it("returns the days of week by locale minified", () => {
      expect(DateHelper.weekdaysMinified(enGB.locale())).toEqual([
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa",
      ]);
    });
  });

  describe("withinRange", () => {
    it("returns true if the date is today", () => {
      const testDate = moment().format("YYYY-MM-DD");
      expect(
        DateHelper.withinRange({
          value: testDate,
          limit: 30,
          units: "days",
          ...localeData,
        })
      ).toBeTruthy();
    });

    it("returns true if the date is within range", () => {
      const testDate = moment().add(29, "days").format("YYYY-MM-DD");
      expect(
        DateHelper.withinRange({
          value: testDate,
          limit: 30,
          units: "days",
          ...localeData,
        })
      ).toBeTruthy();
    });

    it("returns true if the date is equal to the given range", () => {
      const testDate = moment().add(30, "days").format("YYYY-MM-DD");
      expect(
        DateHelper.withinRange({
          value: testDate,
          limit: 30,
          units: "days",
          ...localeData,
        })
      ).toBeTruthy();
    });

    it("returns false if the date is beyond the given range", () => {
      const testDate = moment().add(31, "days").format("YYYY-MM-DD");
      expect(
        DateHelper.withinRange({
          value: testDate,
          limit: 30,
          units: "days",
          ...localeData,
        })
      ).toBeFalsy();
    });

    it("returns false if the date is many years in the past", () => {
      const testDate = moment().add(100, "years").format("YYYY-MM-DD");
      expect(
        DateHelper.withinRange({
          value: testDate,
          limit: 1,
          units: "years",
          ...localeData,
        })
      ).toBeFalsy();
    });
  });
});
