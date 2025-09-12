import React, { useEffect, useState, useRef } from "react";
import { MarginProps } from "styled-system";

import invariant from "invariant";
import { filterStyledSystemMarginProps } from "../../style/utils";
import DraggableItem, {
  DraggableItemProps,
} from "./draggable-item/draggable-item.component";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import { StyledDraggableContainer } from "./draggable-item/draggable-item.style";
import { isDragData, isDropTargetData } from "./__internal__/data";
import arrayMove from "../../__internal__/utils/helpers/array-move";

export interface DraggableContainerProps extends MarginProps, TagProps {
  /** Callback fired when order is changed */
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

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    invariant(element, "Expected DraggableContainer element to exist.");

    return dropTargetForElements({
      element,
      canDrop: ({ source }) => isDragData(source.data),
      onDrop: ({ source }) => {
        if (!isDragData(source.data)) {
          return;
        }

        const reordered = arrayMove({
          array: draggableItems,
          startIndex: draggableItems.findIndex(
            (item) => String(item.props.id) === source.data.id,
          ),
          endIndex: draggableItems.findIndex(
            (item) => String(item.props.id) === source.data.id,
          ),
        });
        setDraggableItems(reordered);

        getOrder?.(
          reordered.map((item) => item.props.id),
          source.data.id,
        );
      },
      onDrag: ({ source, location }) => {
        if (!location.current.dropTargets.length) {
          return;
        }

        const innerMost = location.current.dropTargets[0];

        // Check we're dragging over an item
        if (!isDragData(source.data) || !isDropTargetData(innerMost.data)) {
          return;
        }

        setDraggableItems(
          arrayMove({
            array: draggableItems,
            startIndex: draggableItems.findIndex(
              (item) => String(item.props.id) === source.data.id,
            ),
            endIndex: draggableItems.findIndex(
              (item) => String(item.props.id) === innerMost.data.id,
            ),
          }),
        );
      },
    });
  }, [draggableItems, getOrder]);

  const marginProps = filterStyledSystemMarginProps(rest);

  return (
    <StyledDraggableContainer
      data-component="draggable-container"
      data-element={dataElement}
      data-role={dataRole}
      ref={ref}
      {...marginProps}
    >
      {draggableItems.map((item) => {
        return (
          React.isValidElement(item) &&
          React.cloneElement(
            item,
            {
              id: item.props.id,
              flexDirection,
            },
            [item.props.children],
          )
        );
      })}
    </StyledDraggableContainer>
  );
};

DraggableContainer.displayName = "DraggableContainer";

export default DraggableContainer;
