import React, {
    useContext,
    useEffect,
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
  
  import { UseDraggableHandle } from "../../hooks/useDraggable/useDraggable";
  import DraggableProviderContext from "../../hooks/useDraggable/draggable-provider-context";
  import guid  from "../../__internal__/utils/helpers/guid";
  import DraggableContainerContext from "./draggable-container-context";
  import DraggableItemContext from "./draggable-item-context";
  
  export interface DraggableContainerProps {
    id?: string | number;
    children?: React.ReactNode;
    getOrder?: (
      draggableItemIds?: (string | number | undefined)[],
      movedItemId?: string | number | undefined,
    ) => void;
    containerNode?:  keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
    "data-role"?: string;
    "data-component"?: string;
  }
  
  const DraggableContainer = forwardRef<
    UseDraggableHandle,
    DraggableContainerProps
  >(
    (
      {
        id,
        children,
        getOrder,
        containerNode = "div",
        "data-role": dataRole,
        "data-component": dataComponent,
      }: DraggableContainerProps,
      ref,
    ): JSX.Element => {
      const { register, lists, move, containerDragState } = useContext(DraggableProviderContext);
      const [list, setList] = useState<React.ReactNode[]>([]);
  
      const uniqueGuid = useRef(guid());
      const uniqueId = id || uniqueGuid.current;
      const containerRef = useRef<HTMLDivElement>();
      const hasMounted = useRef(false);
  
      const effectiveList = useMemo(() => {
        return list.length > 0 ? list : lists?.[uniqueId] || [];
      }, [list, lists, uniqueId]);
  
      const localRegister = (items: React.ReactNode | React.ReactNode[]) => {
        setList((prevList) =>
          Array.isArray(items) ? [...prevList, ...items] : [...prevList, items],
        );
      };
  
      const localMove = useCallback(
        (itemId: string | number, toIndex: number) => {
          if (!itemId || toIndex === null || toIndex === undefined) {
            return;
          }
  
          const elements = Array.from(
            document.querySelectorAll(
              `[data-parent-container-id="${uniqueId}"]`,
            ),
          );
  
          // supports finding passed Id's from consumers, specifically for the getOrder callback
          const movedId = (() => {
            const element = elements.find(
              (element) => element.getAttribute("data-item-id") === String(itemId),
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
            .map((element) => {
              // checks to see if a passed Id can be found from the initial item, or the first child of the item
              const foundId = element.getAttribute("data-item-id") as string;
              
              if (foundId === null || foundId === undefined) return null;
              
              return foundId;
            })
            .filter((id) => id !== null && id !== undefined) as string[];
  
            if (allIds.length > 0 && movedId !== undefined && movedId !== null && getOrder) {
              getOrder(allIds, movedId);
            }
          });
        },
        [list, getOrder, uniqueId],
      );
  
      useEffect(() => {
        if (!hasMounted.current) {
          if (register) {
            register(uniqueId, React.Children.toArray(children));
          } else {
            localRegister(React.Children.toArray(children));
          }
          hasMounted.current = true;
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
                source.data.parentContainerId === uniqueId
                && !move
              );
            },
            onDropTargetChange({ location, source }) {
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
            },
            onDrop: () =>
              (lastMoveRef.current = {
                indexOfTarget: null,
                destinationId: null,
              }),
          }),
        );
  
        return () => cleanup();
      }, [localMove, move, uniqueId]);
  
      const finalContainerDragState = () => {

        if(containerDragState?.targetContainerId === uniqueId) {
          return containerDragState.draggingBetweenContainers ? "dragging-over-between-containers" : "idle"
        } 
        return "idle";
      }

      return (
        <DraggableContainerContext.Provider
          value={{ columnId: uniqueId }}
        >
          {React.createElement(
            containerNode,
            {
              "data-element": "use-draggable-container",
              "data-role": dataRole,
              "data-drag-state": finalContainerDragState(),
              "data-component": dataComponent,
              id: uniqueId,
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
  