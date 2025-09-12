/** Helper functions for safely type checking drag and drop data. */

// Using symbols guarantees keys are unique and won't conflict with other Carbon installations on the page.
const DRAGGABLE_KEY = Symbol("drag");
const DROP_TARGET_KEY = Symbol("drop");

export type DragData = {
  [DRAGGABLE_KEY]: true;
  id: string;
};

export type DropTargetData = {
  [DROP_TARGET_KEY]: true;
  id: string;
};

export function getDragData(
  data: Omit<DragData, typeof DRAGGABLE_KEY>,
): DragData {
  return {
    [DRAGGABLE_KEY]: true,
    ...data,
  };
}

export function getDropTargetData(
  data: Omit<DropTargetData, typeof DROP_TARGET_KEY>,
): DropTargetData {
  return {
    [DROP_TARGET_KEY]: true,
    ...data,
  };
}

export function isDragData(
  data: Record<string | symbol, unknown>,
): data is DragData {
  return Boolean(data[DRAGGABLE_KEY]);
}

export function isDropTargetData(
  data: Record<string | symbol, unknown>,
): data is DropTargetData {
  return Boolean(data[DROP_TARGET_KEY]);
}
