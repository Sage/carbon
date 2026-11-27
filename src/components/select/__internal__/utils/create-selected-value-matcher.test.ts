import createSelectedValueMatcher from "./create-selected-value-matcher";
import isExpectedValue from "./is-expected-value";

test("preserves string, object ID and reference equality", () => {
  const reference = { label: "no ID" };
  const objectId = {};
  const values = [
    "amber",
    { id: 1 },
    { id: "2" },
    reference,
    { id: objectId },
    { id: NaN },
  ];
  const matches = createSelectedValueMatcher(values);
  const candidates = [
    ...values,
    "black",
    { id: "1" },
    { id: 2 },
    { id: 1, label: "a fresh object with the same ID" },
    { label: "no ID" },
    { id: null },
    { id: undefined },
    { id: objectId },
    { id: {} },
    { id: NaN },
  ];

  for (const value of candidates) {
    expect(matches(value)).toBe(
      values.some((selected) => isExpectedValue(value, selected)),
    );
  }
});

test("does not rescan selected IDs for each option", () => {
  const readSelectedId = jest.fn((id: number) => id);
  const values = Array.from({ length: 100 }, (_, id) => ({
    get id() {
      return readSelectedId(id);
    },
  }));
  const matches = createSelectedValueMatcher(values);

  for (let id = 0; id < 10000; id += 1) {
    expect(matches({ id })).toBe(id < 100);
  }
  expect(readSelectedId).toHaveBeenCalledTimes(values.length);
});
