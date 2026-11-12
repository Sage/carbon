import { RefCallback, useContext, useMemo } from "react";
import DraggableItemContext from "./__internal__/draggable-item.context";

export interface DraggableItemContextValue {
  /** Whether this component is inside a DraggableItem. */
  isDraggable: boolean;
  /** Attach to the outer HTML element whose bounds and corners should be used while dragging. */
  surfaceRef: RefCallback<HTMLElement>;
  /** Current zero-based position within the container. */
  index: number;
  /** Number of items in the container. */
  itemCount: number;
  /** Move this item to a zero-based position, calling the container's getOrder callback. */
  moveTo: (index: number) => void;
}

const inactiveContext: DraggableItemContextValue = {
  isDraggable: false,
  surfaceRef: () => {},
  index: 0,
  itemCount: 0,
  moveTo: () => {},
};

/** Connect a custom component to its surrounding DraggableItem. Safe to use outside one. */
const useDraggableItemContext = (): DraggableItemContextValue => {
  const context = useContext(DraggableItemContext);
  return useMemo(
    () =>
      context
        ? {
            isDraggable: context.isDraggable,
            surfaceRef: context.registerSurface,
            index: context.index,
            itemCount: context.itemCount,
            moveTo: context.moveTo,
          }
        : inactiveContext,
    [context],
  );
};

export default useDraggableItemContext;
