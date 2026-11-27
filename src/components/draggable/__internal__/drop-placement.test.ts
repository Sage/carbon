import { getDropLocation, getInsertionIndex } from "./drop-placement";

const item = (
  id: string,
  left: number,
  top: number,
  width = 100,
  height = 100,
) => ({
  id,
  bounds: {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
  },
});

test.each([
  { y: 125, placement: "before", position: "top" },
  { y: 210, placement: "before", position: "top" },
])(
  "defaults to before without preview geometry in a vertical list at y=$y",
  ({ y, placement, position }) => {
    expect(
      getDropLocation([item("a", 0, 0), item("b", 0, 120), item("c", 0, 240)], {
        clientX: 50,
        clientY: y,
      }),
    ).toEqual({ id: "b", placement, position });
  },
);

test.each([
  { x: 125, placement: "before", position: "left" },
  { x: 215, placement: "before", position: "left" },
])(
  "defaults to before without preview geometry in a horizontal row at x=$x",
  ({ x, placement, position }) => {
    expect(
      getDropLocation([item("a", 0, 0), item("b", 120, 0), item("c", 240, 0)], {
        clientX: x,
        clientY: 50,
      }),
    ).toEqual({ id: "b", placement, position });
  },
);

test("a gap between list items resolves to the same boundary from either side", () => {
  const items = [item("a", 0, 0), item("b", 0, 140), item("c", 0, 280)];

  expect(getDropLocation(items, { clientX: 50, clientY: 110 })).toEqual({
    id: "a",
    placement: "after",
    position: "bottom",
  });
  expect(getDropLocation(items, { clientX: 50, clientY: 130 })).toEqual({
    id: "b",
    placement: "before",
    position: "top",
  });
});

test("supports both sides of gaps in RTL rows", () => {
  const items = [item("a", 280, 0), item("b", 140, 0), item("c", 0, 0)];

  expect(getDropLocation(items, { clientX: 270, clientY: 50 })).toEqual({
    id: "a",
    placement: "after",
    position: "left",
  });
  expect(getDropLocation(items, { clientX: 250, clientY: 50 })).toEqual({
    id: "b",
    placement: "before",
    position: "right",
  });
});

test("resolves gaps between wrapped rows and handles a final single-item row", () => {
  const items = [item("a", 0, 0), item("b", 140, 0), item("c", 0, 140)];

  expect(getDropLocation(items, { clientX: 190, clientY: 110 })).toEqual({
    id: "b",
    placement: "after",
    position: "bottom",
  });
  expect(getDropLocation(items, { clientX: 50, clientY: 130 })).toEqual({
    id: "c",
    placement: "before",
    position: "top",
  });
  expect(getDropLocation(items, { clientX: 110, clientY: 190 })).toEqual({
    id: "c",
    placement: "after",
    position: "right",
  });
});

test("a vertical layout can be reversed", () => {
  expect(
    getDropLocation([item("a", 0, 140), item("b", 0, 0)], {
      clientX: 50,
      clientY: -10,
    }),
  ).toEqual({ id: "b", placement: "after", position: "top" });
});

test("top and bottom edges follow row order in a wrapped RTL grid", () => {
  const items = [item("a", 140, 0), item("b", 0, 0), item("c", 140, 140)];

  expect(getDropLocation(items, { clientX: 190, clientY: 130 })).toEqual({
    id: "c",
    position: "top",
    placement: "before",
  });
  expect(getDropLocation(items, { clientX: 50, clientY: 110 })).toEqual({
    id: "b",
    position: "bottom",
    placement: "after",
  });
});

test("a single item defaults to vertical before/after placement", () => {
  expect(
    getDropLocation([item("a", 0, 0)], { clientX: 50, clientY: 5 }),
  ).toEqual({ id: "a", position: "top", placement: "before" });
});

test("uses the layout direction for a single-item horizontal container", () => {
  expect(
    getDropLocation(
      [item("a", 0, 0)],
      { clientX: -5, clientY: 50 },
      { horizontal: true, reverse: true },
    ),
  ).toEqual({ id: "a", placement: "after", position: "left" });
});

test.each([
  { horizontal: false, reverse: false, x: 50, y: 95, position: "top" },
  { horizontal: false, reverse: true, x: 50, y: 5, position: "bottom" },
  { horizontal: true, reverse: false, x: 95, y: 50, position: "left" },
  { horizontal: true, reverse: true, x: 5, y: 50, position: "right" },
])(
  "falls back to before without preview geometry, including reversed layouts: $position",
  ({ horizontal, reverse, x, y, position }) => {
    expect(
      getDropLocation(
        [item("last", 0, 0)],
        { clientX: x, clientY: y },
        { horizontal, reverse },
      ),
    ).toEqual({ id: "last", placement: "before", position });
  },
);

test.each([
  { horizontal: false, reverse: false, x: 50, y: 101, position: "bottom" },
  { horizontal: false, reverse: true, x: 50, y: -1, position: "top" },
  { horizontal: true, reverse: false, x: 101, y: 50, position: "right" },
  { horizontal: true, reverse: true, x: -1, y: 50, position: "left" },
])(
  "dropping beyond the last item's trailing edge inserts after: $position",
  ({ horizontal, reverse, x, y, position }) => {
    expect(
      getDropLocation(
        [item("last", 0, 0)],
        { clientX: x, clientY: y },
        { horizontal, reverse },
      ),
    ).toEqual({ id: "last", placement: "after", position });
  },
);

for (const { horizontal, reverse, beforeEdge, afterEdge } of [
  { horizontal: false, reverse: false, beforeEdge: "top", afterEdge: "bottom" },
  { horizontal: false, reverse: true, beforeEdge: "bottom", afterEdge: "top" },
  { horizontal: true, reverse: false, beforeEdge: "left", afterEdge: "right" },
  { horizontal: true, reverse: true, beforeEdge: "right", afterEdge: "left" },
]) {
  for (const size of [60, 100, 160]) {
    test.each([0, 0.14, 0.15, 0.16])(
      `uses dragged surface overlap for ${beforeEdge}/${afterEdge} placement with size ${size}: %s past the target`,
      (fraction) => {
        const offset = size * (reverse ? 0.25 : 0.75);
        const start = reverse ? -size * fraction : 100 - size + size * fraction;
        const pointer = start + offset;
        const after = fraction >= 0.15;
        expect(
          getDropLocation(
            [item("target", 0, 0)],
            {
              clientX: horizontal ? pointer : 50,
              clientY: horizontal ? 50 : pointer,
            },
            { horizontal, reverse },
            {
              width: horizontal ? size : 100,
              height: horizontal ? 100 : size,
              offsetX: horizontal ? offset : 50,
              offsetY: horizontal ? 50 : offset,
            },
          ),
        ).toEqual({
          id: "target",
          placement: after ? "after" : "before",
          position: after ? afterEdge : beforeEdge,
        });
      },
    );
  }
}

test.each([10, 50, 75])(
  "uses the grab offset %s to resolve the same preview position",
  (offsetY) => {
    expect(
      getDropLocation(
        [item("target", 0, 0)],
        { clientX: 50, clientY: 16 + offsetY },
        { horizontal: false, reverse: false },
        { width: 100, height: 100, offsetX: 50, offsetY },
      ),
    ).toEqual({ id: "target", placement: "after", position: "bottom" });
  },
);

for (const reverse of [false, true]) {
  test.each([0.14, 0.16])(
    `selects the item with most preview overlap even when the handle is over a neighbour, reversed=${reverse}: %s`,
    (fraction) => {
      const left = 316 + (reverse ? -1 : 1) * 300 * fraction;
      const offsetX = reverse ? 20 : 280;
      expect(
        getDropLocation(
          reverse
            ? [
                item("a", 632, 0, 300),
                item("b", 316, 0, 300),
                item("c", 0, 0, 300),
              ]
            : [
                item("a", 0, 0, 300),
                item("b", 316, 0, 300),
                item("c", 632, 0, 300),
              ],
          { clientX: left + offsetX, clientY: 50 },
          { horizontal: true, reverse },
          { width: 300, height: 100, offsetX, offsetY: 50 },
        ),
      ).toEqual({
        id: "b",
        placement: fraction >= 0.15 ? "after" : "before",
        position: fraction >= 0.15 !== reverse ? "right" : "left",
      });
    },
  );
}

test("a gap boundary takes precedence over preview overlap", () => {
  expect(
    getDropLocation(
      [item("a", 0, 0), item("b", 0, 140)],
      { clientX: 50, clientY: 130 },
      { horizontal: false, reverse: false },
      { width: 100, height: 400, offsetX: 50, offsetY: 10 },
    ),
  ).toEqual({ id: "b", placement: "before", position: "top" });
});

test.each([
  { horizontal: false, reverse: false, position: "bottom" },
  { horizontal: false, reverse: true, position: "top" },
  { horizontal: true, reverse: false, position: "right" },
  { horizontal: true, reverse: true, position: "left" },
])(
  "a direct drop from item 2 onto item 3 swaps neighbours: $position",
  ({ horizontal, reverse, position }) => {
    const items = ["a", "b", "c", "d"].map((id, index) => {
      const offset = (reverse ? 3 - index : index) * 140;
      return item(id, horizontal ? offset : 0, horizontal ? 0 : offset);
    });
    const target = items[2].bounds;
    const location = getDropLocation(
      items,
      { clientX: target.left + 50, clientY: target.top + 50 },
      { horizontal, reverse },
      { width: 100, height: 100, offsetX: 50, offsetY: 50 },
      "b",
    );
    expect(location).toEqual({ id: "c", placement: "after", position });
    expect(getInsertionIndex(1, 2, location?.placement ?? "before")).toBe(2);
  },
);

test("an explicit gap before the next item retains the current order", () => {
  expect(
    getDropLocation(
      [item("a", 0, 0), item("b", 0, 140), item("c", 0, 280)],
      { clientX: 50, clientY: 270 },
      { horizontal: false, reverse: false },
      { width: 100, height: 100, offsetX: 50, offsetY: 50 },
      "b",
    ),
  ).toEqual({ id: "c", placement: "before", position: "top" });
});

test("an unknown source does not turn a direct drop before the first item into after", () => {
  expect(
    getDropLocation(
      [item("a", 0, 0), item("b", 0, 140)],
      { clientX: 50, clientY: 50 },
      { horizontal: false, reverse: false },
      { width: 100, height: 100, offsetX: 50, offsetY: 50 },
      "external",
    ),
  ).toEqual({ id: "a", placement: "before", position: "top" });
});

test("an empty container has no item boundary", () => {
  expect(getDropLocation([], { clientX: 20, clientY: 20 })).toBeNull();
});

test.each([
  { source: 0, target: 2, placement: "before", expected: 1 },
  { source: 0, target: 2, placement: "after", expected: 2 },
  { source: 3, target: 1, placement: "before", expected: 1 },
  { source: 3, target: 1, placement: "after", expected: 2 },
  { source: 1, target: 0, placement: "after", expected: 1 },
  { source: 1, target: 2, placement: "before", expected: 1 },
  { source: 1, target: 1, placement: "before", expected: 1 },
  { source: 1, target: 1, placement: "after", expected: 1 },
  { source: -1, target: 1, placement: "after", expected: 2 },
] as const)(
  "inserts source $source $placement target $target at $expected after removal",
  ({ source, target, placement, expected }) => {
    expect(getInsertionIndex(source, target, placement)).toBe(expected);
  },
);
