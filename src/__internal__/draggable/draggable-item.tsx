import React, {
  useContext,
  useRef,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
  forwardRef,
  RefObject,
} from "react";

import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

import { isGuid } from "../../__internal__/utils/helpers/guid";

import DraggableItemContext from "./draggable-item-context";
import DraggableContainerContext from "./draggable-container-context";
import DraggableProviderContext from "../../hooks/useDraggable/draggable-provider-context";

import {
  getDraggableItemData,
  isDraggableItemData,
  DraggableItemData,
  DragState,
} from "./draggable-utils";
import StyledFlatTableRow from "../../components/flat-table/flat-table-row/flat-table-row.style";

export interface DraggableItemProps {
  children?: React.ReactNode;
  uniqueId: string | number;
  draggableItemStylingOptOut?: boolean;
  itemsNode?: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
}

const DraggableItem = forwardRef(
  (
    {
      children,
      uniqueId,
      draggableItemStylingOptOut = false,
      itemsNode = "div",
      ...rest
    }: DraggableItemProps,
    ref,
  ): JSX.Element => {
    const columnId = useContext(DraggableContainerContext)?.columnId;
    const index = useContext(DraggableItemContext)?.index;
    const { setClosestEdge } = useContext(DraggableProviderContext);

    const [firstChildId, setFirstChildId] = useState<string | null>(null);
    const internalRef = useRef<HTMLDivElement | null>(null);
    const itemRef = (ref as RefObject<HTMLDivElement>) || internalRef;

    useLayoutEffect(() => {
      // This runs after the component mounts and the children are rendered
      if (itemRef.current && itemRef.current.children.length > 0) {
        const firstChild = itemRef.current.children[0];
        const id = firstChild.getAttribute("id");
        setFirstChildId(id);
      }
    }, [itemRef]);

    // if the first child has an id which is intentionally passed (not a guid), use that otherwise use a provided uniqueId
    const id =
      firstChildId && isGuid(firstChildId)
        ? uniqueId
        : firstChildId || uniqueId;

    const [dragState, setDragState] = useState<DragState>({
      type: "idle",
      id: 0,
    });

    const draggableItemData: DraggableItemData = useMemo(
      () => ({
        id,
        index,
        content: children,
        parentContainerId: columnId || "draggable-container",
      }),
      [id, index, children, columnId],
    );

    useEffect(() => {
      const idle: DragState = { type: "idle" };
      const element = itemRef.current;
      if (!element) {
        return;
      }
      const cleanup = combine(
        draggable({
          element,
          getInitialData() {
            return getDraggableItemData(draggableItemData);
          },
          onDragStart() {
            if (setDragState) {
              setDragState({ type: "is-dragging", id });
            }
          },
          onDrop() {
            if (setDragState) {
              setDragState(idle);
            }
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
          onDragEnter({ self, source }) {
            const closestEdge = extractClosestEdge(self.data);
            if (setDragState) {
              setDragState({ type: "is-dragging-over", closestEdge, id });
            }
          },
          onDrag({ self }) {
            const closestEdge = extractClosestEdge(self.data);
            if (setDragState) {
              setDragState((current) => {
                if (
                  current.type === "is-dragging-over" &&
                  current.closestEdge === closestEdge
                ) {
                  return current;
                }
                return { type: "is-dragging-over", closestEdge, id };
              });
              
            }
          },
          onDragLeave() {
            if (setDragState) {
              setDragState(idle);
            }
          },
          onDrop({ self }) {
            const closestEdge = extractClosestEdge(self.data);
            if (setClosestEdge) {
              setClosestEdge(closestEdge);
            }
            if (setDragState) {
              setDragState(idle);
            }
          },
        }),
      );
      return () => {
        cleanup();
      };
    }, [id, draggableItemData, setDragState, setClosestEdge, itemRef]);

    return React.createElement(
      itemsNode,
      {
        ref: itemRef,
        "data-parent-container-id": columnId,
        "data-item-id": id,
        "data-drag-state": dragState.type,
        ...(itemsNode === StyledFlatTableRow && {
          isDragging:
            dragState.type === "is-dragging-over" ||
            dragState.type === "is-dragging",
        }),
        ...rest,
        style: {
          ...(!draggableItemStylingOptOut && { cursor: "grab" }),
          ...(!draggableItemStylingOptOut && {
            opacity: (dragState.type === "is-dragging-over") && dragState.id === id ? 0 : 1,
          }),
          position: "relative",
        }
      },
      children
    );
  },
);

export default DraggableItem;
