import React, { useContext } from "react";
import {
  useDrop,
  useDrag,
  ConnectDropTarget,
  ConnectDragSource,
} from "react-dnd";
import { DraggableBodyContext } from "../../../flat-table/flat-table-body-draggable/flat-table-body-draggable.component";

interface DraggableContextProps {
  isDragging?: boolean;
  drag?: ConnectDragSource;
  drop?: ConnectDropTarget;
}

export const DraggableContext = React.createContext<DraggableContextProps>({});

export interface FlatTableRowDraggableProps {
  /** Array of FlatTableRow. */
  children: (
    isDragging: boolean,
    drag: ConnectDragSource,
    drop: ConnectDropTarget
  ) => React.ReactNode;
  /** ID for use in drag and drop functionality */
  id?: number | string;
  /** function to find an item in the list of draggable items */
  findItem?: (id?: number | string) => Record<string, unknown>;
  /** function to reposition an item in the list of draggable items */
  moveItem?: (id?: number | string, index?: number) => void;
  /** item is draggable */
  draggable?: boolean;
  /** ref for row element */
  rowRef?: React.ForwardedRef<HTMLTableRowElement | null>;
}

interface DragItem {
  index: number;
  id: string;
}

export const FlatTableRowDraggable = ({
  children,
  id,
}: // findItem,
// moveItem,
// rowRef,
FlatTableRowDraggableProps) => {
  const { findItem, moveItem } = useContext(DraggableBodyContext);
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

      console.log(droppedId, id, originalIndex);

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

  return <>{children(isDragging, drag, drop)}</>;

  // React.cloneElement(children as React.ReactElement, {
  //   key: originalIndex,
  //   id,
  //   isDragging,
  //   ref: (node: HTMLTableRowElement) => {
  //     drag(drop(node));
  //     /* istanbul ignore else */
  //     if (rowRef) {
  //       if (typeof rowRef === "function") {
  //         rowRef(node);
  //       } else {
  //         rowRef.current = node;
  //       }
  //     }
  //   },
  // });
};

FlatTableRowDraggable.displayName = "FlatTableRowDraggable";

export default FlatTableRowDraggable;
