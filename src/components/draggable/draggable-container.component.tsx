import React, { useEffect, useState, useRef } from "react";
import { MarginProps } from "styled-system";

import invariant from "invariant";
import { filterStyledSystemMarginProps } from "../../style/utils";
import DraggableItem, {
  DraggableItemProps,
} from "./draggable-item/draggable-item.component";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import { StyledDraggableContainer } from "./draggable-item/draggable-item.style";
import arrayMove from "../../__internal__/utils/helpers/array-move";
import {
  DragDropProvider,
  DragDropProviderProps,
} from "../../__internal__/sortable";

export interface DraggableContainerProps extends MarginProps, TagProps {
  /** Callback fired when an item is successfully dropped. */
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void;
  /**
   * The content of the component
   *
   * `<DraggableItem />` is required to make `Draggable` works
   */
  children?: React.ReactNode;
  /**
   * Defines the direction in which the draggable items contents are placed.
   * Can be either "row" or "row-reverse".
   */
  flexDirection?: "row" | "row-reverse";
}

// Predicate to check whether a node is a DraggableItem component
function isDraggableItem(
  node: unknown,
): node is React.ReactElement<DraggableItemProps> {
  return (
    React.isValidElement(node) &&
    (node.type as React.FunctionComponent).displayName === "DraggableItem"
  );
}

const DraggableContainer = ({
  "data-element": dataElement,
  "data-role": dataRole = "draggable-container",
  children,
  getOrder,
  flexDirection = "row",
  ...rest
}: DraggableContainerProps): JSX.Element => {
  const [draggableItems, setDraggableItems] = useState(
    React.Children.toArray(children),
  );
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setDraggableItems(React.Children.toArray(children));
    } else {
      isFirstRender.current = false;
    }
  }, [children]);

  const hasValidChildren = draggableItems.every((child) =>
    isDraggableItem(child),
  );

  // `<DraggableItem />` is required to make `Draggable` work
  invariant(
    hasValidChildren,
    `\`${DraggableContainer.displayName}\` only accepts children of type \`${DraggableItem.displayName}\`.`,
  );

  const marginProps = filterStyledSystemMarginProps(rest);

  const handleDrop: DragDropProviderProps["onDrop"] = ({ dragged, target }) => {
    if (target) {
      const childIds = draggableItems.map((child) => child.props.id);
      getOrder?.(childIds, dragged.id);
      return;
    }

    // Move dragged item back to original position
    setDraggableItems(
      arrayMove({
        array: draggableItems,
        startIndex: draggableItems.findIndex(
          (child) => String(child.props.id) === dragged.id,
        ),
        endIndex: dragged.initialIndex,
      }),
    );
  };

  const handleDropTargetChange: DragDropProviderProps["onDropTargetChange"] = ({
    dragged,
    target,
  }) => {
    if (!target) {
      return;
    }

    // Move dragged item to new position
    setDraggableItems(
      arrayMove({
        array: draggableItems,
        startIndex: draggableItems.findIndex(
          (child) => String(child.props.id) === dragged.id,
        ),
        endIndex: draggableItems.findIndex(
          (child) => String(child.props.id) === target.id,
        ),
      }),
    );
  };

  return (
    <StyledDraggableContainer
      data-component="draggable-container"
      data-element={dataElement}
      data-role={dataRole}
      {...marginProps}
    >
      <DragDropProvider
        onDrop={handleDrop}
        onDropTargetChange={handleDropTargetChange}
      >
        {draggableItems.map((item, index) => {
          return React.cloneElement(
            item,
            {
              id: item.props.id,
              index,
              flexDirection,
            },
            [item.props.children],
          );
        })}
      </DragDropProvider>
    </StyledDraggableContainer>
  );
};

DraggableContainer.displayName = "DraggableContainer";

export default DraggableContainer;
