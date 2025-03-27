import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  memo,
} from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import guid from "../../__internal__/utils/helpers/guid"
import {
  isDraggableItemData,
  Edge,
} from "../../__internal__/draggable/draggable-utils";
import DraggableProviderContext from "./draggable-provider-context";

type ContainerOrderType = Record<string | number, (string | number | null)[]>;

interface DraggableProviderType {
  children: React.ReactNode;
  providerId?: string | number;
  dragType?: "continuous" | "onDrop";
  getOrder?: (
    containerIdOrder?: ContainerOrderType,
    movedItemId?: string | number | undefined,
  ) => void;
}

export interface ReOrderProps {
  itemId: number;
  toIndex?: number;
  toListId?: string | number;
}

export interface DraggableProviderHandle {
  reOrder: (props: ReOrderProps) => void;
}

export interface ContainerDragState {
  draggingBetweenContainers?: boolean;
  targetContainerId?: string | null;
}

const DraggableProvider = forwardRef<
  DraggableProviderHandle,
  DraggableProviderType
>(({ children, providerId, dragType="continuous", getOrder }, ref) => {
  const [lists, setLists] = useState<Record<string, React.ReactNode[]>>({});
  const [containerDragState, setContainerDragState] =
    useState<ContainerDragState>({});

  const register = useCallback(
    (id: string | number, list: React.ReactNode[]) => {
      setLists((existingLists) => ({
        ...existingLists,
        [id]: list,
      }));
    },
    [],
  );

  const move = useCallback(
    (
      fromListId: string | number,
      toListId: string | number,
      destinationId: number | string,
      toIndex: number,
    ) => {

      if (fromListId === null || fromListId === undefined || toListId === null || toListId === undefined || destinationId === null || destinationId === undefined || toIndex === null || toIndex === undefined) {
        return;
      }

      const elements = Array.from(
        document.querySelectorAll(
          `[data-provider-id="${uniqueId}"] [data-parent-container-id="${fromListId}"]`,
        ),
      );

      setLists((prevLists) => {
        const fromIndex = elements.findIndex(
          (item) => item.getAttribute("data-item-id") === destinationId,
        );

        const copy = { ...prevLists };
        const [nodeToMove] = copy[fromListId].splice(fromIndex, 1);
        copy[toListId].splice(toIndex, 0, nodeToMove);
        return copy;
      });

      const movedId = elements.find(element => element.getAttribute('data-item-id') === destinationId)?.getAttribute("data-item-id");
      
      requestAnimationFrame(() => {
        const containers = Array.from(
          document.querySelectorAll(`[data-provider-id="${uniqueId}"]`)
        );

        const containerData: ContainerOrderType = {};

        containers.forEach(container => {
          const containerId = container.id;
          const childElements = Array.from(
            container.querySelectorAll('[data-item-id]'),
          ).map(element => element.getAttribute('data-item-id'));
          
          // Store this container's data in the object
          containerData[containerId] = childElements;
        });

        if (
          Object.keys(containerData).length && Object.values(containerData).some(arr => arr.length)&&
          movedId !== undefined &&
          movedId !== null &&
          getOrder
        ) {
          getOrder(containerData, movedId);
        }
      });
    },
    [],
  );

  useImperativeHandle(ref, () => ({
    reOrder: ({ itemId, toIndex, toListId }: ReOrderProps) => {

      const containerEls = document.querySelectorAll(`[data-provider-id="${uniqueId}"]`);
      let fromListId = null;

      console.log("Container elements:", containerEls);
      console.log("ItemId:", itemId);
      
      containerEls.forEach(container => {
        const draggableItem = container.querySelector(`[data-item-id="${itemId}"]`)

        if(draggableItem){
          console.log("Found draggable item:", draggableItem.getAttribute("data-parent-container-id"));
        }
      })
      
      // Result

      // move(
      //   fromListId,
      //   toListId || fromListId,
      //   itemId,
      //   toIndex !== undefined && toIndex !== null
      //     ? toIndex
      //     : lists[fromListId].length,
      // );
    },
  }));

  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const numberOfLists = Object.keys(lists).length;
  const providerGuid = useRef(guid()).current;
  const uniqueId = providerId || providerGuid;

  const lastMoveRef = useRef<{
    indexOfTarget: null | number;
    destinationId: null | string | number;
    targetContainerId: null | string | number;
    destinationContainerId: null | string | number;
  }>({
    indexOfTarget: null,
    destinationId: null,
    targetContainerId: null,
    destinationContainerId: null,
  });

  useEffect(() => {
    const cleanup = combine(
      monitorForElements({
        canMonitor({ source }) {
          const element = document.querySelector(
            `[data-item-id="${source.data.itemId}"]`
          );
          const sourceProviderId = element?.closest('[data-provider-id]')?.getAttribute('data-provider-id');
          
          // provider is only allowed to monitor when there are multiple draggable containers and the source provider is the same as the current provider
          return isDraggableItemData(source.data) && numberOfLists > 1 && sourceProviderId === uniqueId;
        },
        ...(dragType === "continuous" && { onDropTargetChange({ location, source }) {
          const target = location.current.dropTargets[0]
          if (target) {
            // initial data extraction
            const indexOfTarget = Number(target.data.itemIndex);
            const destinationId = source.data.itemId as string | number;
            const element = document.querySelector(
              `[data-item-id="${destinationId}"]`,
            );
            const destinationContainer =
              (element?.getAttribute("data-parent-container-id") as string) ||
              (source.data.parentContainerId as string);


            // onDropTargetChange will typically listen to any drop target change, this ensures that the provider is only listening to, and making changes to 
            // containers which are within the scope of its own provider. Although unlikely to happen, this adds an extra blanket layer of security for
            // instances where multiple providers are present on the same page, or there is a provider with other non-provider containers rendered
            // this may be a possible pattern with MFE use.
            const providerId = element?.parentElement?.getAttribute("data-provider-id");
            if(!providerId){
              return;
            }

            const targetContainer = target.data.parentContainerId as string;

            // container state updates
            if (
              targetContainer !== undefined &&
              targetContainer !== null &&
              destinationContainer !== undefined &&
              destinationContainer !== null &&
              targetContainer !== destinationContainer
            ) {
              setContainerDragState((prevState) => {
                if (
                  prevState.draggingBetweenContainers !== true ||
                  prevState.targetContainerId !== targetContainer
                ) {
                  return {
                    draggingBetweenContainers: true,
                    targetContainerId: targetContainer,
                  };
                }
                return prevState;
              });
            }

            // typical move into the same container
            if (
              !Number.isNaN(indexOfTarget) &&
              indexOfTarget >= 0 &&
              destinationId !== undefined &&
              destinationId !== null
            ) {
              if (
                lastMoveRef.current.indexOfTarget !== indexOfTarget ||
                lastMoveRef.current.destinationId !== destinationId ||
                lastMoveRef.current.destinationContainerId !==
                  destinationContainer ||
                lastMoveRef.current.targetContainerId !== targetContainer
              ) {

                console.log("TEST 1")

                move(
                  destinationContainer,
                  targetContainer,
                  destinationId,
                  indexOfTarget,
                );
                lastMoveRef.current = {
                  indexOfTarget,
                  destinationId,
                  targetContainerId: targetContainer,
                  destinationContainerId: destinationContainer,
                };
              }
              // move into a different container where no initial item drop zones are present
              // (can be an empty container, or just dragged to somewhere on the container where an item is not present)
            } else if (
              destinationId !== undefined &&
              destinationId !== null &&
              target.element.id !== undefined &&
              target.element.id !== null
            ) {
              const emptyTargetId = target.element.id;
              const isEmptyList =
                emptyTargetId in lists &&
                Array.isArray(lists[emptyTargetId]) &&
                lists[emptyTargetId].length === 0;
              // if the container is empty, it will move to the top of the container, as the first item
              if (isEmptyList) {
                console.log("TEST 2")
                move(destinationContainer, emptyTargetId, destinationId, 0);
                lastMoveRef.current = {
                  indexOfTarget: 0,
                  destinationId,
                  targetContainerId: emptyTargetId,
                  destinationContainerId: destinationContainer,
                };
              } else{
                console.log("TEST 3")
                // if the container is not empty, it will move to the bottom of the container, as the last item
                move(destinationContainer, emptyTargetId, destinationId, lists[emptyTargetId].length);
                lastMoveRef.current = {
                  indexOfTarget: lists[emptyTargetId].length,
                  destinationId,
                  targetContainerId: emptyTargetId,
                  destinationContainerId: destinationContainer,
                }

              }
            }
          }
        }}),
        onDrop({ location, source }) {
          if(dragType === "onDrop"){
            const target = location.current.dropTargets[0]
            if (target) {
              // initial data extraction
              const indexOfTarget = Number(target.data.itemIndex);
              const destinationId = source.data.itemId as string | number;
              const element = document.querySelector(
                `[data-item-id="${destinationId}"]`,
              );
              const destinationContainer =
                (element?.getAttribute("data-parent-container-id") as string) ||
                (source.data.parentContainerId as string);
  
  
              // onDropTargetChange will typically listen to any drop target change, this ensures that the provider is only listening to, and making changes to 
              // containers which are within the scope of its own provider. Although unlikely to happen, this adds an extra blanket layer of security for
              // instances where multiple providers are present on the same page, or there is a provider with other non-provider containers rendered
              // this may be a possible pattern with MFE use.
          
              const targetContainer = target.data.parentContainerId as string;
  
              // container state updates
              if (
                targetContainer !== undefined &&
                targetContainer !== null &&
                destinationContainer !== undefined &&
                destinationContainer !== null &&
                targetContainer !== destinationContainer
              ) {
                setContainerDragState((prevState) => {
                  if (
                    prevState.draggingBetweenContainers !== true ||
                    prevState.targetContainerId !== targetContainer
                  ) {
                    return {
                      draggingBetweenContainers: true,
                      targetContainerId: targetContainer,
                    };
                  }
                  return prevState;
                });
              }
  
              // typical move into the same container
              if (
                !Number.isNaN(indexOfTarget) &&
                indexOfTarget >= 0 &&
                destinationId !== undefined &&
                destinationId !== null
              ) {
                console.log("TEST 4")
                  move(
                    destinationContainer,
                    targetContainer,
                    destinationId,
                    indexOfTarget,
                  );
                
                // move into a different container where no initial item drop zones are present
                // (can be an empty container, or just dragged to somewhere on the container where an item is not present)
              } else if (
                destinationId !== undefined &&
                destinationId !== null &&
                target.element.id !== undefined &&
                target.element.id !== null
              ) {
                const emptyTargetId = target.element.id;
                const isEmptyList =
                  emptyTargetId in lists &&
                  Array.isArray(lists[emptyTargetId]) &&
                  lists[emptyTargetId].length === 0;
                // if the container is empty, it will move to the top of the container, as the first item
                if (isEmptyList) {
                  console.log("TEST 5")
                  move(destinationContainer, emptyTargetId, destinationId, 0);
                } else{
                  console.log("TEST 6")
                  // if the container is not empty, it will move to the bottom of the container, as the last item
                  move(destinationContainer, emptyTargetId, destinationId, lists[emptyTargetId].length);
                }
              }
            }
          }

          setContainerDragState({
            draggingBetweenContainers: false,
            targetContainerId: null,
          });
          lastMoveRef.current = {
            indexOfTarget: null,
            destinationId: null,
            targetContainerId: null,
            destinationContainerId: null,
          };
        },
      }),
    );

    return () => cleanup();
  }, [move, lists, numberOfLists, dragType]);

 return (
    <DraggableProviderContext.Provider
      value={{ register, move, lists, setClosestEdge, containerDragState, uniqueId  }}
    >
      {children}
    </DraggableProviderContext.Provider>
  );
});

export default DraggableProvider;
