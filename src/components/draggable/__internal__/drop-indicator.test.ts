import { getDropIndicator, DropIndicatorPosition } from "./drop-indicator";

const bounds = (left: number, top: number, width = 100, height = 100) => ({
  left,
  top,
  width,
  height,
  right: left + width,
  bottom: top + height,
});

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
    return { element, surface, dragHandle };
  }

  test.each([undefined, null])(
    "infers the rounded target surface when the registered surface is %s",
    (registeredSurface) => {
      const { element, dragHandle } = createTarget([
        "24px 12px",
        "16px 8px",
        "12px 6px",
        "8px 4px",
      ]);

      expect(
        getDropIndicator({
          element,
          dragHandle,
          position: "top",
          surface: registeredSurface,
        }),
      ).toEqual({
        position: "top",
        top: 9,
        left: 34,
        width: 160,
        height: 3,
      });
    },
  );

  test("uses explicitly registered square surfaces for the target bounds", () => {
    const { element, surface, dragHandle } = createTarget([
      "0px",
      "0px",
      "0px",
      "0px",
    ]);

    expect(
      getDropIndicator({ element, dragHandle, surface, position: "right" }),
    ).toEqual({
      position: "right",
      top: 20,
      left: 218,
      width: 3,
      height: 100,
    });
  });

  test.each([
    {
      position: "left",
      top: 32,
      left: -1,
      width: 3,
      height: 84,
    },
    {
      position: "right",
      top: 28,
      left: 218,
      width: 3,
      height: 86,
    },
    {
      position: "top",
      top: 9,
      left: 34,
      width: 160,
      height: 3,
    },
    {
      position: "bottom",
      top: 128,
      left: 18,
      width: 180,
      height: 3,
    },
  ])(
    "uses each corner's elliptical radius on the $position edge",
    (expected) => {
      const target = createTarget([
        "24px 12px",
        "16px 8px",
        "12px 6px",
        "8px 4px",
      ]);

      expect(
        getDropIndicator({
          ...target,
          position: expected.position as DropIndicatorPosition,
        }),
      ).toEqual(expected);
    },
  );

  test.each([
    {
      position: "left",
      neighbour: rect(-220, 40),
      top: 32,
      left: -11.5,
      width: 3,
      height: 84,
    },
    {
      position: "right",
      neighbour: rect(260, 40),
      top: 28,
      left: 228.5,
      width: 3,
      height: 86,
    },
    {
      position: "top",
      neighbour: rect(20, -100),
      top: -1.5,
      left: 34,
      width: 160,
      height: 3,
    },
    {
      position: "bottom",
      neighbour: rect(20, 180),
      top: 138.5,
      left: 18,
      width: 180,
      height: 3,
    },
  ])(
    "centres the $position indicator between surfaces while retaining its dimensions",
    ({ neighbour, ...expected }) => {
      const target = createTarget([
        "24px 12px",
        "16px 8px",
        "12px 6px",
        "8px 4px",
      ]);
      expect(
        getDropIndicator({
          ...target,
          position: expected.position as DropIndicatorPosition,
          neighbouringBounds: [
            neighbour,
            rect(neighbour.left * 2, neighbour.top * 2),
            rect(20, 40), // Overlapping surfaces cannot define a gap.
            rect(500, 500), // Diagonally separated items are not facing this edge.
          ],
        }),
      ).toEqual(expected);
    },
  );

  test("resolves percentage radii against the surface dimensions", () => {
    const target = createTarget(Array(4).fill("20% 10%"));

    expect(getDropIndicator({ ...target, position: "top" })).toEqual({
      position: "top",
      top: 9,
      left: 50,
      width: 120,
      height: 3,
    });
  });

  test("scales overlapping radii and never draws past the remaining straight edge", () => {
    const target = createTarget(Array(4).fill("200px 100px"));

    expect(getDropIndicator({ ...target, position: "top" })).toEqual({
      position: "top",
      top: 9,
      left: 110,
      width: 0,
      height: 3,
    });
  });
});
