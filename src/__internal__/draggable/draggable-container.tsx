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
} from "react";

// External dependencies
import {
  monitorForElements,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

// Internal utilities and hooks
import { isDraggableItemData } from "./draggable-utils";
import { UseDraggableHandle } from "../../hooks/useDraggable/useDraggable";
import DraggableProviderContext from "../../hooks/useDraggable/draggable-provider-context";
import guid from "../../__internal__/utils/helpers/guid";

// Context providers
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
      containerNode = "div",
      setDraggedNode,
      "data-role": dataRole,
      "data-component": dataComponent,
      "data-element": dataElement = "user-draggable-container",
      className,
    }: DraggableContainerProps,
    ref,
  ): JSX.Element => {
    // Context and state
    const {
      register,
      lists,
      move,
      containerDragState,
      uniqueId: providerId,
    } = useContext(DraggableProviderContext);

    const [list, setList] = useState<React.ReactNode[]>([]);
    const [originalList, setOriginalList] = useState<React.ReactNode[]>([]);
    const [dropOutsideTargetCount, updateDropOutsideTargetCount] =
      useState<number>(0);

    // Refs
    const hasStoredOriginal = useRef(false);
    const localGuid = useRef(guid());
    const containerRef = useRef<HTMLDivElement>();
    const droppedList = useRef<React.ReactNode[]>([]);
    const prevChildrenCountRef = useRef(0);
    const lastMoveRef = useRef<{
      indexOfTarget: null | number;
      destinationId: null | string | number;
    }>({
      indexOfTarget: null,
      destinationId: null,
    });

    // Derived values
    const uniqueId = id || localGuid.current;

    const effectiveList = useMemo(() => {
      return list.length > 0 ? list : lists?.[uniqueId] || [];
    }, [list, lists, uniqueId]);

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

      if(container && element){
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

    const dataDragState = (): string | undefined => {
      if (!move) {
        return undefined;
      }

      if (containerDragState?.targetContainerId !== uniqueId) {
        return undefined;
      }

      if (containerDragState.draggingBetweenContainers) {
        return "dragging-over-between-containers";
      }

      return "dragging-over";
    };

    // Store the initial list when it's first populated
    useEffect(() => {
      if (effectiveList.length > 0 && !hasStoredOriginal.current) {
        setOriginalList(effectiveList);
        hasStoredOriginal.current = true;
      }
    }, [effectiveList, setOriginalList]);

    // Handle drops outside target - having to use playwright to test the first if 
    // as I was unable to get the list to update to the last move due to 
    // jest not being able to properly replicate a browser environment
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

    // Register items
    const localRegister = useCallback(
      (items: React.ReactNode[]) => {
        const currentCount = items.length;
        const prevCount = prevChildrenCountRef.current;
    
        // First-time registration
        if (prevCount === 0) {
          setList(items);
        }
        // Items added
        else if (currentCount > prevCount) {
          const newItems = items.slice(prevCount);
          setList((prevList) => [...prevList, ...newItems]);
        }
        // Items removed
        else if (prevCount > currentCount) {
          setList(items); // Simply use the new items array directly
        } else {
          // No change in items length we return instead of updating the list 
          // this is to prevent performance issues as a change in children 
          // will cause this callback to be called
          // and we don't want to update the list if there is no change
          // which is not an addition or
          return;
        }
        
        prevChildrenCountRef.current = currentCount;
      },
      [setList] // Add setList as a dependency
    );


    // Move items within the list
    const localMove = useCallback(
      (itemId: string | number, toIndex: number) => {
        // COVER THIS
        if (!itemId || toIndex === null || toIndex === undefined) {
          return;
        }

        const elements = Array.from(
          document.querySelectorAll(`[data-parent-container-id="${uniqueId}"]`),
        );

        // supports finding passed Id's from consumers, specifically for the getOrder callback
        const movedId = (() => {
          const element = elements.find(
            (el) => el.getAttribute("data-item-id") === String(itemId),
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

        // returns if the index is invalid
        if (fromIndex < 0) {
          return;
        }

        const copy = [...list];

        const [nodeToMove] = copy.splice(fromIndex, 1);
        const element = document.querySelector?.(`[data-item-id="${itemId}"]`);

        if (element && setDraggedNode) {
          setDraggedNode(element);
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
              return foundId;
            })
            .filter(
              (potentialId) =>
                potentialId !== null && potentialId !== undefined,
            ) as string[];

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
      [list, getOrder, uniqueId, setDraggedNode],
    );

    // Initial registration of children
    useLayoutEffect(() => {
      if (register) {
        register(uniqueId, React.Children.toArray(children));
      } else {
        localRegister(React.Children.toArray(children));
      }
    }, [children, register, uniqueId, localRegister]);

    // Set up drag and drop functionality
    useEffect(() => {
      const element = containerRef.current as Element;
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

              if(!target){
                return;
              }

                const indexOfTarget = Number(target.data.itemIndex);
                const destinationId = source.data.itemId as string | number;

                // early return to stop drags on other containers resulting in a move on current container
                // unlikely to happen, but worth checking. Is possible if two draggable containers are used
                // next to each other, and the user drags from one to the other
                if (target.data.parentContainerId !== uniqueId) {
                  return;
                }

                console.log("destinationId", destinationId);
                console.log("destinationId ref", lastMoveRef.current.destinationId);
                
                // need to istanbul ignore as this is not possible to test in jest
                // as the jest enviroment cannot easily replicate a scenario where
                // the user can drag to a destination where it is the same as the previous 
                // an item cannot drag on itself, and every other item is a different position 
                // however, we need to have this condition as in a browser a move event can fire 
                // quickly, which can cause an infinite move loop, this can be observed in master
                // with our current dnd implementation under specific conditions
              
                //  /* istanbul ignore if */
                if (
                  !Number.isNaN(indexOfTarget) &&
                  indexOfTarget >= 0 &&
                  destinationId !== undefined &&
                  destinationId !== null &&
                  (
                    lastMoveRef.current.indexOfTarget !== indexOfTarget ||
                    lastMoveRef.current.destinationId !== destinationId
                  )
                ) {
                    localMove(destinationId, indexOfTarget);
                    lastMoveRef.current = { indexOfTarget, destinationId };
                }
              
            },
          }),
          onDrop({ location, source }) {


            // if any drop takes place outside of a drop target or on an unrelated drop target
            if (
              !location.current.dropTargets.length ||
              location.current.dropTargets[0].data.parentContainerId !==
                uniqueId
            ) {


              // every time a drop occurs outside of the drop target
              // this triggers an effect which will then set the list order to the last
              // saved order which was captured on drop
              updateDropOutsideTargetCount((currentCount) => currentCount + 1);
            } else {

              // creates a new list every time a drop occurs
              // this ensures that the list can be reset to the original order of the last drop
              // and not the original order on render, as this may have changed


              droppedList.current = effectiveList;

            }
            if (dragType === "onDrop") {
              const target = location.current.dropTargets[0];
  
                if(!target){
                  return;
                }

                const indexOfTarget = Number(target.data.itemIndex);
                const destinationId = source.data.itemId as string | number;

                if (
                  !Number.isNaN(indexOfTarget) &&
                  indexOfTarget >= 0 &&
                  destinationId !== undefined &&
                  destinationId !== null
                  && lastMoveRef.current.indexOfTarget !== indexOfTarget
                ) {
                    localMove(destinationId, indexOfTarget);
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
    }, [localMove, move, uniqueId, dragType, effectiveList]);

    // Expose reOrder method through ref
    useImperativeHandle(ref, () => ({
      reOrder: (itemId: number | string, toIndex: number) => {
        const locatedParent = findParentItemId(
          itemId as string,
          uniqueId as string,
        );

        localMove(locatedParent || itemId, toIndex);
      },
    }));

    // Render component
    return (
      <DraggableContainerContext.Provider
        value={{ columnId: uniqueId, dragType }}
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
            ref: containerRef,
          },
          (effectiveList).map((child: React.ReactNode, index: number) => (
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
