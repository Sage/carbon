import React, { forwardRef } from "react";
import { MarginProps } from "styled-system";

import { filterStyledSystemMarginProps } from "../../style/utils";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import { StyledDraggableContainer } from "./draggable-item/draggable-item.style";
import { UseDraggableHandle } from "../../hooks/useDraggable/useDraggable";
import useDraggable from "../../hooks/useDraggable/useDraggable";

type FlexDirection = "row-reverse" | "row";

export interface DraggableContainerProps
  extends MarginProps,
    Omit<TagProps, "data-component"> {
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
  flexDirection?: FlexDirection;
  id?: string | number;
}

const DraggableContainer = forwardRef<UseDraggableHandle, DraggableContainerProps>(({
  "data-element": dataElement,
  "data-role": dataRole = "draggable-container",
  children,
  getOrder,
  flexDirection = "row",
  id,
  ...rest
}: DraggableContainerProps, ref): JSX.Element => {
  const marginProps = filterStyledSystemMarginProps(rest);

  const [draggableHookContainer, dragState ] = useDraggable({draggableItems: children, id, ref});

  return (
    <StyledDraggableContainer
      data-component="draggable-container"
      data-element={dataElement}
      data-role={dataRole}
      flexDirection={flexDirection}
      isDragging={dragState.type === "is-dragging-over"}
      childId={dragState.id}
      {...marginProps}
    >
          {draggableHookContainer}
    </StyledDraggableContainer>
  );
});

DraggableContainer.displayName = "DraggableContainer";

export default DraggableContainer;