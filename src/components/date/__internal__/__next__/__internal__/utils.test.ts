import { enGB } from "date-fns/locale";

import getFormatData from "../../date-formats";
import { formattedValue } from "../../utils";
import {
  buildDateChangeEvent,
  getCurrentMatchedValue,
  getDateInputValue,
  getInitialSelectedDate,
  getSelectedDateFromValue,
} from "./utils";

const { format, formats } = getFormatData(enGB);

describe("DateInput Typical utils", () => {
  describe("getInitialSelectedDate", () => {
    test("parses an initial locale-formatted value", () => {
      expect(
        formattedValue(
          format,
          getInitialSelectedDate("16/03/2019", enGB, format),
        ),
      ).toBe("16/03/2019");
    });

    test("returns undefined for invalid initial values", () => {
      expect(
        getInitialSelectedDate("not a date", enGB, format),
      ).toBeUndefined();
    });
  });

  describe("getSelectedDateFromValue", () => {
    test("parses a valid input value", () => {
      expect(
        formattedValue(
          format,
          getSelectedDateFromValue("16/03/2019", formats, false),
        ),
      ).toBe("16/03/2019");
    });

    test("parses an ISO value only while handling the initial value", () => {
      expect(
        formattedValue(
          format,
          getSelectedDateFromValue("2019-03-16", formats, true),
        ),
      ).toBe("16/03/2019");
      expect(
        getSelectedDateFromValue("2019-03-16", formats, false),
      ).toBeUndefined();
    });
  });

  describe("buildDateChangeEvent", () => {
    test("builds a Date change event for valid input", () => {
      expect(
        buildDateChangeEvent({
          event: {
            type: "change",
            target: {
              id: "date-input",
              name: "date",
              value: "16/03/2019",
            },
          },
          format,
          formats,
        }),
      ).toEqual({
        target: {
          id: "date-input",
          name: "date",
          value: {
            formattedValue: "16/03/2019",
            rawValue: "2019-03-16",
          },
        },
      });
    });

    test("returns an empty raw value for empty allowed values", () => {
      expect(
        buildDateChangeEvent({
          allowEmptyValue: true,
          event: {
            type: "change",
            target: {
              value: "",
            },
          },
          format,
          formats,
        }).target.value,
      ).toEqual({
        formattedValue: "",
        rawValue: "",
      });
    });

    test("uses the selected date as the formatted value on blur", () => {
      expect(
        buildDateChangeEvent({
          event: {
            type: "blur",
            target: {
              value: "16.03.2019",
            },
          },
          format,
          formats,
          selectedDate: new Date(2019, 2, 16),
        }).target.value,
      ).toEqual({
        formattedValue: "16/03/2019",
        rawValue: "2019-03-16",
      });
    });
  });

  describe("getCurrentMatchedValue", () => {
    test("returns the matched value for an ISO value", () => {
      expect(getCurrentMatchedValue("2019-03-16", format, formats)).toBe(
        "16/03/2019",
      );
    });
  });

  describe("getDateInputValue", () => {
    test("formats initial ISO values for display", () => {
      expect(
        getDateInputValue({
          format,
          formats,
          isInitialValue: true,
          value: "2019-03-16",
        }),
      ).toEqual({
        inputValue: "16/03/2019",
        shouldMarkInitialValueChanged: false,
      });
    });

    test("normalizes valid initial values with different separators", () => {
      expect(
        getDateInputValue({
          format,
          formats,
          isInitialValue: true,
          value: "16.03.2019",
        }),
      ).toEqual({
        inputValue: "16/03/2019",
        shouldMarkInitialValueChanged: true,
      });
    });

    test("returns the original value for non-initial values", () => {
      expect(
        getDateInputValue({
          format,
          formats,
          isInitialValue: false,
          value: "16.03.2019",
        }),
      ).toEqual({
        inputValue: "16.03.2019",
        shouldMarkInitialValueChanged: false,
      });
    });
  });
});
