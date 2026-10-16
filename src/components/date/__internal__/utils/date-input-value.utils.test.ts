import getFormatData from "../date-formats";
import { enGB } from "date-fns/locale";

import {
  buildDateChangeEvent,
  getDisplayValue,
  getInitialSelectedDate,
  getSelectedDate,
} from "./date-input-value.utils";

const { format, formats } = getFormatData(enGB);
const inputId = "date-input";
const inputName = "date";
const selectedDate = new Date(2019, 2, 16);

test.each(["16/03/2019", "2019-03-16"])(
  "gets the initial selected date from %s",
  (value) => {
    expect(getInitialSelectedDate(value, enGB, format)).toEqual(selectedDate);
  },
);

test("does not get an initial selected date from invalid input", () => {
  expect(getInitialSelectedDate("invalid", enGB, format)).toBeUndefined();
});

test("rejects an invalid date that matches a supported format", () => {
  expect(getSelectedDate("31/02/2019", formats, true)).toBeUndefined();
});

test.each(["16/03/2019", "2019-03-16"])(
  "gets the selected date from %s while pristine",
  (value) => {
    expect(getSelectedDate(value, formats, true)).toEqual(selectedDate);
  },
);

test.each([
  ["invalid", true],
  ["2019-03-16", false],
] as const)(
  "does not get a selected date from %s when pristine is %s",
  (value, shouldParseISOValue) => {
    expect(
      getSelectedDate(value, formats, shouldParseISOValue),
    ).toBeUndefined();
  },
);

test.each([
  ["2019-03-16", "16/03/2019"],
  ["16.03.2019", "16/03/2019"],
] as const)("normalizes pristine input %s", (value, expectedValue) => {
  expect(getDisplayValue(value, format, formats, true)).toBe(expectedValue);
});

test.each(["2019-03-16", "16.03.2019"])(
  "does not normalize edited input %s",
  (value) => {
    expect(getDisplayValue(value, format, formats, false)).toBe(value);
  },
);

test("does not normalize invalid pristine input", () => {
  expect(getDisplayValue("invalid", format, formats, true)).toBe("invalid");
});

test("builds an event for valid input", () => {
  expect(
    buildDateChangeEvent({
      event: {
        type: "change",
        target: {
          id: inputId,
          name: inputName,
          value: "16/03/2019",
        },
      },
      format,
      formats,
    }),
  ).toEqual({
    target: {
      id: inputId,
      name: inputName,
      value: {
        formattedValue: "16/03/2019",
        rawValue: "2019-03-16",
      },
    },
  });
});

test.each(["change", "click"] as const)(
  "preserves the input display value for a %s event",
  (type) => {
    expect(
      buildDateChangeEvent({
        event: { type, target: { value: "16.03.2019" } },
        format,
        formats,
        selectedDate,
      }).target.value.formattedValue,
    ).toBe("16.03.2019");
  },
);

test("uses the selected date as the display value on blur", () => {
  expect(
    buildDateChangeEvent({
      event: { type: "blur", target: { value: "16.03.2019" } },
      format,
      formats,
      selectedDate,
    }).target.value,
  ).toEqual({
    formattedValue: "16/03/2019",
    rawValue: "2019-03-16",
  });
});

test.each([
  [true, ""],
  [false, null],
] as const)(
  "handles empty input when allowEmptyValue is %s",
  (allowEmptyValue, expectedRawValue) => {
    expect(
      buildDateChangeEvent({
        allowEmptyValue,
        event: { type: "change", target: { value: "" } },
        format,
        formats,
      }).target.value.rawValue,
    ).toBe(expectedRawValue);
  },
);

test("omits id and name when they are not provided", () => {
  expect(
    buildDateChangeEvent({
      event: { type: "change", target: { value: "invalid" } },
      format,
      formats,
    }).target,
  ).toEqual({
    value: { formattedValue: "invalid", rawValue: null },
  });
});

test("preserves invalid input on blur when there is no selected date", () => {
  expect(
    buildDateChangeEvent({
      event: {
        type: "blur",
        target: { id: inputId, value: "invalid" },
      },
      format,
      formats,
    }),
  ).toEqual({
    target: {
      id: inputId,
      value: { formattedValue: "invalid", rawValue: null },
    },
  });
});

test("uses the selected date on blur while retaining an invalid raw value", () => {
  expect(
    buildDateChangeEvent({
      event: { type: "blur", target: { value: "invalid" } },
      format,
      formats,
      selectedDate,
    }).target.value,
  ).toEqual({
    formattedValue: "16/03/2019",
    rawValue: null,
  });
});
