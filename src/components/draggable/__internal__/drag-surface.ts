export const cornerProperties = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius",
] as const;

/** Find the outer rounded surface around the handle, without depending on Card or Tile. */
export function getDragSurface(
  item: HTMLElement,
  handle: HTMLElement,
): HTMLElement {
  let surface = item;
  let ancestor: HTMLElement | null = handle;
  while (ancestor && ancestor !== item) {
    const style = getComputedStyle(ancestor);
    if (cornerProperties.some((property) => parseFloat(style[property]) > 0)) {
      surface = ancestor;
    }
    ancestor = ancestor.parentElement;
  }
  return surface;
}

export interface DragGhost {
  top: number;
  left: number;
  width: number;
  height: number;
  borderTopLeftRadius: string;
  borderTopRightRadius: string;
  borderBottomRightRadius: string;
  borderBottomLeftRadius: string;
}

/** Capture the visible surface before its contents are hidden during dragging. */
export function getDragGhost(
  element: HTMLElement,
  dragHandle: HTMLElement,
  registeredSurface?: HTMLElement | null,
): DragGhost {
  const surface = registeredSurface ?? getDragSurface(element, dragHandle);
  const bounds = surface.getBoundingClientRect();
  const itemBounds = element.getBoundingClientRect();
  const style = getComputedStyle(surface);
  return {
    top: bounds.top - itemBounds.top,
    left: bounds.left - itemBounds.left,
    width: bounds.width,
    height: bounds.height,
    borderTopLeftRadius: style.borderTopLeftRadius,
    borderTopRightRadius: style.borderTopRightRadius,
    borderBottomRightRadius: style.borderBottomRightRadius,
    borderBottomLeftRadius: style.borderBottomLeftRadius,
  };
}
