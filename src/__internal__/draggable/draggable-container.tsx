import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
  useMemo,
} from "react";

import {
  monitorForElements,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

import { isDraggableItemData } from "./draggable-utils";
import guid from "../../__internal__/utils/helpers/guid";

import DraggableContainerContext from "./draggable-container-context";
import DraggableItemContext from "./draggable-item-context";

/**
 * Interface for the handle exposed by the DraggableContainer component
 */
export interface DraggableHandle {
  /**
   * Reorders an item to a specified index position
   * @param itemId - The ID of the item to move
   * @param toIndex - The destination index to move the item to
   */
  reOrder: (itemId: number | string, toIndex: number) => void;
}

export interface DraggableContainerProps {
  /** Unique identifier for the container */
  id?: string | number;
  /** Child elements to be rendered within the container */
  children?: React.ReactNode;
  /**
   * Drag behavior type:
   * - "continuous": Items reorder as they are dragged
   * - "onDrop": Items reorder only when dropped
   */
  dragType?: "continuous" | "onDrop";
  /**
   * Callback fired when items are reordered
   * @param draggableItemIds - Array of item IDs in their current order
   * @param movedItemId - ID of the item that was moved
   */
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void;
  /** HTML element or React component to use as the container */
  containerNode?: keyof JSX.IntrinsicElements | React.ElementType;
  /** Callback to set the currently dragged element */
  setDraggedNode?: (element: Element) => void;
  /** An object in which any additional props can be passed to the container element */
  containerProps?: Record<string, unknown>;
}

const DraggableContainer = forwardRef<DraggableHandle, DraggableContainerProps>(
  (
    {
      id,
      children,
      dragType = "continuous",
      getOrder,
      containerNode = "div",
      setDraggedNode,
      containerProps = {},
    }: DraggableContainerProps,
    ref,
  ): JSX.Element => {
    const [list, setList] = useState<React.ReactNode[]>([]);
    const [originalList, setOriginalList] = useState<React.ReactNode[]>([]);
    const [dropOutsideTargetCount, updateDropOutsideTargetCount] =
      useState<number>(0);

    const hasStoredOriginal = useRef(false);
    const localGuid = useRef(guid());
    const containerRef = useRef<HTMLDivElement>();
    const droppedList = useRef<React.ReactNode[]>([]);
    const prevChildrenCountRef = useRef(0);
    const lastStoredItems = useRef<React.ReactNode[]>([]);

    // Add flags to track drag and imperative move operations
    const isDragging = useRef(false);
    const isImperativeMove = useRef(false);

    // Tracks the last move operation to prevent redundant moves
    const lastMoveRef = useRef<{
      indexOfTarget: null | number;
      destinationId: null | string | number;
    }>({
      indexOfTarget: null,
      destinationId: null,
    });

    const uniqueId = id || localGuid.current;

    // Returns the effective list to render, defaulting to empty array if list is empty
    const effectiveList = useMemo(() => {
      return list.length > 0 ? list : [];
    }, [list]);

    /**
     * Finds the parent item ID for a given element within the container
     * @param elementId - ID of the element to find the parent for
     * @param containerId - ID of the container to search within
     * @returns The parent item ID or null if not found
     */
    const findParentItemId = (
      elementId: string,
      containerId: string,
    ): string | null => {
      const container: HTMLElement | null =
        document.getElementById(containerId);

      const escapedId = CSS.escape(elementId);
      const element: HTMLElement | null | undefined = container?.querySelector(
        `#${escapedId}`,
      );

      if (container && element) {
        let currentElement: HTMLElement | null = element;
        while (
          currentElement &&
          currentElement !== container &&
          currentElement !== document.documentElement
        ) {
          if (currentElement.hasAttribute("data-item-id")) {
            return currentElement.getAttribute("data-item-id");
          }
          currentElement = currentElement.parentElement;
        }
      }
      return null;
    };

    // Store the initial list when it's first populated to enable reset functionality
    useEffect(() => {
      if (effectiveList.length > 0 && !hasStoredOriginal.current) {
        setOriginalList(effectiveList);
        hasStoredOriginal.current = true;
      }
    }, [effectiveList, setOriginalList]);

    // Handle drops outside target areas by restoring to original order or last valid drop
    // Extremely hard to get this to work in unit tests, but our PW tests should catch it
    useEffect(() => {
      if (dropOutsideTargetCount) {
        /* istanbul ignore if */
        if (droppedList.current.length > 0) {
          /* istanbul ignore next */
          setList(droppedList.current);
        } else {
          setList(originalList);
        }
      }
    }, [dropOutsideTargetCount, setList, originalList]);

    /**
     * Registers child items and manages list updates when children change
     * This handles add, remove, and replace operations for child items
     */
    const localRegister = useCallback(
      (items: React.ReactNode[]) => {
        const currentCount = items.length;
        const prevCount = prevChildrenCountRef.current;

        // First-time registration
        if (prevCount === 0) {
          setList(items);
          lastStoredItems.current = items;
        }
        // Items added - append new items to existing list
        else if (currentCount > prevCount) {
          const newItems = items.slice(prevCount);
          setList((prevList) => [...prevList, ...newItems]);
          lastStoredItems.current = items;
        }
        // Items removed - replace with new items array
        else if (prevCount > currentCount) {
          setList(items);
          lastStoredItems.current = items;
        }

        const hasOrderChanged = (
          currentRef: React.MutableRefObject<React.ReactNode[]>,
          newArray: React.ReactNode[],
        ) => currentRef.current.some((item, index) => item !== newArray[index]);

        // Only check for order changes if we're not in a drag operation or imperative move - only a render change
        if (
          !isDragging.current &&
          !isImperativeMove.current &&
          hasOrderChanged(lastStoredItems, items)
        ) {
          setList(items);
          lastStoredItems.current = items;
        }

        prevChildrenCountRef.current = currentCount;
      },
      [setList],
    );

    /**
     * Moves an item within the list to a new position
     * @param itemId - ID of the item to move
     * @param toIndex - Destination index to move the item to
     */
    const localMove = useCallback(
      (itemId: string | number, toIndex: number) => {
        // Set flag to indicate this is an internal move operation
        isImperativeMove.current = true;

        // Skip invalid moves with missing parameters
        if (!itemId || toIndex === null || toIndex === undefined) {
          isImperativeMove.current = false;
          return;
        }

        // Get all draggable items in this container
        const elements = Array.from(
          document.querySelectorAll(`[data-parent-container-id="${uniqueId}"]`),
        );

        // Find the ID of the moved item for the getOrder callback
        const movedId = (() => {
          const element = elements.find(
            (el) => el.getAttribute("data-item-id") === String(itemId),
          );
          const foundId = element?.getAttribute("data-item-id") as string;

          if (foundId === null || foundId === undefined) return null;

          return foundId;
        })();

        // Find the current index of the item to move
        const fromIndex = elements.findIndex(
          (item) => item.getAttribute("data-item-id") === itemId,
        );

        // Skip if item not found in the list
        if (fromIndex < 0) {
          isImperativeMove.current = false;
          return;
        }

        // Create a copy of the list and move the item
        const copy = [...list];
        const [nodeToMove] = copy.splice(fromIndex, 1);

        // Notify parent about the dragged element if callback provided
        const element = elements.find(
          (el) => el.getAttribute("data-item-id") === String(itemId),
        );

        // ensure the data-drag-state persists after move to avoid any post move flashes
        element?.setAttribute("data-drag-state", "is-being-dragged-over");

        if (element && setDraggedNode) {
          setDraggedNode(element);
        }

        // Insert the item at the new position
        copy.splice(toIndex, 0, nodeToMove);
        setList(copy);

        // Update order in parent after DOM has been updated
        requestAnimationFrame(() => {
          // ensure the is-being-dragged-over attribute persists after move to avoid any post move flashing

          const updatedElements = Array.from(
            document.querySelectorAll(
              `[data-parent-container-id="${uniqueId}"]`,
            ),
          );

          // Extract all item IDs for the getOrder callback
          const allIds = updatedElements
            .map((el) => {
              const foundId = el.getAttribute("data-item-id") as string;
              return foundId;
            })
            .filter(
              (potentialId) =>
                potentialId !== null && potentialId !== undefined,
            ) as string[];

          // Call getOrder with the new item order if provided
          if (
            allIds.length > 0 &&
            movedId !== undefined &&
            movedId !== null &&
            getOrder
          ) {
            getOrder(allIds, movedId);
          }

          // Reset the flag after DOM updates
          setTimeout(() => {
            isImperativeMove.current = false;
          }, 0);
        });
      },
      [list, getOrder, uniqueId, setDraggedNode],
    );

    // Register children on initial render and when they change
    useLayoutEffect(() => {
      localRegister(React.Children.toArray(children));
    }, [children, uniqueId, localRegister]);

    // Set up drag and drop event handling
    useEffect(() => {
      const element = containerRef.current as Element;

      // Extract and validate item IDs
      const elements = Array.from(
        document.querySelectorAll(`[data-parent-container-id="${uniqueId}"]`),
      );
      const itemIds: string[] = [];
      elements.forEach((item) => {
        const itemId = item.getAttribute("data-item-id") as string;
        itemIds.push(itemId);
      });

      // Check for duplicate IDs which would break reordering
      const duplicateIds = itemIds.filter(
        (item, index) => itemIds.indexOf(item) !== index,
      );

      if (duplicateIds.length > 0) {
        // Format the duplicates with proper spacing after commas
        const formattedDuplicates = duplicateIds.join(", ");

        // eslint-disable-next-line no-console
        console.warn(
          `[WARNING] There are draggable item(s) with duplicate unique identifiers (${formattedDuplicates}), therefore a move could not be completed.`,
        );
      }

      const cleanup = combine(
        // Set up this element as a drop target
        dropTargetForElements({
          element,
        }),
        // Monitor drag and drop events
        monitorForElements({
          // Only monitor events for items from this container
          canMonitor({ source }) {
            return (
              element &&
              isDraggableItemData(source.data) &&
              source.data.parentContainerId === uniqueId
            );
          },

          // Track when dragging starts
          onDragStart() {
            isDragging.current = true;
          },

          // Handle continuous drag mode - update on every position change
          ...(dragType === "continuous" && {
            onDropTargetChange({ location, source }) {
              const target = location.current.dropTargets[0];

              if (!target) {
                return;
              }

              const indexOfTarget = Number(target.data.itemIndex);
              const destinationId = source.data.itemId as string | number;

              // Skip if dragging between different containers
              // This prevents moves on the current container when dragging from another container
              if (target.data.parentContainerId !== uniqueId) {
                return;
              }

              // Prevent infinite move loops by checking if this is a new position
              // This is necessary because move events can fire rapidly in browser environments
              // Almost impossible to replicate this behaviour in unit tests, but our PW tests should catch it
              /* istanbul ignore next */
              if (
                !Number.isNaN(indexOfTarget) &&
                indexOfTarget >= 0 &&
                destinationId !== undefined &&
                destinationId !== null &&
                (lastMoveRef.current.indexOfTarget !== indexOfTarget ||
                  lastMoveRef.current.destinationId !== destinationId)
              ) {
                localMove(destinationId, indexOfTarget);
                lastMoveRef.current = { indexOfTarget, destinationId };
              }
            },
          }),
          // Handle drop events for both drag modes
          onDrop({ location, source }) {
            // Handle drops outside valid targets or in unrelated targets
            if (
              !location.current.dropTargets.length ||
              location.current.dropTargets[0].data.parentContainerId !==
                uniqueId
            ) {
              // Trigger effect to restore list to last saved order
              updateDropOutsideTargetCount((currentCount) => currentCount + 1);
            } else {
              // Save current list as the new "last valid drop" state
              // This ensures we can reset to this order rather than the initial order
              droppedList.current = effectiveList;
            }

            // Handle onDrop drag mode - only update position when item is dropped
            if (dragType === "onDrop") {
              const target = location.current.dropTargets[0];

              if (!target) {
                return;
              }

              const indexOfTarget = Number(target.data.itemIndex);
              const destinationId = source.data.itemId as string | number;

              // Move the item if position is valid and different from last position
              if (
                !Number.isNaN(indexOfTarget) &&
                indexOfTarget >= 0 &&
                destinationId !== undefined &&
                destinationId !== null &&
                lastMoveRef.current.indexOfTarget !== indexOfTarget
              ) {
                localMove(destinationId, indexOfTarget);
              }
            }

            // Reset last move tracking on drop
            lastMoveRef.current = {
              indexOfTarget: null,
              destinationId: null,
            };

            // Reset dragging flag when drop completes
            isDragging.current = false;
          },
        }),
      );
      return () => cleanup();
    }, [localMove, uniqueId, dragType, effectiveList]);

    // Expose reOrder method to parent components through ref
    useImperativeHandle<DraggableHandle, DraggableHandle>(ref, () => ({
      reOrder: (itemId: number | string, toIndex: number) => {
        // Find parent item ID if itemId refers to a child element
        const locatedParent = findParentItemId(
          itemId as string,
          uniqueId as string,
        );

        // Use found parent ID or fall back to provided ID
        localMove(locatedParent || itemId, toIndex);
      },
    }));

    // Render the container with draggable context providers
    return (
      <DraggableContainerContext.Provider
        value={{ columnId: uniqueId, dragType }}
      >
        {React.createElement(
          containerNode,
          {
            ...containerProps,
            id: uniqueId,
            ref: containerRef,
          },
          effectiveList.map((child: React.ReactNode, index: number) => (
            <DraggableItemContext.Provider
              key={`${uniqueId}-${guid()}`}
              value={{ index }}
            >
              {child}
            </DraggableItemContext.Provider>
          )),
        )}
      </DraggableContainerContext.Provider>
    );
  },
);

export default DraggableContainer;
