import { cornerProperties, getDragSurface } from "./drag-surface";

export type DropIndicatorPosition = "top" | "bottom" | "left" | "right";

export interface DropIndicator {
  position: DropIndicatorPosition;
  top: number;
  left: number;
  width: number;
  height: number;
}

type Bounds = Pick<DOMRect, "width" | "height">;

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
  position,
  surface: registeredSurface,
  neighbouringBounds = [],
}: {
  element: HTMLElement;
  dragHandle: HTMLElement;
  position: DropIndicatorPosition;
  surface?: HTMLElement | null;
  neighbouringBounds?: DOMRect[];
}): DropIndicator {
  const surface = registeredSurface ?? getDragSurface(element, dragHandle);
  const bounds = surface.getBoundingClientRect();
  const itemBounds = element.getBoundingClientRect();
  const [topLeft, topRight, bottomRight, bottomLeft] = getRadii(
    surface,
    bounds,
  );
  const top = bounds.top - itemBounds.top;
  const left = bounds.left - itemBounds.left;
  const thickness = 3;
  const horizontal = position === "left" || position === "right";
  const leading = position === "left" || position === "top";
  const axisStart = horizontal ? "left" : "top";
  const axisEnd = horizontal ? "right" : "bottom";
  const crossStart = horizontal ? "top" : "left";
  const crossEnd = horizontal ? "bottom" : "right";
  const distances = neighbouringBounds
    .filter(
      (neighbour) =>
        Math.min(bounds[crossEnd], neighbour[crossEnd]) >
        Math.max(bounds[crossStart], neighbour[crossStart]),
    )
    .map((neighbour) =>
      leading
        ? bounds[axisStart] - neighbour[axisEnd]
        : neighbour[axisStart] - bounds[axisEnd],
    )
    .filter((distance) => distance >= 0);
  // Centre the line itself in the gap; retain an offset at outer edges.
  const gap = distances.length ? (Math.min(...distances) - thickness) / 2 : 8;

  if (position === "top" || position === "bottom") {
    const start = position === "top" ? topLeft.x : bottomLeft.x;
    const end = position === "top" ? topRight.x : bottomRight.x;

    return {
      position,
      top:
        top + (position === "bottom" ? bounds.height + gap : -thickness - gap),
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
    left: left + (position === "right" ? bounds.width + gap : -thickness - gap),
    width: thickness,
    height: Math.max(0, bounds.height - start - end),
  };
}
