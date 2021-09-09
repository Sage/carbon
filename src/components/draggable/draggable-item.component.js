import React from "react";
import { useDrop, useDrag } from "react-dnd";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import { CSSTransition } from "react-transition-group";
import { filterStyledSystemPaddingProps } from "../../style/utils";
import { StyledDraggableItem } from "./draggable-item.style";

const paddingPropTypes = filterStyledSystemPaddingProps(styledSystemPropTypes);

const DraggableItem = ({
  id,
  findItem,
  moveItem,
  children,
  py = 1,
  as,
  ...rest
}) => {
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

  const paddingProps = filterStyledSystemPaddingProps(rest);

  return (
    <CSSTransition in timeout={{ appear: 0 }} classNames="draggable">
      <StyledDraggableItem
        data-element="draggable"
        isDragging={isDragging}
        ref={(node) => drag(drop(node))}
        py={py}
        as={as}
        {...paddingProps}
      >
        {children}
      </StyledDraggableItem>
    </CSSTransition>
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
  /** Overrides the default rendered HTML tag of the DraggableItem component */
  as: PropTypes.string,
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
