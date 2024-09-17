import guid from ".";

test("should generate a guid with a length of 36 characters", () => {
  expect(guid().length).toEqual(36);
});

test("should generate a unique guid each time it is called", () => {
  const guids = Array.from({ length: 5 }, () => guid());
  const uniqueGuids = new Set(guids);
  expect(uniqueGuids.size).toEqual(5);
});
