import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { PaddingProps } from "styled-system";

import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { StyledDraggableItem, StyledIcon } from "./draggable-item.style";

export interface DraggableItemProps extends PaddingProps {
  /**
   * The id of the `DraggableItem`.
   *
   * Use this prop to make `Draggable` work
   */
  id: number | string;
  /** The content of the component. */
  children: React.ReactNode;
  /**
   * @private
   * @ignore
   */
  findItem?: (
    id: string | number
  ) => { DraggableItemProps: React.ReactElement; index: number };
  /**
   * @private
   * @ignore
   */
  moveItem?: (
    droppedId: string | number,
    overIndex: number | undefined
  ) => void;
}

const DraggableItem = ({
  id,
  findItem,
  moveItem,
  children,
  py = 1,
  ...rest
}: DraggableItemProps): JSX.Element => {
  let originalIndex;
  // istanbul ignore else
  if (findItem) {
    originalIndex = findItem(id)?.index;
  }
  const [{ isDragging }, drag] = useDrag({
    type: "draggableItem",
    item: { id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex: oIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop && moveItem) {
        moveItem(droppedId, oIndex);
      }
    },
  });

  interface DragItem {
    index: number;
    id: string;
  }

  const [, drop] = useDrop({
    accept: "draggableItem",
    canDrop: () => false,
    hover(item: DragItem) {
      if (item?.id !== id && findItem) {
        const { index: overIndex } = findItem(id);
        // istanbul ignore else
        if (moveItem) {
          moveItem(item?.id, overIndex);
        }
      }
    },
  });

  const paddingProps = filterStyledSystemPaddingProps(rest);

  return (
    <StyledDraggableItem
      data-element="draggable"
      isDragging={isDragging}
      ref={(node) => drag(drop(node))}
      py={py}
      {...paddingProps}
    >
      {children}
      <StyledIcon type="drag" />
    </StyledDraggableItem>
  );
};

DraggableItem.displayName = "DraggableItem";

export default DraggableItem;
