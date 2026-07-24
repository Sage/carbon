import { act, renderHook } from "@testing-library/react";
import React from "react";

import useDatePickerMonthYearSelection from "./useDatePickerMonthYearSelection";

const changeEvent = (value: string) =>
  ({ target: { value } }) as React.ChangeEvent<HTMLSelectElement>;

const renderMonthYearSelection = (
  overrides: Partial<
    Parameters<typeof useDatePickerMonthYearSelection>[0]
  > = {},
) => {
  const setFocusedMonth = jest.fn();
  const markSelectorChanged = jest.fn();
  const onMonthYearChange = jest.fn();

  const utils = renderHook(() =>
    useDatePickerMonthYearSelection({
      focusedMonth: new Date(2025, 5, 15),
      setFocusedMonth,
      markSelectorChanged,
      onMonthYearChange,
      ...overrides,
    }),
  );

  return {
    ...utils,
    setFocusedMonth,
    markSelectorChanged,
    onMonthYearChange,
  };
};

test("uses picker bounds to build the available years", () => {
  const { result } = renderMonthYearSelection({
    minDate: "2020-01-01",
    maxDate: "2030-12-31",
    dayPickerProps: {
      startMonth: new Date(2023, 3, 10),
      endMonth: new Date(2026, 8, 20),
    },
  });

  expect(result.current.minMonth).toEqual(new Date(2023, 3, 10));
  expect(result.current.maxMonth).toEqual(new Date(2026, 8, 20));
  expect(result.current.years).toEqual([2023, 2024, 2025, 2026]);
});

test("parses and normalizes reversed date bounds", () => {
  const { result } = renderMonthYearSelection({
    minDate: "2027-04-10",
    maxDate: "2025-09-20",
  });

  expect(result.current.minMonth).toEqual(new Date(2025, 8, 20));
  expect(result.current.maxMonth).toEqual(new Date(2027, 3, 10));
  expect(result.current.years).toEqual([2025, 2026, 2027]);
});

test.each([
  {
    bound: { minDate: "2200-04-10" },
    displayedMonth: new Date(2200, 3, 10),
    firstYear: 2200,
    lastYear: 2300,
  },
  {
    bound: { maxDate: "1900-09-20" },
    displayedMonth: new Date(1900, 8, 20),
    firstYear: 1800,
    lastYear: 1900,
  },
])(
  "keeps the displayed year in a distant one-sided $bound range",
  ({ bound, displayedMonth, firstYear, lastYear }) => {
    const { result } = renderMonthYearSelection(bound);

    expect(result.current.displayedMonth).toEqual(displayedMonth);
    expect(result.current.years[0]).toBe(firstYear);
    expect(result.current.years.at(-1)).toBe(lastYear);
    expect(result.current.years).toContain(displayedMonth.getFullYear());
  },
);

test("changes month and emits a month-end-safe selected date", () => {
  const selectedDate = new Date(2025, 0, 31);
  const { result, setFocusedMonth, markSelectorChanged, onMonthYearChange } =
    renderMonthYearSelection({ selectedDate });
  const event = changeEvent("1");

  act(() => result.current.handleMonthChange(event));

  expect(markSelectorChanged).toHaveBeenCalledWith("month");
  expect(setFocusedMonth).toHaveBeenCalledWith(new Date(2025, 1, 1));
  expect(onMonthYearChange).toHaveBeenCalledWith(new Date(2025, 1, 28), event);
});

test("clamps the month and selected day when changing to a boundary year", () => {
  const { result, setFocusedMonth, markSelectorChanged, onMonthYearChange } =
    renderMonthYearSelection({
      minDate: "2024-04-10",
      focusedMonth: new Date(2025, 0, 15),
      selectedDate: new Date(2025, 5, 5),
    });
  const event = changeEvent("2024");

  act(() => result.current.handleYearChange(event));

  expect(markSelectorChanged).toHaveBeenCalledWith("year");
  expect(setFocusedMonth).toHaveBeenCalledWith(new Date(2024, 3, 1));
  expect(onMonthYearChange).toHaveBeenCalledWith(new Date(2024, 3, 10), event);
});

test("does not use picker navigation bounds to clamp the selected day", () => {
  const { result, setFocusedMonth, onMonthYearChange } =
    renderMonthYearSelection({
      dayPickerProps: { startMonth: new Date(2024, 3, 10) },
      focusedMonth: new Date(2025, 0, 15),
      selectedDate: new Date(2025, 5, 5),
    });
  const event = changeEvent("2024");

  act(() => result.current.handleYearChange(event));

  expect(setFocusedMonth).toHaveBeenCalledWith(new Date(2024, 3, 1));
  expect(onMonthYearChange).toHaveBeenCalledWith(new Date(2024, 3, 5), event);
});

test("does not notify when there is no selected date", () => {
  const { result, setFocusedMonth, onMonthYearChange } =
    renderMonthYearSelection();

  act(() => result.current.handleMonthChange(changeEvent("10")));

  expect(setFocusedMonth).toHaveBeenCalledWith(new Date(2025, 10, 1));
  expect(onMonthYearChange).not.toHaveBeenCalled();
});

test.each([
  ["month", "not-a-month"],
  ["month", ""],
  ["month", " "],
  ["month", "12"],
  ["month", "1.5"],
  ["year", "not-a-year"],
  ["year", ""],
  ["year", "2126"],
] as const)("ignores invalid %s select value %p", (selector, value) => {
  const { result, setFocusedMonth, markSelectorChanged, onMonthYearChange } =
    renderMonthYearSelection({ selectedDate: new Date(2025, 5, 5) });

  act(() => {
    if (selector === "month") {
      result.current.handleMonthChange(changeEvent(value));
    } else {
      result.current.handleYearChange(changeEvent(value));
    }
  });

  expect(setFocusedMonth).not.toHaveBeenCalled();
  expect(markSelectorChanged).not.toHaveBeenCalled();
  expect(onMonthYearChange).not.toHaveBeenCalled();
});

test("keeps the displayed year available when initial bounds are removed", () => {
  const setFocusedMonth = jest.fn();
  const markSelectorChanged = jest.fn();
  const focusedMonth = new Date(2025, 5, 15);
  const { result, rerender } = renderHook(
    ({ minDate }: { minDate?: string }) =>
      useDatePickerMonthYearSelection({
        minDate,
        focusedMonth,
        setFocusedMonth,
        markSelectorChanged,
      }),
    { initialProps: { minDate: "2200-04-10" as string | undefined } },
  );

  rerender({ minDate: undefined });

  expect(result.current.displayedMonth).toEqual(focusedMonth);
  expect(result.current.years).toContain(focusedMonth.getFullYear());
  expect(result.current.years[0]).toBe(2025);
  expect(result.current.years.at(-1)).toBe(2225);
});

test("recalculates the displayed month and years when bounds change dynamically", () => {
  const setFocusedMonth = jest.fn();
  const markSelectorChanged = jest.fn();
  const focusedMonth = new Date(2025, 5, 15);
  const { result, rerender } = renderHook(
    ({ minDate }: { minDate?: string }) =>
      useDatePickerMonthYearSelection({
        minDate,
        focusedMonth,
        setFocusedMonth,
        markSelectorChanged,
      }),
    { initialProps: { minDate: undefined as string | undefined } },
  );

  rerender({ minDate: "2030-04-10" });

  expect(result.current.displayedMonth).toEqual(new Date(2030, 3, 10));
  expect(result.current.years[0]).toBe(2030);
  expect(setFocusedMonth).not.toHaveBeenCalled();
});

test("keeps the default year range stable after changing year", () => {
  const setFocusedMonth = jest.fn();
  const markSelectorChanged = jest.fn();
  const { result } = renderHook(() => {
    const [focusedMonth, updateFocusedMonth] = React.useState<Date | undefined>(
      new Date(2025, 5, 15),
    );

    return useDatePickerMonthYearSelection({
      focusedMonth,
      setFocusedMonth: (value) => {
        setFocusedMonth(value);
        updateFocusedMonth(value);
      },
      markSelectorChanged,
    });
  });
  const initialYears = result.current.years;

  act(() => result.current.handleYearChange(changeEvent("2125")));

  expect(setFocusedMonth).toHaveBeenCalledWith(new Date(2125, 5, 1));
  expect(result.current.displayedMonth).toEqual(new Date(2125, 5, 1));
  expect(result.current.years).toEqual(initialYears);
  expect(result.current.years[0]).toBe(1925);
  expect(result.current.years.at(-1)).toBe(2125);
});
