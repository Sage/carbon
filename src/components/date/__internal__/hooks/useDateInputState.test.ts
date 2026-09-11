import { act, renderHook } from "@testing-library/react";
import { enGB } from "date-fns/locale";

import getFormatData from "../date-formats";
import { formattedValue } from "../utils/utils";
import useDateInputState from "./useDateInputState";

const { format, formats } = getFormatData(enGB);

const renderUseDateInputState = (value: string, allowEmptyValue?: boolean) =>
  renderHook(
    ({ currentValue }) =>
      useDateInputState({
        allowEmptyValue,
        format,
        formats,
        value: currentValue,
      }),
    { initialProps: { currentValue: value } },
  );

test("parses an initial locale-formatted value", () => {
  const { result } = renderUseDateInputState("16/03/2019");

  expect(formattedValue(format, result.current.selectedDate)).toBe(
    "16/03/2019",
  );
});

test("does not select an invalid initial value", () => {
  const { result } = renderUseDateInputState("not a date");

  expect(result.current.selectedDate).toBeUndefined();
});

test("updates the selected date when the controlled value changes", () => {
  const { result, rerender } = renderUseDateInputState("16/03/2019");

  rerender({ currentValue: "17/03/2019" });

  expect(formattedValue(format, result.current.selectedDate)).toBe(
    "17/03/2019",
  );
});

test("exposes matching input and selected-date values in every render", () => {
  const renderedValues: { displayValue: string; selectedDate?: string }[] = [];
  const { rerender } = renderHook(
    ({ currentValue }) => {
      const state = useDateInputState({
        format,
        formats,
        value: currentValue,
      });

      renderedValues.push({
        displayValue: state.displayValue,
        selectedDate: state.selectedDate
          ? formattedValue(format, state.selectedDate)
          : undefined,
      });

      return state;
    },
    { initialProps: { currentValue: "2019-03-16" } },
  );

  rerender({ currentValue: "2019-03-17" });

  expect(renderedValues).toEqual([
    { displayValue: "16/03/2019", selectedDate: "16/03/2019" },
    { displayValue: "17/03/2019", selectedDate: "17/03/2019" },
  ]);
});

test("builds a Date change event for valid input", () => {
  const { result } = renderUseDateInputState("16/03/2019");

  expect(
    result.current.createDateChangeEvent({
      type: "change",
      target: {
        id: "date-input",
        name: "date",
        value: "16/03/2019",
      },
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

test("returns an empty raw value when empty values are allowed", () => {
  const { result } = renderUseDateInputState("", true);

  expect(
    result.current.createDateChangeEvent({
      type: "change",
      target: { value: "" },
    }).target.value,
  ).toEqual({
    formattedValue: "",
    rawValue: "",
  });
});

test("uses the selected date as the formatted value on blur", () => {
  const { result } = renderUseDateInputState("16/03/2019");

  expect(
    result.current.createDateChangeEvent({
      type: "blur",
      target: { value: "16.03.2019" },
    }).target.value,
  ).toEqual({
    formattedValue: "16/03/2019",
    rawValue: "2019-03-16",
  });
});

test("reports an unchanged display value for an ISO value", () => {
  const { result } = renderUseDateInputState("2019-03-16");

  expect(result.current.valueNeedsFormatting).toBe(false);
});

test("formats an initial ISO value for display", () => {
  const { result } = renderUseDateInputState("2019-03-16");

  expect(result.current.displayValue).toBe("16/03/2019");
});

test("returns the controlled value after the input has changed", () => {
  const { result, rerender } = renderUseDateInputState("16/03/2019");

  act(() => result.current.trackEditedValue("16.03.2019"));
  rerender({ currentValue: "16.03.2019" });

  expect(result.current.displayValue).toBe("16.03.2019");
});

test("normalizes an external ISO update after the input has changed", () => {
  const { result, rerender } = renderUseDateInputState("16/03/2019");

  act(() => result.current.trackEditedValue("16.03.2019"));
  rerender({ currentValue: "16.03.2019" });
  rerender({ currentValue: "2019-03-17" });

  expect(result.current.displayValue).toBe("17/03/2019");
  expect(formattedValue(format, result.current.selectedDate)).toBe(
    "17/03/2019",
  );
});

test("does not treat an old edited value as a later controlled echo", () => {
  const { result, rerender } = renderUseDateInputState("16/03/2019");

  act(() => result.current.trackEditedValue("16.03.2019"));
  rerender({ currentValue: "16.03.2019" });
  expect(result.current.displayValue).toBe("16.03.2019");

  rerender({ currentValue: "17/03/2019" });
  rerender({ currentValue: "16.03.2019" });

  expect(result.current.displayValue).toBe("16/03/2019");
});

test("keeps an initial value normalized across rerenders", () => {
  const { result, rerender } = renderUseDateInputState("16.03.2019");

  expect(result.current.displayValue).toBe("16/03/2019");

  rerender({ currentValue: "16.03.2019" });

  expect(result.current.displayValue).toBe("16/03/2019");
});

test("formats controlled ISO updates while the input is pristine", () => {
  const { result, rerender } = renderUseDateInputState("2019-03-16");

  rerender({ currentValue: "2019-03-17" });

  expect(result.current.displayValue).toBe("17/03/2019");
  expect(formattedValue(format, result.current.selectedDate)).toBe(
    "17/03/2019",
  );
});
