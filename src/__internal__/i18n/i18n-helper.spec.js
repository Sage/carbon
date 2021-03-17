import i18n from "i18next";
import { getFormat, getFormatDecimal } from "./i18n-helper";
import "../../__spec_helper__/I18next";

describe("I18n Helper", () => {
  beforeAll(() => {
    i18n.addResourceBundle("en", "carbon", {
      number: {
        format: {
          delimiter: ",",
          separator: ".",
        },
        currency: {
          format: {
            unit: "£",
            format: "%u%n",
          },
        },
      },
    });

    i18n.addResourceBundle("fr", "carbon", {
      number: {
        format: {
          delimiter: ".",
          separator: ",",
        },
        currency: {
          format: {
            unit: "€",
            format: "%n %u",
          },
        },
      },
    });
  });

  describe("getFormat", () => {
    const enResult = {
      delimiter: ",",
      format: "%u%n",
      separator: ".",
      unit: "£",
    };
    const frResult = {
      delimiter: ".",
      format: "%n %u",
      separator: ",",
      unit: "€",
    };

    afterAll(() => {
      i18n.changeLanguage("en");
    });

    it("when locale is set en", () => {
      i18n.changeLanguage("en");

      expect(getFormat()).toEqual(enResult);
      expect(getFormat("en")).toEqual(enResult);
      expect(getFormat("fr")).toEqual({
        ...enResult,
        format: frResult.format,
        unit: frResult.unit,
      });
    });

    it("when locale is set fr", () => {
      i18n.changeLanguage("fr");

      expect(getFormat()).toEqual(frResult);
      expect(getFormat("fr")).toEqual(frResult);
      expect(getFormat("en")).toEqual({
        ...frResult,
        format: enResult.format,
        unit: enResult.unit,
      });
    });
  });

  describe("getFormatDecimal", () => {
    describe("when a value is provided", () => {
      describe("and precision is not provided, ", () => {
        it("returns the formated value using defalut precision", () => {
          expect(getFormatDecimal("1234567")).toEqual("1,234,567.00");
          expect(getFormatDecimal("1000")).toEqual("1,000.00");
          expect(getFormatDecimal("100")).toEqual("100.00");
          expect(getFormatDecimal("1234567.894")).toEqual("1,234,567.89");
        });
      });

      describe("and a precision is provided, ", () => {
        it("returns the formated value using provided precision", () => {
          expect(getFormatDecimal("1234567", 3)).toEqual("1,234,567.000");
          expect(getFormatDecimal("1000", 0)).toEqual("1,000");
          expect(getFormatDecimal("100", 1)).toEqual("100.0");
          expect(getFormatDecimal("1234567.894", 3)).toEqual("1,234,567.894");
          expect(getFormatDecimal("123.555555555555555", 15)).toEqual(
            "123.555555555555555"
          );
          expect(getFormatDecimal("-987654321987654321.5555555", 7)).toEqual(
            "-987,654,321,987,654,321.5555555"
          );
          expect(getFormatDecimal("-987654321987654321.5555555", 8)).toEqual(
            "-987,654,321,987,654,321.55555550"
          );
          expect(getFormatDecimal("-987654321987654321.5555555", 6)).toEqual(
            "-987,654,321,987,654,321.555556"
          );
          expect(getFormatDecimal("90071992547.40992", 5)).toEqual(
            "90,071,992,547.40992"
          );
          expect(getFormatDecimal("90071992547.40992", 6)).toEqual(
            "90,071,992,547.409920"
          );
          expect(getFormatDecimal("90071992547.40992", 4)).toEqual(
            "90,071,992,547.4099"
          );
          expect(getFormatDecimal("90071992547.406", 5)).toEqual(
            "90,071,992,547.40600"
          );
          expect(getFormatDecimal("90071992547.406", 15)).toEqual(
            "90,071,992,547.406000000000000"
          );
        });
      });
    });

    describe("when a value is not provided", () => {
      it("returns the 0.00 value", () => {
        expect(getFormatDecimal()).toEqual("0.00");
      });
    });

    describe("when locale is not set", () => {
      beforeAll(() => {
        i18n.changeLanguage(null);
      });

      afterAll(() => {
        i18n.changeLanguage("en");
      });

      it("defaults to en", () => {
        expect(getFormatDecimal("1234567", 3)).toEqual("1,234,567.000");
      });
    });
  });
});
