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

    const hasStoredOriginal = useRef<boolean>(false);
    const localGuid = useRef<string>(guid());
    const containerRef = useRef<HTMLDivElement>(null);
    const droppedList = useRef<React.ReactNode[]>([]);
    const prevChildrenCountRef = useRef<number>(0);
    const lastStoredItems = useRef<React.ReactNode[]>([]);

    const isDragging = useRef<boolean>(false);
    const isImperativeMove = useRef<boolean>(false);

    const lastMoveRef = useRef<{
      indexOfTarget: null | number;
      destinationId: null | string | number;
    }>({
      indexOfTarget: null,
      destinationId: null,
    });

    /**
     * Memoizes the container's unique identifier to prevent unnecessary recalculations
     * when using the fallback guid value
     */
    const uniqueId: string | number = useMemo(
      () => id || localGuid.current,
      [id],
    );

    /**
     * Returns the effective list to render, defaulting to empty array if list is empty
     */
    const effectiveList: React.ReactNode[] = useMemo(() => {
      return list.length > 0 ? list : [];
    }, [list]);

    /**
     * Finds the parent item ID for a given element within the container
     * @param elementId - ID of the element to find the parent for
     * @param containerId - ID of the container to search within
     * @returns The parent item ID or null if not found
     */
    const findParentItemId = useCallback(
      (elementId: string, containerId: string): string | null => {
        const container: HTMLElement | null =
          document.getElementById(containerId);

        const escapedId: string = CSS.escape(elementId);
        const element: HTMLElement | null | undefined =
          container?.querySelector(`#${escapedId}`);

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
      },
      [],
    );

    useEffect(() => {
      if (effectiveList.length > 0 && !hasStoredOriginal.current) {
        setOriginalList(effectiveList);
        hasStoredOriginal.current = true;
      }
    }, [effectiveList, setOriginalList]);

    // Extremely hard to get this to work in unit tests, but our PW tests catch it
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
        const currentCount: number = items.length;
        const prevCount: number = prevChildrenCountRef.current;

        if (prevCount === 0) {
          setList(items);
          lastStoredItems.current = items;
        } else if (currentCount > prevCount) {
          const newItems: React.ReactNode[] = items.slice(prevCount);
          setList((prevList) => [...prevList, ...newItems]);
          lastStoredItems.current = items;
        } else if (prevCount > currentCount) {
          setList(items);
          lastStoredItems.current = items;
        }

        const hasOrderChanged = (
          currentRef: React.MutableRefObject<React.ReactNode[]>,
          newArray: React.ReactNode[],
        ) => currentRef.current.some((item, index) => item !== newArray[index]);

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
     * Memoizes the CSS selector string for querying container elements
     * to avoid string concatenation on every render
     */
    const containerSelector: string = useMemo(
      () => `[data-parent-container-id="${uniqueId}"]`,
      [uniqueId],
    );

    /**
     * Returns all DOM elements belonging to this container
     * Memoized to prevent repeated DOM queries
     */
    const getContainerElements = useCallback((): Element[] => {
      return Array.from(document.querySelectorAll(containerSelector));
    }, [containerSelector]);

    /**
     * Moves an item within the list to a new position
     * @param itemId - ID of the item to move
     * @param toIndex - Destination index to move the item to
     */
    const localMove = useCallback(
      (itemId: string | number, toIndex: number) => {
        isImperativeMove.current = true;

        if (!itemId || toIndex === null || toIndex === undefined) {
          isImperativeMove.current = false;
          return;
        }

        const elements: Element[] = getContainerElements();
        const itemIdString: string = String(itemId);

        const fromIndex: number = elements.findIndex(
          (item) => item.getAttribute("data-item-id") === itemIdString,
        );

        if (fromIndex < 0) {
          isImperativeMove.current = false;
          return;
        }

        const element: Element = elements[fromIndex];
        const movedId: string | null = element.getAttribute("data-item-id");

        const copy: React.ReactNode[] = [...list];
        const [nodeToMove]: React.ReactNode[] = copy.splice(fromIndex, 1);

        // fallback to preserve the `data-drag-state` attribute through re-render, makes sure there is no flash of styling.
        requestAnimationFrame(() => {
          const elementAfterReRender = document.querySelector(
            `[data-item-id="${itemIdString}"]`,
          );
          elementAfterReRender?.setAttribute(
            "data-drag-state",
            "is-being-dragged-over",
          );
        });
        if (setDraggedNode) {
          setDraggedNode(element);
        }

        copy.splice(toIndex, 0, nodeToMove);
        setList(copy);

        requestAnimationFrame(() => {
          const updatedElements: Element[] = getContainerElements();
          const allIds: string[] = updatedElements
            .map((el) => el.getAttribute("data-item-id"))
            .filter((filteredId): filteredId is string => filteredId !== null);

          if (allIds.length > 0 && movedId && getOrder) {
            getOrder(allIds, movedId);
          }

          setTimeout(() => {
            isImperativeMove.current = false;
          }, 0);
        });
      },
      [list, getOrder, setDraggedNode, getContainerElements],
    );

    /**
     * Memoizes the children array to prevent unnecessary re-processing
     * when React.Children.toArray is called repeatedly
     */
    const childrenArray: React.ReactNode[] = useMemo(
      () => React.Children.toArray(children),
      [children],
    );

    useLayoutEffect(() => {
      localRegister(childrenArray);
    }, [childrenArray, localRegister]);

    useEffect(() => {
      const element: Element = containerRef.current as Element;

      const elements: Element[] = getContainerElements();
      const itemIds: string[] = [];
      elements.forEach((item) => {
        const itemId: string | null = item.getAttribute(
          "data-item-id",
        ) as string;
        itemIds.push(itemId);
      });

      const duplicateIds: string[] = itemIds.filter(
        (item, index) => itemIds.indexOf(item) !== index,
      );

      if (duplicateIds.length > 0) {
        const formattedDuplicates: string = duplicateIds.join(", ");

        // eslint-disable-next-line no-console
        console.warn(
          `[WARNING] There are draggable item(s) with duplicate unique identifiers (${formattedDuplicates}), therefore a move could not be completed.`,
        );
      }

      const cleanup = combine(
        dropTargetForElements({
          element,
        }),
        monitorForElements({
          canMonitor({ source }) {
            return (
              element &&
              isDraggableItemData(source.data) &&
              source.data.parentContainerId === uniqueId
            );
          },

          onDragStart() {
            isDragging.current = true;
          },

          ...(dragType === "continuous" && {
            onDropTargetChange({ location, source }) {
              const target = location.current.dropTargets[0];

              if (!target) {
                return;
              }

              const indexOfTarget: number = Number(target.data.itemIndex);
              const destinationId: string | number = source.data.itemId as
                | string
                | number;

              if (target.data.parentContainerId !== uniqueId) {
                return;
              }

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
          onDrop({ location, source }) {
            if (
              !location.current.dropTargets.length ||
              location.current.dropTargets[0].data.parentContainerId !==
                uniqueId
            ) {
              updateDropOutsideTargetCount((currentCount) => currentCount + 1);
            } else {
              droppedList.current = effectiveList;
            }

            if (dragType === "onDrop") {
              const target = location.current.dropTargets[0];

              if (!target) {
                return;
              }

              const indexOfTarget: number = Number(target.data.itemIndex);
              const destinationId: string | number = source.data.itemId as
                | string
                | number;

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

            lastMoveRef.current = {
              indexOfTarget: null,
              destinationId: null,
            };

            isDragging.current = false;
          },
        }),
      );
      return () => cleanup();
    }, [localMove, uniqueId, dragType, effectiveList, getContainerElements]);

    useImperativeHandle<DraggableHandle, DraggableHandle>(
      ref,
      () => ({
        reOrder: (itemId: number | string, toIndex: number) => {
          const locatedParent: string | null = findParentItemId(
            itemId as string,
            uniqueId as string,
          );

          localMove(locatedParent || itemId, toIndex);
        },
      }),
      [findParentItemId, localMove, uniqueId],
    );

    /**
     * Memoizes the context value to prevent unnecessary re-renders
     * of all child components when the context object reference changes
     */
    const contextValue = useMemo(
      () => ({
        columnId: uniqueId,
        dragType,
      }),
      [uniqueId, dragType],
    );

    return (
      <DraggableContainerContext.Provider value={contextValue}>
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
