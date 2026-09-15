import isValidISOString from "./note.utils";

test.each([
  "2026-01-20",
  "2026-01-20T16:49",
  "2026-01-20T16:49:00",
  "2026-01-20T16:49:00.123Z",
  "2026-01-20T16:49:00+02:00",
])("returns true for the supported ISO value %s", (value) => {
  expect(isValidISOString(value)).toBe(true);
});

test.each([
  "20 Jan 16:49",
  "2026-02-31",
  "2026-01-20T25:00",
  "2026-01-20T16",
  "2026-1-20",
  "2026-01-20 ",
  "not a date",
  "",
])("returns false for the unsupported or invalid value %s", (value) => {
  expect(isValidISOString(value)).toBe(false);
});
