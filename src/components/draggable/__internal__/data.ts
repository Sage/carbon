/* istanbul ignore file: Test with Playwright for better reliability */

/** Helper functions for safer type checking. */

const PRIVATE_DRAGGABLE_KEY = Symbol("drag");
const PRIVATE_DROP_TARGET_KEY = Symbol("drop");

export type Draggable = {
  [PRIVATE_DRAGGABLE_KEY]: true;
  /** Unique identifier of the draggable item */
  id: string;
  /** The index of the draggable item when dragging was initiated */
  initialIndex: number;
  /** Bounding rectangle of the draggable item  */
  rect: DOMRect;
  /** Unique identifier of the context instance the item belongs to */
  contextId: symbol;
};

export type DropTarget = {
  [PRIVATE_DROP_TARGET_KEY]: true;
  /** Unique identifier of the drop target */
  id: string;
  /** Unique identifier of the context instance the drop target belongs to */
  contextId: symbol;
};

export function getDraggable(
  data: Omit<Draggable, typeof PRIVATE_DRAGGABLE_KEY>,
): Draggable {
  return {
    [PRIVATE_DRAGGABLE_KEY]: true,
    ...data,
  };
}

export function getDropTarget(
  data: Omit<DropTarget, typeof PRIVATE_DROP_TARGET_KEY>,
): DropTarget {
  return {
    [PRIVATE_DROP_TARGET_KEY]: true,
    ...data,
  };
}

export function isDraggable(
  data: Record<string | symbol, unknown>,
): data is Draggable {
  return Boolean(data[PRIVATE_DRAGGABLE_KEY]);
}

export function isDropTarget(
  data: Record<string | symbol, unknown>,
): data is DropTarget {
  return Boolean(data[PRIVATE_DROP_TARGET_KEY]);
}
