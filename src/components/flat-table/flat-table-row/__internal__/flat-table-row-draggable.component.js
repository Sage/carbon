import React from "react";
import { useDrop, useDrag } from "react-dnd";
import PropTypes from "prop-types";

const FlatTableRowDraggable = ({ children, id, findItem, moveItem }) => {
  const originalIndex = findItem(id).index;

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
        moveItem(droppedId, oIndex);
      }
    },
  });

  const [, drop] = useDrop({
    accept: "flatTableRow",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findItem(id);
        moveItem(draggedId, overIndex);
      }
    },
  });

  return React.cloneElement(children, {
    key: originalIndex,
    id,
    isDragging,
    ref: (node) => drag(drop(node)),
  });
};

FlatTableRowDraggable.propTypes = {
  /** Array of FlatTableHeader or FlatTableCell. FlatTableRowHeader could also be passed. */
  children: PropTypes.node.isRequired,
  /** ID for use in drag and drop functionality */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** function to find an item in the list of draggable items */
  findItem: PropTypes.func.isRequired,
  /** function to reposition an item in the list of draggable items */
  moveItem: PropTypes.func.isRequired,
  /** item is draggable */
  draggable: PropTypes.bool,
};

export default FlatTableRowDraggable;
