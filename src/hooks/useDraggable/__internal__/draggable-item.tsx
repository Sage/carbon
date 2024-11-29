import React, { useRef, useEffect } from "react";
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

import { DragState } from "./draggable-utils"
export interface DraggableItemProps {
  children?: React.ReactNode;
  id: string | number;
  setDragState?: React.Dispatch<React.SetStateAction<DragState>>;
}
const DraggableItem = ({
  id,
  children,
  setDragState,
}: DraggableItemProps): JSX.Element => {
  const idle: DragState = { type: "idle" };
  const ref = useRef<HTMLElement | null>(null);
  const originalIdRef = useRef<string | number>(id);

  const draggableItemData: DraggableItemData = {
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
            setDragState && setDragState({ type: "is-dragging", id: originalIdRef.current });
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
          setDragState && setDragState({ type: "is-dragging-over", closestEdge, id: originalIdRef.current });
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
            return { type: "is-dragging-over", closestEdge, id: originalIdRef.current };
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
  }, [id]);

  return (<div ref={ref} id={`${id}`}>{children}</div>);
};

export default DraggableItem;
