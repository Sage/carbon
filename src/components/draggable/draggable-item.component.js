import React from "react";
import { useDrop, useDrag } from "react-dnd";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import { filterStyledSystemPaddingProps } from "../../style/utils";
import { StyledDraggableItem } from "./draggable-item.style";

const paddingPropTypes = filterStyledSystemPaddingProps(styledSystemPropTypes);

const DraggableItem = ({
  id,
  findItem,
  moveItem,
  children,
  py = 1,
  ...rest
}) => {
  const originalIndex = findItem(id).index;
  const [{ isDragging }, drag] = useDrag({
    type: "draggableItem",
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
    accept: "draggableItem",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findItem(id);
        moveItem(draggedId, overIndex);
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
    </StyledDraggableItem>
  );
};

DraggableItem.propTypes = {
  ...paddingPropTypes,
  /**
   * The id of the `DraggableItem`.
   *
   * Use this prop to make `Draggable` works
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /** The content of the component. */
  children: PropTypes.node.isRequired,
  /**
   * @private
   * @ignore
   */
  findItem: PropTypes.func,
  /**
   * @private
   * @ignore
   */
  moveItem: PropTypes.func,
};

DraggableItem.displayName = "DraggableItem";

export default DraggableItem;
