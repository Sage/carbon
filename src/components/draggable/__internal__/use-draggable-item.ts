/* istanbul ignore file: Test with Playwright for better reliability */

import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { getDraggable } from "./data";
import { useDragDropContext } from "./drag-drop-provider";
import invariant from "invariant";
import { DropIndicator } from "./drop-indicator";
import { getDragGhost, getDragSurface, DragGhost } from "./drag-surface";

interface UseDraggableItemArgs {
  /** Unique identifier for the referenced element. */
  id: string;
  /** Index of the referenced element in a list. */
  index: number;
  /** Ref of the element to be made draggable and a drop target. */
  ref: React.RefObject<HTMLElement> | null;
  /** The element that should be used as the drag handle. */
  dragHandle: HTMLElement | null;
  /** Explicit visual surface registered by the child component. */
  surface: HTMLElement | null;
}

interface UseDraggableItemReturn {
  /** Whether the referenced element is currently being dragged. */
  isDragging: boolean;
  /** Bounds and corner radii of the placeholder while dragging. */
  dragGhost: DragGhost | null;
  /** The edge on which to render the drop indicator. */
  dropIndicator: DropIndicator | null;
}

function useDraggableItem({
  id,
  index,
  ref,
  dragHandle,
  surface,
}: UseDraggableItemArgs): UseDraggableItemReturn {
  const context = useDragDropContext();
  const [dragGhost, setDragGhost] = useState<DragGhost | null>(null);
  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(
    null,
  );
  const latestIndex = useRef(index);
  latestIndex.current = index;
  const contextId = context?.contextId;
  const groupId = context?.groupId;
  const registerItem = context?.registerItem;

  useEffect(() => {
    const element = ref?.current;

    if (!element || !dragHandle) return;

    invariant(
      contextId,
      "Expected context to be defined. Please ensure your component is within a DragDropProvider.",
    );

    return combine(
      draggable({
        // Use the handle as the native source and the whole item as its preview.
        element: dragHandle,
        getInitialData: ({ input }) => {
          const bounds = (surface ?? element).getBoundingClientRect();
          return getDraggable({
            id,
            initialIndex: latestIndex.current,
            contextId,
            groupId,
            preview: {
              width: bounds.width,
              height: bounds.height,
              offsetX: input.clientX - bounds.left,
              offsetY: input.clientY - bounds.top,
            },
          });
        },
        onGenerateDragPreview: ({ nativeSetDragImage, location }) => {
          /* istanbul ignore if -- unavailable on platforms without native previews */
          if (!nativeSetDragImage) return;

          const preview = surface ?? element;
          const bounds = preview.getBoundingClientRect();
          nativeSetDragImage(
            preview,
            location.current.input.clientX - bounds.left,
            location.current.input.clientY - bounds.top,
          );
        },
        onDragStart: () => {
          setDragGhost(getDragGhost(element, dragHandle, surface));
        },
        onDrop: () => {
          setDragGhost(null);
        },
      }),
      registerItem?.({
        id,
        element,
        dragHandle,
        getSurface: () => surface ?? getDragSurface(element, dragHandle),
        onIndicatorChange: setDropIndicator,
      }) ?? (() => {}),
    );
  }, [contextId, groupId, id, ref, dragHandle, surface, registerItem]);

  return {
    isDragging: dragGhost !== null,
    dragGhost,
    dropIndicator,
  };
}

export default useDraggableItem;
