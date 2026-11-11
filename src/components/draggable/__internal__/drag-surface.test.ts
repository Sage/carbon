import { getDragGhost, getDragSurface } from "./drag-surface";

const rect = (
  left: number,
  top: number,
  width: number,
  height: number,
): DOMRect => ({
  left,
  top,
  width,
  height,
  right: left + width,
  bottom: top + height,
  x: left,
  y: top,
  toJSON: () => ({}),
});

function createItem() {
  const item = document.createElement("div");
  const surface = document.createElement("div");
  const handle = document.createElement("span");
  item.append(surface);
  surface.append(handle);
  jest
    .spyOn(item, "getBoundingClientRect")
    .mockReturnValue(rect(10, 20, 220, 120));
  jest
    .spyOn(surface, "getBoundingClientRect")
    .mockReturnValue(rect(22, 28, 180, 90));
  return { item, surface, handle };
}

test("captures the outer rounded surface's bounds and individual elliptical corners", () => {
  const { item, surface, handle } = createItem();
  surface.style.borderTopLeftRadius = "24px 12px";
  surface.style.borderTopRightRadius = "8px";
  surface.style.borderBottomRightRadius = "16px 20px";
  surface.style.borderBottomLeftRadius = "4px";
  handle.style.borderTopLeftRadius = "40px";
  expect(getDragSurface(item, handle)).toBe(surface);
  expect(getDragGhost(item, handle)).toEqual({
    top: 8,
    left: 12,
    width: 180,
    height: 90,
    borderTopLeftRadius: "24px 12px",
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "16px 20px",
    borderBottomLeftRadius: "4px",
  });
});

test("preserves percentage radii for the same-sized ghost to resolve", () => {
  const { item, surface, handle } = createItem();
  surface.style.borderTopLeftRadius = "25% 10%";
  expect(getDragGhost(item, handle).borderTopLeftRadius).toBe("25% 10%");
});

test("uses the whole item when it has no integrated rounded surface", () => {
  const { item, handle } = createItem();
  expect(getDragSurface(item, handle)).toBe(item);
  expect(getDragGhost(item, handle)).toMatchObject({
    top: 0,
    left: 0,
    width: 220,
    height: 120,
  });
});

test("an explicitly registered square surface overrides rounded descendants and wrapper bounds", () => {
  const { item, surface, handle } = createItem();
  surface.style.borderTopLeftRadius = "0px";
  handle.style.borderTopLeftRadius = "40px";
  expect(getDragGhost(item, handle, surface)).toMatchObject({
    top: 8,
    left: 12,
    width: 180,
    height: 90,
    borderTopLeftRadius: "0px",
  });
});
