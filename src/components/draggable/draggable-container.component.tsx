import React, { useMemo, forwardRef } from "react";
import { MarginProps } from "styled-system";
import invariant from "invariant";
import { filterStyledSystemMarginProps } from "../../style/utils";
import DraggableItem from "./draggable-item/draggable-item.component";
import { StyledDraggableContainer } from "./draggable-item/draggable-item.style";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import useDraggable, { UseDraggableHandle } from "../../hooks/useDraggable";

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
    const items = Array.isArray(children) ? children : [children];

    const { draggableElement } = useDraggable({
      draggableItems: items,
      containerNode: StyledDraggableContainer,
      getOrder,
      ref,
      containerProps: {
        "data-element": dataElement,
        "data-role": dataRole,
        flexDirection,
        ...marginProps,
      },
    });

    return draggableElement;
  },
);

DraggableContainer.displayName = "DraggableContainer";
export default DraggableContainer;
