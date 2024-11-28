import React, { useState, useRef, useEffect, useContext } from "react";
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
  DraggableItemData
} from "../__internal__/draggable-utils";
import guid from "../../../__internal__/utils/helpers/guid";
import DraggableContext, { DragState } from "./draggable-context";

export interface DraggableItemProps {
  children?: React.ReactNode;
  id?: string | number;
}


const DraggableItem = ({
  id,
  children
}: DraggableItemProps): JSX.Element => {
  const idle: DragState = { type: "idle" };
  const ref = useRef<HTMLElement | null>(null);

  const {
    setDragState,
  } = useContext(DraggableContext);

  const internalId =  useRef(guid()).current;

  const draggableItemData: DraggableItemData = {
    id: id || internalId,
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
            setDragState && setDragState({ type: "is-dragging" });
        },
        onDrop() {
            setDragState && setDragState(idle);
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
          setDragState && setDragState({ type: "is-dragging-over", closestEdge });
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);

          setDragState && setDragState((current) => {
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
            setDragState && setDragState(idle);
        },
        onDrop() {
            setDragState && setDragState(idle);
        },
      }),
    );
  }, [internalId]);

  return (
      <div
      >
        {children}
      </div>
  );
};

DraggableItem.displayName = "DraggableItem";

export default DraggableItem;
