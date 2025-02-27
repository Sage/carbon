import React, { forwardRef, useMemo, useEffect } from "react";
import { MarginProps } from "styled-system";

import invariant from "invariant";
import { filterStyledSystemMarginProps } from "../../style/utils";
import DraggableItem from "./draggable-item/draggable-item.component";

import { TagProps } from "../../__internal__/utils/helpers/tags";
import { StyledDraggableContainer } from "./draggable-item/draggable-item.style";
import useDraggable, {
  UseDraggableHandle,
} from "../../hooks/useDraggable/useDraggable";

type FlexDirection = "row-reverse" | "row";

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
  flexDirection?: FlexDirection;
}

const DraggableContainer = forwardRef<
  UseDraggableHandle,
  DraggableContainerProps
>(
  (
    {
      "data-element": dataElement,
      "data-role": dataRole = "draggable-container",
      children,
      getOrder,
      flexDirection = "row",
      ...rest
    }: DraggableContainerProps,
    ref,
  ): JSX.Element => {
    const hasProperChildren = useMemo(() => {
      const invalidChild = React.Children.toArray(children).find(
        (child) =>
          !React.isValidElement(child) ||
          (child.type as React.FunctionComponent).displayName !==
            "DraggableItem",
      );
      return !invalidChild;
    }, [children]);

    // `<DraggableItem />` is required to make `Draggable` work
    invariant(
      hasProperChildren,
      `\`${DraggableContainer.displayName}\` only accepts children of type \`${DraggableItem.displayName}\`.`,
    );

    const marginProps = filterStyledSystemMarginProps(rest);

    const [draggableHookContainer] = useDraggable({
      draggableItems: children,
      ref,
      getOrder,
    });

    return (
      <StyledDraggableContainer
        data-component="draggable-container"
        data-element={dataElement}
        data-role={dataRole}
        flexDirection={flexDirection}
        {...marginProps}
      >
        {draggableHookContainer}
      </StyledDraggableContainer>
    );
  },
);

DraggableContainer.displayName = "DraggableContainer";

export default DraggableContainer;
