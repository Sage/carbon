import React, { useState, useRef, useEffect } from "react";
import { PaddingProps } from "styled-system";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

import {
  getDraggableItemData,
  isDraggableItemData,
} from "../__internal__/draggable-utils";

import { filterStyledSystemPaddingProps } from "../../../style/utils";
import { StyledDraggableItem, StyledIcon } from "./draggable-item.style";

export interface DraggableItemProps extends PaddingProps {
  /**
   * The id of the `DraggableItem`.
   *
   * Use this prop to make `Draggable` work
   */
  id: number | string;
  /** The content of the component. */
  children: React.ReactNode;
}

type Edge = "top" | "right" | "bottom" | "left";

export type TaskState =
  | { type: "idle" }
  | { type: "preview"; container: HTMLElement }
  | { type: "is-dragging" }
  | { type: "is-dragging-over"; closestEdge: Edge | null };

const DraggableItem = ({
  id,
  children,
  py = 1,
  ...rest
}: DraggableItemProps): JSX.Element => {
  const idle: TaskState = { type: "idle" };
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<TaskState>(idle);

  const paddingProps = filterStyledSystemPaddingProps(rest);

  const draggableItemData = {
    id,
    content: children,
  };

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    return combine(
      draggable({
        element,
        getInitialData() {
          return getDraggableItemData(draggableItemData);
        },
        onDragStart() {
          setState({ type: "is-dragging" });
        },
        onDrop() {
          setState(idle);
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          if (source.element === element) {
            return false;
          }
          return isDraggableItemData(source.data);
        },
        getData({ input }) {
          const data = getDraggableItemData(draggableItemData);
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          });
        },
        getIsSticky() {
          return true;
        },
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setState({ type: "is-dragging-over", closestEdge });
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);

          setState((current) => {
            if (
              current.type === "is-dragging-over" &&
              current.closestEdge === closestEdge
            ) {
              return current;
            }
            return { type: "is-dragging-over", closestEdge };
          });
        },
        onDragLeave() {
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      }),
    );
  }, [id]);

  return (
      <StyledDraggableItem
        data-element="draggable"
        data-role="draggable-item"
        data-id={id}
        ref={ref}
        dragState={state}
        py={py}
        {...paddingProps}
      >
        {children}
        <StyledIcon type="drag" />
      </StyledDraggableItem>
  );
};

DraggableItem.displayName = "DraggableItem";

export default DraggableItem;
