import {
  buildYearRange,
  getSelectedDateForMonth,
  getMonthWithinDateRangeForYear,
  getMonthYearTransition,
  normalizeDateBounds,
  parseDateBound,
  parseSelectInteger,
} from "./date-picker.utils";

test.each(["", "not-a-date", "2025-2-03", "2025-02-30"])(
  "ignores invalid date bound %p",
  (value) => {
    expect(parseDateBound(value)).toBeUndefined();
  },
);

test("parses valid date bounds with the shared date utility", () => {
  expect(parseDateBound("2024-02-29")).toEqual(new Date(2024, 1, 29));
});

test.each([
  ["0", 0],
  ["2025", 2025],
  ["-1", -1],
  ["", undefined],
  [" ", undefined],
  ["01", undefined],
  ["1.0", undefined],
] as const)("parses canonical select integer %p", (value, expected) => {
  expect(parseSelectInteger(value)).toBe(expected);
});

test("normalizes reversed date bounds", () => {
  expect(
    normalizeDateBounds({
      minDate: "2027-04-10",
      maxDate: "2025-09-20",
    }),
  ).toEqual({
    minMonth: new Date(2025, 8, 20),
    maxMonth: new Date(2027, 3, 10),
  });
});

test("normalizes missing and already ordered date bounds", () => {
  expect(normalizeDateBounds({})).toEqual({
    minMonth: undefined,
    maxMonth: undefined,
  });
  expect(
    normalizeDateBounds({
      minDate: "2025-04-10",
      maxDate: "2027-09-20",
    }),
  ).toEqual({
    minMonth: new Date(2025, 3, 10),
    maxMonth: new Date(2027, 8, 20),
  });
});

test("builds a stable one-sided year range from its anchor", () => {
  expect(
    buildYearRange({
      minMonth: new Date(2025, 0, 1),
      anchorYear: 2020,
      includedYear: 2025,
      offset: 2,
    }),
  ).toEqual([2025, 2026, 2027]);
});

test("shifts an unbounded range enough to include the displayed year", () => {
  const years = buildYearRange({
    anchorYear: 2200,
    includedYear: 2025,
    offset: 100,
  });

  expect(years[0]).toBe(2025);
  expect(years.at(-1)).toBe(2225);
});

test("clamps a month to the available months in a boundary year", () => {
  expect(
    getMonthWithinDateRangeForYear({
      year: 2025,
      month: 0,
      minMonth: new Date(2025, 3, 10),
    }),
  ).toBe(3);
});

test("clamps a month to both lower and upper boundary years", () => {
  expect(
    getMonthWithinDateRangeForYear({
      year: 2025,
      month: 11,
      minMonth: new Date(2025, 3, 10),
      maxMonth: new Date(2025, 8, 20),
    }),
  ).toBe(8);
});

test("calculates a clamped month and year transition", () => {
  expect(
    getMonthYearTransition({
      displayedMonth: new Date(2025, 0, 15),
      month: 0,
      year: 2024,
      minMonth: new Date(2024, 3, 10),
    }),
  ).toEqual({
    date: new Date(2024, 3, 1),
    month: 3,
    year: 2024,
  });
});

test("clamps a selected month-end date to the target month", () => {
  expect(
    getSelectedDateForMonth({
      selectedDate: new Date(2025, 0, 31),
      month: 1,
      year: 2025,
    }),
  ).toEqual(new Date(2025, 1, 28));
});

test.each([
  [
    new Date(2025, 3, 1),
    new Date(2025, 3, 10),
    undefined,
    new Date(2025, 3, 10),
  ],
  [
    new Date(2025, 8, 30),
    undefined,
    new Date(2025, 8, 20),
    new Date(2025, 8, 20),
  ],
] as const)(
  "clamps a selected date to the exact date bounds",
  (selectedDate, minMonth, maxMonth, expected) => {
    expect(
      getSelectedDateForMonth({
        selectedDate,
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
        minMonth,
        maxMonth,
      }),
    ).toEqual(expected);
  },
);
