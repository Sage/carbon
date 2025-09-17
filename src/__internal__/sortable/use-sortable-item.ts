import { useEffect, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { getDraggable, getDropTarget, isDraggable } from "./data";
import { useDragDropContext } from "./DragDropProvider";
import invariant from "invariant";

interface UseSortableArgs {
  /** Unique identifier for the referenced element. */
  id: string;
  /** Index of the referenced element in a list. */
  index: number;
  /** Ref of the element to be made draggable and a drop target. */
  ref: React.RefObject<HTMLElement> | null;
}

interface UseSortableReturn {
  /** Whether the referenced element is currently being dragged. */
  isDragging: boolean;
}

/**
 * Hook for making an item both draggable and a drop target. Useful for creating re-orderable lists.
 * Must be used within a `DragDropProvider`.
 *
 * @example
 * ```tsx
 * const SortableItem = ({ id, index }) => {
 *  const ref = useRef(null);
 *  useSortableItem({ id, index, ref });
 *
 *  return <li ref={ref} >Item {id}</li>;
 * };
 *
 * const App = () => {
 *  const [items, setItems] = useState(["1", "2", "3"]);
 *
 *  const handleDrop = ({ dragged, target }) => {
 *   if (!target) return;
 *
 *   const sourceIndex = items.indexOf(dragged.id);
 *   const targetIndex = items.indexOf(target.id);
 *
 *   setItems((prevItems) => {
 *     const newItems = [...prevItems];
 *     const [moved] = newItems.splice(sourceIndex, 1);
 *     newItems.splice(targetIndex, 0, moved);
 *     return newItems;
 *   });
 * };
 *   return (
 *     <DragDropProvider onDrop={handleDrop}>
 *       <ul>
 *         {items.map((id, index) => (
 *           <SortableItem key={id} id={id} index={index} />
 *         ))}
 *       </ul>
 *     </DragDropProvider>
 *   );
 * };
 * ```
 */
function useSortableItem({
  id,
  index,
  ref,
}: UseSortableArgs): UseSortableReturn {
  const context = useDragDropContext();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const contextId = context?.contextId;
    invariant(
      contextId,
      "Expected contextId to be defined. Please ensure your component is within a DragDropProvider.",
    );

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
  }, [context?.contextId, id, index, ref]);

  return {
    isDragging,
  };
}

export default useSortableItem;
