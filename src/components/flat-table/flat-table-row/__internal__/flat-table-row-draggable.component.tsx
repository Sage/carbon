import React from "react";
import { useDrop, useDrag } from "react-dnd";

export interface FlatTableRowDraggableProps {
  /** Array of FlatTableRow. */
  children: React.ReactNode;
  /** ID for use in drag and drop functionality */
  id?: number | string;
  /** function to find an item in the list of draggable items */
  findItem?: (id?: number | string) => Record<string, unknown>;
  /** function to reposition an item in the list of draggable items */
  moveItem?: (id?: number | string, index?: number) => void;
  /** item is draggable */
  draggable?: boolean;
}

interface DragItem {
  index: number;
  id: string;
}

export const FlatTableRowDraggable = ({
  children,
  id,
  findItem,
  moveItem,
}: FlatTableRowDraggableProps) => {
  const originalIndex = Number(findItem?.(id).index);

  const [{ isDragging }, drag] = useDrag({
    type: "flatTableRow",
    item: { id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex: oIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveItem?.(droppedId, Number(oIndex));
      }
    },
  });

  const [, drop] = useDrop({
    accept: "flatTableRow",
    canDrop: () => false,
    hover(item: DragItem) {
      if (item?.id !== id && findItem) {
        const { index: overIndex } = findItem(id);
        moveItem?.(item?.id, Number(overIndex));
      }
    },
  });

  return React.cloneElement(children as React.ReactElement, {
    key: originalIndex,
    id,
    isDragging,
    ref: (node: HTMLElement) => drag(drop(node)),
  });
};

FlatTableRowDraggable.displayName = "FlatTableRowDraggable";

export default FlatTableRowDraggable;
