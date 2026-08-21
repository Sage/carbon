jest.mock("./utils", () => ({
  ...jest.requireActual("./utils"),
  findMatchedFormatAndValue: () => ["dd/MM/yyyy", "31/02/2019"],
  parseDate: () => new Date(Number.NaN),
}));

import { getSelectedDate } from "./date-input-value.utils";

test("rejects a matched date when parsing produces an invalid date", () => {
  expect(getSelectedDate("31/02/2019", ["dd/MM/yyyy"], false)).toBeUndefined();
});
