import { cornerProperties, getDragSurface } from "./drag-surface";

export type DropIndicatorPosition = "top" | "bottom" | "left" | "right";

export interface DropIndicator {
  position: DropIndicatorPosition;
  top: number;
  left: number;
  width: number;
  height: number;
}

type Bounds = Pick<
  DOMRect,
  "top" | "bottom" | "left" | "right" | "width" | "height"
>;

/** Use the source's current position so scrolling and wrapped rows are accounted for. */
export function getDropIndicatorPosition(
  source: Bounds,
  target: Bounds,
): DropIndicatorPosition {
  const verticalOverlap =
    Math.min(source.bottom, target.bottom) - Math.max(source.top, target.top);
  const horizontallySeparated =
    source.right <= target.left || target.right <= source.left;
  const sameRow =
    horizontallySeparated &&
    verticalOverlap > Math.min(source.height, target.height) / 2;

  if (sameRow) {
    return source.left < target.left ? "right" : "left";
  }

  return source.top < target.top ? "bottom" : "top";
}

function getRadii(surface: HTMLElement, bounds: Bounds) {
  const style = getComputedStyle(surface);
  const toPixels = (value: string, size: number) =>
    value.endsWith("%")
      ? (parseFloat(value) * size) / 100
      : parseFloat(value) || 0;
  const corners = cornerProperties.map((property) => {
    const [x, y = x] = style[property].split(/\s+/);
    return { x: toPixels(x, bounds.width), y: toPixels(y, bounds.height) };
  });
  const [topLeft, topRight, bottomRight, bottomLeft] = corners;
  // CSS scales overlapping corner radii down to fit the border box.
  const fit = (size: number, requested: number) =>
    requested > 0 ? size / requested : 1;
  const scale = Math.min(
    1,
    fit(bounds.width, topLeft.x + topRight.x),
    fit(bounds.width, bottomLeft.x + bottomRight.x),
    fit(bounds.height, topLeft.y + bottomLeft.y),
    fit(bounds.height, topRight.y + bottomRight.y),
  );
  return corners.map(({ x, y }) => ({ x: x * scale, y: y * scale }));
}

export function getDropIndicator({
  element,
  dragHandle,
  source,
  surface: registeredSurface,
  sourceSurface,
}: {
  element: HTMLElement;
  dragHandle: HTMLElement;
  source: HTMLElement;
  surface?: HTMLElement | null;
  sourceSurface?: HTMLElement | null;
}): DropIndicator {
  const sourceItem =
    source.closest<HTMLElement>('[data-component="draggable-item"]') ?? source;
  const sourceBounds = (
    sourceSurface ?? getDragSurface(sourceItem, source)
  ).getBoundingClientRect();
  const surface = registeredSurface ?? getDragSurface(element, dragHandle);
  const bounds = surface.getBoundingClientRect();
  const itemBounds = element.getBoundingClientRect();
  const position = getDropIndicatorPosition(sourceBounds, bounds);
  const [topLeft, topRight, bottomRight, bottomLeft] = getRadii(
    surface,
    bounds,
  );
  const top = bounds.top - itemBounds.top;
  const left = bounds.left - itemBounds.left;
  const thickness = 3;

  if (position === "top" || position === "bottom") {
    const start = position === "top" ? topLeft.x : bottomLeft.x;
    const end = position === "top" ? topRight.x : bottomRight.x;
    return {
      position,
      top: top + (position === "bottom" ? bounds.height - thickness : 0),
      left: left + start,
      width: Math.max(0, bounds.width - start - end),
      height: thickness,
    };
  }

  const start = position === "left" ? topLeft.y : topRight.y;
  const end = position === "left" ? bottomLeft.y : bottomRight.y;
  return {
    position,
    top: top + start,
    left: left + (position === "right" ? bounds.width - thickness : 0),
    width: thickness,
    height: Math.max(0, bounds.height - start - end),
  };
}
