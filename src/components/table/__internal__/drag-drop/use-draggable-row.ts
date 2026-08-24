import { useEffect, useRef, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { getDraggable, getDropTarget, isDraggable } from "./data";
import { useDragDropContext } from "./drag-drop-provider";
import invariant from "invariant";

interface UseDraggableRowArgs {
  /** Unique identifier for the referenced element. */
  id: string;
  /** Index of the referenced element in a list. */
  index: number;
  /** Ref of the element to be made draggable and a drop target. */
  ref: React.RefObject<HTMLElement> | null;
  /** Ref of the element that should be used as the drag handle. */
  dragHandleRef: React.RefObject<HTMLElement> | null;
}

interface UseDraggableRowReturn {
  /** Whether the referenced element is currently being dragged. */
  isDragging: boolean;
  /** The edge on which to render the drop indicator. */
  dropIndicatorPosition: "top" | "bottom" | null;
}

function useDraggableRow({
  id,
  index,
  ref,
  dragHandleRef,
}: UseDraggableRowArgs): UseDraggableRowReturn {
  const context = useDragDropContext();
  const [isDragging, setIsDragging] = useState(false);
  const [dropIndicatorPosition, setDropIndicatorPosition] =
    useState<UseDraggableRowReturn["dropIndicatorPosition"]>(null);
  const latestIndex = useRef(index);
  latestIndex.current = index;
  const contextId = context?.contextId;
  const setDraggingId = context?.setDraggingId;

  useEffect(() => {
    const element = ref?.current;
    const dragHandle = dragHandleRef?.current;

    if (!element || !dragHandle) return;

    invariant(
      contextId && setDraggingId,
      "Expected context to be defined. Please ensure your component is within a DragDropProvider.",
    );

    return combine(
      draggable({
        element,
        dragHandle,
        getInitialData: () =>
          getDraggable({
            id,
            initialIndex: latestIndex.current,
            contextId,
          }),
        onDragStart: () => {
          setIsDragging(true);
          setDraggingId(id);
        },
        onDrop: () => {
          setIsDragging(false);
          setDraggingId(null);
        },
      }),
      dropTargetForElements({
        element,
        getData: () => getDropTarget({ id, contextId }),
        canDrop: ({ source }) =>
          isDraggable(source.data) &&
          source.data.contextId === contextId &&
          source.data.id !== id,
        onDragEnter: ({ source }) => {
          /* istanbul ignore if */
          if (!isDraggable(source.data) || source.data.id === id) {
            setDropIndicatorPosition(null);
            return;
          }

          setDropIndicatorPosition(
            source.data.initialIndex > latestIndex.current ? "top" : "bottom",
          );
        },
        onDragLeave: () => {
          setDropIndicatorPosition(null);
        },
        onDrop: () => {
          setDropIndicatorPosition(null);
        },
      }),
    );
  }, [contextId, id, ref, dragHandleRef, setDraggingId]);

  return {
    isDragging,
    dropIndicatorPosition,
  };
}

export default useDraggableRow;
