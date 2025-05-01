import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
  useMemo,
  CSSProperties,
} from "react";

import {
  monitorForElements,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { isDraggableItemData } from "./draggable-utils";

import { UseDraggableHandle } from "../../hooks/useDraggable/useDraggable";
import DraggableProviderContext from "../../hooks/useDraggable/draggable-provider-context";
import guid from "../../__internal__/utils/helpers/guid";
import DraggableContainerContext from "./draggable-container-context";
import DraggableItemContext from "./draggable-item-context";

export interface DraggableContainerProps {
  id?: string | number;
  children?: React.ReactNode;
  dragType?: "continuous" | "onDrop";
  getOrder?: (
    draggableItemIds?: (string | number | undefined)[],
    movedItemId?: string | number | undefined,
  ) => void;
  containerStyle?: CSSProperties;
  containerNode?: keyof JSX.IntrinsicElements | React.ElementType;
  setDraggedNode?: (element: Element) => void;
  "data-role"?: string;
  "data-component"?: string;
  "data-element"?: string;
     /**
   * @private
   * @ignore
   * @internal
   * Sets className for component. INTERNAL USE ONLY. */
     className?: string;
}

const DraggableContainer = forwardRef<
  UseDraggableHandle,
  DraggableContainerProps
>(
  (
    {
      id,
      children,
      dragType = "continuous",
      getOrder,
      containerStyle,
      containerNode = "div",
      setDraggedNode,
      "data-role": dataRole,
      "data-component": dataComponent,
      "data-element": dataElement = "user-draggable-container",
      className,
    }: DraggableContainerProps,
    ref,
  ): JSX.Element => {
    const {
      register,
      lists,
      move,
      containerDragState,
      uniqueId: providerId,
    } = useContext(DraggableProviderContext);
    const [list, setList] = useState<React.ReactNode[]>([]);
    const [originalList, setOriginalList] = useState<React.ReactNode[]>([]);

    // creates a ref to store the original list of items on first render
    const hasStoredOriginal = useRef(false);

    const localGuid = useRef(guid());
    const uniqueId = id || localGuid.current;
    const containerRef = useRef<HTMLDivElement>();
    const hasMounted = useRef(false);
    const [localDraggedNode, setLocalDraggedNode] = useState<Element | null>(
      null,
    );

    const effectiveList = useMemo(() => {
      return list.length > 0 ? list : lists?.[uniqueId] || [];
    }, [list, lists, uniqueId]);

    // Modified useEffect to store the effectiveList instead of list
    useEffect(() => {
      if (effectiveList.length > 0 && !hasStoredOriginal.current) {
        setOriginalList(effectiveList);
        hasStoredOriginal.current = true;
      }
    }, [effectiveList]);

    const droppedList = useRef<React.ReactNode[]>([]);
    const prevChildrenCountRef = useRef(0);

    // handles for the initial register of items, and if items are dynamically added
    const localRegister = useCallback((items: React.ReactNode | React.ReactNode[]) => {
      const itemsArray = Array.isArray(items) ? items : [items];
      const currentCount = itemsArray.length;
      const prevCount = prevChildrenCountRef.current;
      
      // If this is the first time or there are new items
      if (prevCount === 0 || currentCount > prevCount) {
        // For first time, use the whole array
        if (prevCount === 0) {
          setList(itemsArray);
        } 
        // For updates, only add the new items
        else {
          const newItems = itemsArray.slice(prevCount);
          setList(prevList => [...prevList, ...newItems]);
          console.log(`Added ${newItems.length} new items`);
        }
      }
            prevChildrenCountRef.current = currentCount;
    }, []);

    const localMove = useCallback(
      (itemId: string | number, toIndex: number) => {
        if (!itemId || toIndex === null || toIndex === undefined) {
          return;
        }

        const elements = Array.from(
          document.querySelectorAll(`[data-parent-container-id="${uniqueId}"]`),
        );

        // supports finding passed Id's from consumers, specifically for the getOrder callback
        const movedId = (() => {
          const element = elements.find(
            (el) =>
              el.getAttribute("data-item-id") === String(itemId),
          );
          // checks to see if a passed Id can be found from the initial item, or the first child of the item
          const foundId = element?.getAttribute("data-item-id") as string;

          if (foundId === null || foundId === undefined) return null;

          // Simply return the ID as a string
          return foundId;
        })();

        const fromIndex = elements.findIndex(
          (item) => item.getAttribute("data-item-id") === itemId,
        );

        const copy = [...list];

        const [nodeToMove] = copy.splice(fromIndex, 1);
        const element = document.querySelector?.(`[data-item-id="${itemId}"]`);

        if (element && setDraggedNode) {
          setDraggedNode(element);
        }

        if (element && setLocalDraggedNode) {
          setLocalDraggedNode(element);
        }

        copy.splice(toIndex, 0, nodeToMove);
        setList(copy);

        // runs after move to ensure list is correct
        requestAnimationFrame(() => {
          const updatedElements = Array.from(
            document.querySelectorAll(
              `[data-parent-container-id="${uniqueId}"]`,
            ),
          );

          // supports finding the new list of passed Id's from consumers, specifically for the getOrder callback
          const allIds = updatedElements
          .map((el) => {
            // checks to see if a passed Id can be found from the initial item, or the first child of the item
            const foundId = el.getAttribute("data-item-id") as string;
            if (foundId === null || foundId === undefined) return null;
            return foundId;
          })
          .filter((potentialId) => potentialId !== null && potentialId !== undefined) as string[];
          
          if (
            allIds.length > 0 &&
            movedId !== undefined &&
            movedId !== null &&
            getOrder
          ) {
            getOrder(allIds, movedId);
          }
        });
      },
      [list, getOrder, uniqueId, setDraggedNode, setLocalDraggedNode],
    );

    useLayoutEffect(() => {
        if (register) {
          register(uniqueId, React.Children.toArray(children));
        } else {
          localRegister(React.Children.toArray(children));
        }
    }, [children, register, uniqueId]);

    const findParentItemId = (
      elementId: string,
      containerId: string,
    ): string | null => {
      const container: HTMLElement | null =
        document.getElementById(containerId);
      if (!container) {
        return null;
      }

      const escapedId = CSS.escape(elementId);
      const element: HTMLElement | null = container.querySelector(
        `#${escapedId}`,
      );
      if (!element) {
        return null;
      }

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

      return null;
    };

    useImperativeHandle(ref, () => ({
      reOrder: (itemId: number | string, toIndex: number) => {
        const locatedParent = findParentItemId(
          itemId as string,
          uniqueId as string,
        );
        localMove(locatedParent || itemId, toIndex);
      },
    }));

    const lastMoveRef = useRef<{
      indexOfTarget: null | number;
      destinationId: null | string | number;
    }>({
      indexOfTarget: null,
      destinationId: null,
    });

    const [state, setState] = useState<number>(0);

    useEffect(() => {
      if (state) {
        if(droppedList.current.length > 0) {
          setList(droppedList.current);
        } else if (originalList.length > 0) {
          // Use the stored originalList instead of logging it
          setList(originalList);
        }
      }
    }, [state, setList, originalList]);

    useEffect(() => {
      const element = containerRef.current as Element;
      if (!element) return;
            
      const cleanup = combine(
        dropTargetForElements({
          element,
        }),
        monitorForElements({
          canMonitor({ source }) {
            return (
              element &&
              isDraggableItemData(source.data) &&
              source.data.parentContainerId === uniqueId &&
              !move
            );
          },
          ...(dragType === "continuous" && {
            onDropTargetChange({ location, source }) {
              const target = location.current.dropTargets[0];
              if (target) {
                const indexOfTarget = Number(target.data.itemIndex);
                const destinationId = source.data.itemId as string | number;

                // early return to stop drags on other containers resulting in a move on current container
                // unlikely to happen, but worth checking. Is possible if two draggable containers are used 
                // next to each other, and the user drags from one to the other
                if(target.data.parentContainerId !== uniqueId) {
                  return;
                }
            
                if (
                  !Number.isNaN(indexOfTarget) &&
                  indexOfTarget >= 0 &&
                  destinationId !== undefined &&
                  destinationId !== null
                ) {
                  if (
                    lastMoveRef.current.indexOfTarget !== indexOfTarget ||
                    lastMoveRef.current.destinationId !== destinationId
                  ) {
                    localMove(destinationId, indexOfTarget);
                    lastMoveRef.current = { indexOfTarget, destinationId };
                  }
                }
              }
            },
          }),
          onDrop({ location, source }) {
            // if any drop takes place outside of a drop target or on an unrelated drop target
            if(!location.current.dropTargets.length || location.current.dropTargets[0].data.parentContainerId !== uniqueId) {
              // every time a drop occurs outside of the drop target
              // this triggers an effect which will then set the list order to the last 
              // saved order which was captured on drop
              setState(state => state + 1);
          } else {
            // creates a new list every time a drop occurs
            // this ensures that the list can be reset to the original order of the last drop 
            // and not the original order on render, as this may have changed
            droppedList.current = effectiveList
          }
            if (dragType === "onDrop") {
              const target = location.current.dropTargets[0];
              if (target) {
                const indexOfTarget = Number(target.data.itemIndex);
                const destinationId = source.data.itemId as string | number;

                if (
                  !Number.isNaN(indexOfTarget) &&
                  indexOfTarget >= 0 &&
                  destinationId !== undefined &&
                  destinationId !== null
                ) {
                  if (
                    lastMoveRef.current.indexOfTarget !== indexOfTarget ||
                    lastMoveRef.current.destinationId !== destinationId
                  ) {
                    localMove(destinationId, indexOfTarget);
                    lastMoveRef.current = { indexOfTarget, destinationId };
                  }
                }
              }
            }
            lastMoveRef.current = {
              indexOfTarget: null,
              destinationId: null,
            };
          },
        }),
      );
      return () => cleanup();
    }, [localMove, move, uniqueId, dragType, effectiveList]); // Removed setState from dependencies

    const dataDragState = () => {
      if (!move) {
        return undefined;
      }
      if (containerDragState?.targetContainerId === uniqueId) {
        return containerDragState.draggingBetweenContainers
          ? "dragging-over-between-containers"
          : "dragging-over";
      }
      return undefined;
    };

    return (
      <DraggableContainerContext.Provider
        value={{ columnId: uniqueId, localDraggedNode, dragType }}
      >
        {React.createElement(
          containerNode,
          {
            "data-element": dataElement,
            "data-role": dataRole,
            ...(dataDragState() && { "data-drag-state": dataDragState() }),
            "data-component": dataComponent,
            ...(providerId && { "data-provider-id": providerId }),
            className,
            id: uniqueId,
            style: containerStyle,
            ref: containerRef,
          },
          (effectiveList || []).map((child: React.ReactNode, index: number) => (
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