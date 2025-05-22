import React, {
  useContext,
  useRef,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
  forwardRef,
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

import {
  getDraggableItemData,
  isDraggableItemData,
  DraggableItemData,
  DragState,
} from "./draggable-utils";

export interface DraggableItemProps {
  /** Child elements to be rendered within the draggable item */
  children?: React.ReactNode;
  /** Unique identifier for the item, used for tracking and reordering */
  id: string | number;
  /** HTML element or React component to use as the container for the item */
  itemsNode?: keyof JSX.IntrinsicElements | React.ElementType;
  /** An object in which any additional props can be passed to the item element */
  itemProps?: Record<string, unknown>;
}

const DraggableItem = forwardRef(
  (
    { children, id, itemsNode = "div", itemProps = {} }: DraggableItemProps,
    ref,
  ): JSX.Element => {
    const { columnId } = useContext(DraggableContainerContext);
    const index = useContext(DraggableItemContext)?.index;
    const [firstChildId, setFirstChildId] = useState<string | null>(null);

    // Generic HTMLElement ref used due to the `itemsNode` prop allowing any HTML element or React component to be used
    const itemRef = useRef<HTMLElement | null>(null);

    const setRef = (element: HTMLElement | null) => {
      itemRef.current = element;

      if (typeof ref === "function") {
        ref(element);
      } else if (ref && "current" in ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = element;
      }
    };

    /**
     * After mount, check if the first child has an ID that we can use
     * This supports scenarios where the child already has its own ID
     */
    useLayoutEffect(() => {
      // This runs after the component mounts and the children are rendered
      if (itemRef.current && itemRef.current.children.length > 0) {
        const firstChild = itemRef.current.children[0];
        setFirstChildId(firstChild.getAttribute("id"));
      }
    }, []);

    // Determine the effective ID to use:
    // 1. If first child has a non-generated ID, use that (enables finding by ID)
    // 2. Otherwise, use the provided uniqueId
    const uniqueId =
      firstChildId && isGuid(firstChildId) ? id : firstChildId || id;

    // Track the current drag state for visual feedback
    const [dragState, setDragState] = useState<DragState>({
      type: "idle",
      id: 0,
    });

    /**
     * Create the data object that represents this item during drag operations
     * This data will be used to identify the item and determine drop targets
     */
    const draggableItemData: DraggableItemData = useMemo(
      () => ({
        id: uniqueId,
        index,
        content: children,
        parentContainerId: columnId || "draggable-container",
      }),
      [uniqueId, index, children, columnId],
    );

    /**
     * Set up drag and drop event handling for this item
     * This configures both:
     * 1. Draggable behavior - allows this item to be dragged
     * 2. Drop target behavior - allows other items to be dropped on this item
     */
    useEffect(() => {
      const element = itemRef?.current as HTMLElement;

      const idle: DragState = { type: "idle" };

      const cleanup = combine(
        draggable({
          element,
          getInitialData() {
            return getDraggableItemData(draggableItemData);
          },
          onDragStart() {
            setDragState({ type: "is-dragging", id: uniqueId });
          },
          onDrop() {
            setDragState(idle);
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
          onDragEnter({ self }) {
            const closestEdge = extractClosestEdge(self.data);
            setDragState({
              type: "is-being-dragged-over",
              closestEdge,
              id: uniqueId,
            });
          },
          onDrag({ self }) {
            const closestEdge = extractClosestEdge(self.data);
            setDragState({
              type: "is-being-dragged-over",
              closestEdge,
              id: uniqueId,
            });
          },
          onDragLeave() {
            setDragState(idle);
          },
          onDrop() {
            setDragState(idle);
          },
        }),
      );

      return () => cleanup();
    }, [uniqueId, draggableItemData, setDragState]);

    return React.createElement(
      itemsNode,
      {
        ...itemProps,
        ref: setRef,
        "data-parent-container-id": columnId,
        "data-item-id": uniqueId,
        "data-drag-state": dragState.type,
        ...(dragState.type === "is-being-dragged-over" && {
          "data-closest-edge": dragState.closestEdge,
        }),
      },
      children,
    );
  },
);

export default DraggableItem;
