/* istanbul ignore file: Test with Playwright for better reliability */

import React, { useEffect, useRef, useState } from "react";
import { PaddingProps } from "styled-system";
import invariant from "invariant";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  attachClosestEdge,
  extractClosestEdge,
  type Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { StyledDraggableItem, StyledItemContent } from "./draggable-item.style";
import Icon from "../../icon";
import { useDragDropContext } from "../__internal__/drag-drop-provider";
import { getDraggable, getDropTarget, isDraggable } from "../__internal__/data";

export interface DraggableItemProps extends PaddingProps, TagProps {
  /**
   * The id of the `DraggableItem`.
   *
   * Use this prop to make `Draggable` work
   */
  id: number | string;
  /** The content of the component. */
  children: React.ReactNode;
  /** @private @ignore */
  index?: number;
  /**
   * @private
   * @ignore
   */
  flexDirection?: "row" | "row-reverse";
}

type ItemState =
  | { type: "idle" }
  | { type: "is-dragging" }
  | { type: "is-covered"; draggedRect: DOMRect; closestEdge: Edge }
  | { type: "is-dragging-and-left-self" };

const DraggableItem = ({
  id: idProp,
  index: indexProp,
  children,
  py = 1,
  flexDirection,
  "data-element": dataElement,
  "data-role": dataRole = "draggable-item",
  ...rest
}: DraggableItemProps): JSX.Element => {
  const id = String(idProp);
  const index = indexProp as number;

  const ref = useRef<HTMLDivElement>(null);
  const context = useDragDropContext();
  const [state, setState] = useState<ItemState>({
    type: "idle",
  });

  const paddingProps = filterStyledSystemPaddingProps(rest);
  const isDragging = state.type === "is-dragging";
  const isCovered = state.type === "is-covered";
  const isDraggingAndLeftSelf = state.type === "is-dragging-and-left-self";

  useEffect(() => {
    const element = ref.current;

    /* istanbul ignore if */
    if (!element) return;

    invariant(
      context,
      "Expected context to be defined. Please ensure your component is within a DragDropProvider.",
    );

    const { contextId } = context;

    return combine(
      draggable({
        element,
        getInitialData: () =>
          getDraggable({
            id,
            initialIndex: index,
            rect: element.getBoundingClientRect(),
            contextId,
          }),
        onDragStart: () => setState({ type: "is-dragging" }),
        onDrop: () => setState({ type: "idle" }),
      }),
      dropTargetForElements({
        element,
        getData: ({ input }) => {
          const data = getDropTarget({ id, contextId });
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          });
        },
        canDrop: ({ source }) =>
          isDraggable(source.data) && source.data.contextId === contextId,
        onDragEnter: ({ source, self }) => {
          /* istanbul ignore next */
          if (!isDraggable(source.data)) {
            return;
          }

          const closestEdge = extractClosestEdge(self.data);

          /* istanbul ignore next */
          if (!closestEdge) {
            return;
          }

          setState({
            type: "is-covered",
            draggedRect: source.data.rect,
            closestEdge,
          });
        },
        onDrag: ({ source, self }) => {
          /* istanbul ignore next */
          if (!isDraggable(source.data)) {
            return;
          }

          /* istanbul ignore next */
          if (source.data.id === id) {
            return;
          }

          /* istanbul ignore next */
          const closestEdge = extractClosestEdge(self.data);

          /* istanbul ignore next */
          if (!closestEdge) {
            return;
          }

          /* istanbul ignore next */
          if (isCovered && state.closestEdge === closestEdge) {
            // Return early to prevent unnecessary re-render
            return;
          }

          /* istanbul ignore next */
          setState({
            type: "is-covered",
            draggedRect: source.data.rect,
            closestEdge,
          });
        },
        onDragLeave: ({ source }) => {
          /* istanbul ignore next */
          if (!isDraggable(source.data)) {
            return;
          }

          if (source.data.id === id) {
            setState({ type: "is-dragging-and-left-self" });
          } else {
            setState({ type: "idle" });
          }
        },
        onDrop: () => {
          setState({ type: "idle" });
        },
      }),
    );
  }, [context, id, index, isCovered, ref, state]);

  return (
    <StyledDraggableItem
      ref={ref}
      isDragging={isDragging}
      isDraggingAndLeftSelf={isDraggingAndLeftSelf}
      shadowStyling={
        isCovered
          ? { closestEdge: state.closestEdge, height: state.draggedRect.height }
          : undefined
      }
      {...tagComponent("draggable-item", {
        "data-element": dataElement,
        "data-role": dataRole,
      })}
    >
      <StyledItemContent
        py={py}
        data-role="draggable-item-content"
        flexDirection={flexDirection}
        {...paddingProps}
      >
        {children}
        <Icon type="drag" />
      </StyledItemContent>
    </StyledDraggableItem>
  );
};

DraggableItem.displayName = "DraggableItem";

export default DraggableItem;
