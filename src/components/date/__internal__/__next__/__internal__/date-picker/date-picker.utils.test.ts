import {
  getSelectedDateForMonth,
  getMonthWithinDateRangeForYear,
  parseDateBound,
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

test("clamps a month to the available months in a boundary year", () => {
  expect(
    getMonthWithinDateRangeForYear({
      year: 2025,
      month: 0,
      minMonth: new Date(2025, 3, 10),
    }),
  ).toBe(3);
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
