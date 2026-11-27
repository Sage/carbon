import type { DropIndicator, DropIndicatorPosition } from "./drop-indicator";

export type Placement = "before" | "after";
export type Bounds = Pick<
  DOMRect,
  "left" | "right" | "top" | "bottom" | "width" | "height"
>;

export interface RegisteredDropItem {
  id: string;
  element: HTMLElement;
  dragHandle: HTMLElement;
  getSurface: () => HTMLElement;
  onIndicatorChange: (indicator: DropIndicator | null) => void;
}

export interface DropLocation {
  id: string;
  placement: Placement;
  position: DropIndicatorPosition;
}

/** Size of the dragged surface and the point at which it was grabbed. */
export interface DragPreview {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

const sameRow = (a: Bounds, b: Bounds) =>
  (a.right <= b.left || b.right <= a.left) &&
  Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) >
    Math.min(a.height, b.height) / 2;

/** Resolve item hover from preview overlap and gaps from the pointer position. */
export function getDropLocation(
  items: { id: string; bounds: Bounds }[],
  { clientX: x, clientY: y }: { clientX: number; clientY: number },
  fallback: { horizontal: boolean; reverse: boolean } = {
    horizontal: false,
    reverse: false,
  },
  preview?: DragPreview,
  sourceId?: string,
): DropLocation | null {
  if (!items.length) return null;

  let { horizontal, reverse } = fallback;
  const rowIndex = items.findIndex(
    (item, index) => index > 0 && sameRow(items[index - 1].bounds, item.bounds),
  );

  if (rowIndex > 0) {
    horizontal = true;
    reverse = items[rowIndex].bounds.left < items[rowIndex - 1].bounds.left;
  } else if (items.length > 1) {
    horizontal = false;
    reverse = items[1].bounds.top < items[0].bounds.top;
  }

  const distance = ({ bounds }: (typeof items)[number]) => {
    const dx = Math.max(bounds.left - x, 0, x - bounds.right);
    const dy = Math.max(bounds.top - y, 0, y - bounds.bottom);

    return dx * dx + dy * dy;
  };
  const closest = items.reduce((closest, item) =>
    distance(item) < distance(closest) ? item : closest,
  );
  const overTarget = distance(closest) === 0;
  let target = closest;
  if (overTarget && preview) {
    const left = x - preview.offsetX;
    const top = y - preview.offsetY;
    const overlap = ({ bounds }: (typeof items)[number]) =>
      Math.max(
        0,
        Math.min(left + preview.width, bounds.right) -
          Math.max(left, bounds.left),
      ) *
      Math.max(
        0,
        Math.min(top + preview.height, bounds.bottom) -
          Math.max(top, bounds.top),
      );
    // The handle can already be over a neighbour while most of the preview is not.
    target = items.reduce(
      (largest, item) => (overlap(item) > overlap(largest) ? item : largest),
      closest,
    );
  }
  const { bounds } = target;
  // Item hover follows the layout axis; gaps can also select wrapped-row boundaries.
  const useHorizontal =
    horizontal &&
    (overTarget ||
      Math.min(x - bounds.left, bounds.right - x) / Math.max(1, bounds.width) <=
        Math.min(y - bounds.top, bounds.bottom - y) /
          Math.max(1, bounds.height));
  if (overTarget) {
    const reversedAxis = (useHorizontal || !horizontal) && reverse;
    let after = false;
    if (preview) {
      const size = useHorizontal ? preview.width : preview.height;
      const start = useHorizontal ? x - preview.offsetX : y - preview.offsetY;
      const pastTarget = reversedAxis
        ? bounds[useHorizontal ? "left" : "top"] - start
        : start + size - bounds[useHorizontal ? "right" : "bottom"];
      after = pastTarget >= size * 0.15;
    }
    // Inserting before the immediate next item would leave the order unchanged.
    // A direct hover should let the user move into that neighbour's position.
    const sourceIndex = items.findIndex(({ id }) => id === sourceId);
    after = after || (sourceIndex >= 0 && items[sourceIndex + 1] === target);
    const trailing = after !== reversedAxis;
    return {
      id: target.id,
      placement: after ? "after" : "before",
      position: useHorizontal
        ? trailing
          ? "right"
          : "left"
        : trailing
          ? "bottom"
          : "top",
    };
  }
  const position: DropIndicatorPosition = useHorizontal
    ? x < bounds.left + bounds.width / 2
      ? "left"
      : "right"
    : y < bounds.top + bounds.height / 2
      ? "top"
      : "bottom";
  const leading = useHorizontal ? position === "left" : position === "top";
  // In a wrapped horizontal layout, top/bottom still follow row order.
  const before = (useHorizontal || !horizontal) && reverse ? !leading : leading;

  return { id: target.id, position, placement: before ? "before" : "after" };
}

/** Convert a boundary in the original list to an index after removing the source. */
export function getInsertionIndex(
  sourceIndex: number,
  targetIndex: number,
  placement: Placement,
) {
  const boundary = targetIndex + (placement === "after" ? 1 : 0);

  return boundary - (sourceIndex >= 0 && sourceIndex < boundary ? 1 : 0);
}
