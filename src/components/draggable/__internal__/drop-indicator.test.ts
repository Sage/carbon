import { getDropIndicator, getDropIndicatorPosition } from "./drop-indicator";

const bounds = (left: number, top: number, width = 100, height = 100) => ({
  left,
  top,
  width,
  height,
  right: left + width,
  bottom: top + height,
});

test.each([
  {
    name: "right within a row",
    source: bounds(0, 0),
    target: bounds(120, 0),
    edge: "right",
  },
  {
    name: "left within a row",
    source: bounds(120, 0),
    target: bounds(0, 0),
    edge: "left",
  },
  {
    name: "down in a list",
    source: bounds(0, 0),
    target: bounds(0, 120),
    edge: "bottom",
  },
  {
    name: "up in a list",
    source: bounds(0, 120),
    target: bounds(0, 0),
    edge: "top",
  },
  {
    name: "down across a wrapped row",
    source: bounds(240, 0),
    target: bounds(0, 120),
    edge: "bottom",
  },
  {
    name: "up across a wrapped row",
    source: bounds(0, 120),
    target: bounds(240, 0),
    edge: "top",
  },
  {
    name: "right past an item with a different height",
    source: bounds(0, 0, 100, 140),
    target: bounds(120, 20),
    edge: "right",
  },
  {
    name: "down when tall items only slightly overlap",
    source: bounds(0, 0, 100, 140),
    target: bounds(120, 120),
    edge: "bottom",
  },
])(
  "places the indicator $edge when dragging $name",
  ({ source, target, edge }) => {
    expect(getDropIndicatorPosition(source, target)).toBe(edge);
  },
);

describe("rounded surface bounds", () => {
  const rect = (
    left: number,
    top: number,
    width = 200,
    height = 100,
  ): DOMRect => ({
    ...bounds(left, top, width, height),
    x: left,
    y: top,
    toJSON: () => ({}),
  });

  function createTarget(corners: string[]) {
    const element = document.createElement("div");
    const surface = document.createElement("div");
    const dragHandle = document.createElement("span");
    const source = document.createElement("span");
    element.append(surface);
    surface.append(dragHandle);
    [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomRightRadius",
      "borderBottomLeftRadius",
    ].forEach((property, index) => {
      surface.style.setProperty(
        property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`),
        corners[index],
      );
    });
    jest
      .spyOn(element, "getBoundingClientRect")
      .mockReturnValue(rect(10, 20, 220, 140));
    jest.spyOn(surface, "getBoundingClientRect").mockReturnValue(rect(20, 40));
    return { element, surface, dragHandle, source };
  }

  test.each([undefined, null])(
    "infers the rounded target surface when the registered surface is %s",
    (registeredSurface) => {
      const { element, dragHandle, source } = createTarget([
        "24px 12px",
        "16px 8px",
        "12px 6px",
        "8px 4px",
      ]);
      jest
        .spyOn(source, "getBoundingClientRect")
        .mockReturnValue(rect(20, 160));

      expect(
        getDropIndicator({
          element,
          dragHandle,
          source,
          surface: registeredSurface,
        }),
      ).toEqual({
        position: "top",
        top: 20,
        left: 34,
        width: 160,
        height: 3,
      });
    },
  );

  test("uses explicitly registered square surfaces for the target bounds and drag direction", () => {
    const { element, surface, dragHandle, source } = createTarget([
      "0px",
      "0px",
      "0px",
      "0px",
    ]);
    const sourceSurface = document.createElement("div");
    jest.spyOn(source, "getBoundingClientRect").mockReturnValue(rect(20, 300));
    jest
      .spyOn(sourceSurface, "getBoundingClientRect")
      .mockReturnValue(rect(-200, 40));
    expect(
      getDropIndicator({ element, dragHandle, source, surface, sourceSurface }),
    ).toEqual({
      position: "right",
      top: 20,
      left: 207,
      width: 3,
      height: 100,
    });
  });

  test.each([
    {
      sourceBounds: rect(240, 40),
      position: "left",
      top: 32,
      left: 10,
      width: 3,
      height: 84,
    },
    {
      sourceBounds: rect(-200, 40),
      position: "right",
      top: 28,
      left: 207,
      width: 3,
      height: 86,
    },
    {
      sourceBounds: rect(20, 160),
      position: "top",
      top: 20,
      left: 34,
      width: 160,
      height: 3,
    },
    {
      sourceBounds: rect(20, -80),
      position: "bottom",
      top: 117,
      left: 18,
      width: 180,
      height: 3,
    },
  ])(
    "uses each corner's elliptical radius on the $position edge",
    ({ sourceBounds, ...expected }) => {
      const target = createTarget([
        "24px 12px",
        "16px 8px",
        "12px 6px",
        "8px 4px",
      ]);
      jest
        .spyOn(target.source, "getBoundingClientRect")
        .mockReturnValue(sourceBounds);
      expect(getDropIndicator(target)).toEqual(expected);
    },
  );

  test("resolves percentage radii against the surface dimensions", () => {
    const target = createTarget(Array(4).fill("20% 10%"));
    jest
      .spyOn(target.source, "getBoundingClientRect")
      .mockReturnValue(rect(20, 160));
    expect(getDropIndicator(target)).toEqual({
      position: "top",
      top: 20,
      left: 50,
      width: 120,
      height: 3,
    });
  });

  test("scales overlapping radii and never draws past the remaining straight edge", () => {
    const target = createTarget(Array(4).fill("200px 100px"));
    jest
      .spyOn(target.source, "getBoundingClientRect")
      .mockReturnValue(rect(20, 160));
    expect(getDropIndicator(target)).toEqual({
      position: "top",
      top: 20,
      left: 110,
      width: 0,
      height: 3,
    });
  });
});
