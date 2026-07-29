import filterPropsByName from ".";

test("filters out blocked prop names", () => {
  const props = {
    keep: "value",
    tooltipId: "legacy-id",
    validationOnLabel: true,
  };

  const result = filterPropsByName(
    props,
    new Set(["tooltipId", "validationOnLabel"]),
  );

  expect(result).toEqual({ keep: "value" });
});

test("returns a new object", () => {
  const props = { foo: "bar" };

  const result = filterPropsByName(props, new Set());

  expect(result).toEqual(props);
  expect(result).not.toBe(props);
});

test("does not remove keys that are not blocked", () => {
  const props = { one: 1, two: 2 };

  const result = filterPropsByName(props, new Set(["three"]));

  expect(result).toEqual(props);
});
