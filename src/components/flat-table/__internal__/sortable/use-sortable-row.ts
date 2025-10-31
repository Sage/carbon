import { useEffect, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { getDraggable, getDropTarget, isDraggable } from "./data";
import { useDragDropContext } from "./drag-drop-provider";
import invariant from "invariant";

interface UseSortableRowArgs {
  /** Unique identifier for the referenced element. */
  id: string;
  /** Index of the referenced element in a list. */
  index: number;
  /** Ref of the element to be made draggable and a drop target. */
  ref: React.RefObject<HTMLElement> | null;
}

interface UseSortableRowReturn {
  /** Whether the referenced element is currently being dragged. */
  isDragging: boolean;
}

function useSortableRow({
  id,
  index,
  ref,
}: UseSortableRowArgs): UseSortableRowReturn {
  const context = useDragDropContext();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    invariant(
      context,
      "Expected context to be defined. Please ensure your component is within a DragDropProvider.",
    );

    const { contextId } = context;

    return combine(
      draggable({
        element,
        getInitialData: () =>
          getDraggable({
            id,
            initialIndex: index,
            contextId,
          }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element,
        getData: () => getDropTarget({ id, contextId }),
        canDrop: ({ source }) =>
          isDraggable(source.data) && source.data.contextId === contextId,
      }),
    );
  }, [context, id, index, ref]);

  return {
    isDragging,
  };
}

export default useSortableRow;
