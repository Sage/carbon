import guid from ".";

test("generates id with carbon prefix", () => {
  expect(guid()).toMatch(/^carbon-/);
});

test("should generate a unique guid each time it is called", () => {
  const guids = Array.from({ length: 3 }, () => guid());
  const uniqueGuids = new Set(guids);
  expect(uniqueGuids.size).toEqual(3);
});
