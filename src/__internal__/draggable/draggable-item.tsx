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

    // Create a ref callback that handles both callback refs and ref objects
    const setRef = (element: HTMLElement | null) => {
      // Always update our internal ref
      itemRef.current = element;

      // Forward to the passed ref
      if (typeof ref === "function") {
        // It's a callback ref
        ref(element);
      } else if (ref && "current" in ref) {
        // It's a ref object
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

      // Default idle state to reset to after drag operations
      const idle: DragState = { type: "idle" };

      // Combine multiple drag and drop behaviors
      const cleanup = combine(
        // Make this element draggable
        draggable({
          element,
          // Provide item data when drag starts
          getInitialData() {
            return getDraggableItemData(draggableItemData);
          },
          // Update state when drag starts
          onDragStart() {
            setDragState({ type: "is-dragging", id: uniqueId });
          },
          // Reset state when drag ends
          onDrop() {
            setDragState(idle);
          },
        }),
        // Make this element a drop target for other draggable items
        dropTargetForElements({
          element,
          // Determine if a dragged item can be dropped here
          canDrop({ source }) {
            // Prevent dropping an item onto itself
            if (source.element === element) {
              return false;
            }
            // Only accept drops from other draggable items
            return isDraggableItemData(source.data);
          },
          // Provide data about this drop target, including edge detection
          getData({ input }) {
            const data = getDraggableItemData(draggableItemData);
            // Attach information about which edge (top/bottom) is closest
            // This determines if the item should be placed before or after
            return attachClosestEdge(data, {
              element,
              input,
              allowedEdges: ["top", "bottom"],
            });
          },
          // Update state when a dragged item enters this drop target
          onDragEnter({ self }) {
            const closestEdge = extractClosestEdge(self.data);
            setDragState({
              type: "is-being-dragged-over",
              closestEdge,
              id: uniqueId,
            });
          },
          // Update state as a dragged item moves within this drop target
          onDrag({ self }) {
            const closestEdge = extractClosestEdge(self.data);
            setDragState({
              type: "is-being-dragged-over",
              closestEdge,
              id: uniqueId,
            });
          },
          // Reset state when a dragged item leaves this drop target
          onDragLeave() {
            setDragState(idle);
          },
          // Reset state after a drop operation completes
          onDrop() {
            setDragState(idle);
          },
        }),
      );

      // Clean up event listeners when component unmounts
      return () => cleanup();
    }, [uniqueId, draggableItemData, setDragState]);

    // Render the draggable item with appropriate data attributes for state tracking
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
