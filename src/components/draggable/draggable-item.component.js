import React from "react";
import { useDrop, useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { StyledDraggableItem } from "./draggable-item.style";

const DraggableItem = ({ id, findItem, moveItem, children }) => {
  const originalIndex = findItem(id).index;
  const [{ isDragging }, drag] = useDrag({
    item: { type: "draggableItem", id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex: oIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveItem(droppedId, oIndex);
      }
    },
  });

  const [, drop] = useDrop({
    accept: "draggableItem",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findItem(id);
        moveItem(draggedId, overIndex);
      }
    },
  });

  return (
    <StyledDraggableItem
      data-element="draggable"
      isDragging={isDragging}
      ref={(node) => drag(drop(node))}
    >
      {children}
    </StyledDraggableItem>
  );
};

DraggableItem.propTypes = {
  /**
   * The id of the `DraggableItem`.
   *
   * Use this prop to make `Draggable` works
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /** The content of the component. */
  children: PropTypes.node.isRequired,
  findItem: PropTypes.func,
  moveItem: PropTypes.func,
};

DraggableItem.displayName = "DraggableItem";

export default DraggableItem;
