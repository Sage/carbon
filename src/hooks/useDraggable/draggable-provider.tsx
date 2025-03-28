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
  const providerGuid = useRef(guid()).current;
  const uniqueId = providerId || providerGuid;
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

  // Memoize the getContainerData callback to reduce unnecessary recalculations
  const getContainerData = useCallback((uniqueId) => {
    const containers = Array.from(
      document.querySelectorAll(`[data-provider-id="${uniqueId}"]`)
    );

    const containerData: ContainerOrderType = {};

    containers.forEach(container => {
      const containerId = container.id;
      const childElements = Array.from(
        container.querySelectorAll('[data-item-id]'),
      ).map(element => element.getAttribute('data-item-id'));
      
      containerData[containerId] = childElements;
    });

    return containerData;
  }, []);

  const move = useCallback(
    (
      fromListId: string | number,
      toListId: string | number,
      destinationId: number | string,
      toIndex: number,
    ) => {
      // Early return for invalid inputs
      if (fromListId === null || fromListId === undefined || 
          toListId === null || toListId === undefined || 
          destinationId === null || destinationId === undefined || 
          toIndex === null || toIndex === undefined) {
        return;
      }

      const elements = Array.from(
        document.querySelectorAll(
          `[data-provider-id="${uniqueId}"] [data-parent-container-id="${fromListId}"]`,
        ),
      );

      // Find item index once before state update
      const fromIndex = elements.findIndex(
        (item) => item.getAttribute("data-item-id") === destinationId,
      );
      
      // Avoid state update if the item isn't found
      if (fromIndex === -1) return;

      setLists((prevLists) => {
        const copy = { ...prevLists };
        
        // Check if lists exist before manipulating them
        if (!copy[fromListId] || !copy[toListId]) return prevLists;
        
        const [nodeToMove] = copy[fromListId].splice(fromIndex, 1);
        copy[toListId].splice(toIndex, 0, nodeToMove);
        return copy;
      });

      // Get the moved ID outside the state update
      const movedId = elements.find(element => element.getAttribute('data-item-id') === destinationId)?.getAttribute("data-item-id");
      
      // Only proceed if we actually have a moved ID
      if (movedId === undefined || movedId === null) return;
      
      // Use requestAnimationFrame to batch DOM reads
      requestAnimationFrame(() => {
        const containerData = getContainerData(uniqueId);
        
        if (
          Object.keys(containerData).length && 
          Object.values(containerData).some(arr => arr.length) &&
          getOrder
        ) {
          getOrder(containerData, movedId);
        }
      });
    },
    [getContainerData, uniqueId, getOrder],
  );

  const [testState, setTestState] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    reOrder: ({ itemId, toIndex, toListId }: ReOrderProps) => {
      const containerEls = document.querySelectorAll(`[data-provider-id="${uniqueId}"]`);
      
      // Find the first container with the item
      let targetContainer = null;
      let draggableItem = null;
      
      for (const container of containerEls) {
        const item = container.querySelector(`[data-item-id="${itemId}"]`);
        if (item) {
          draggableItem = item;
          targetContainer = container;
          break;
        }
      }
      
      if (draggableItem) {
        const parentContainerId = draggableItem.getAttribute("data-parent-container-id") as string;
        move(
          parentContainerId,
          toListId || parentContainerId,
          itemId,
          toIndex !== undefined && toIndex !== null
            ? toIndex
            : lists[parentContainerId]?.length || 0,
        );
      }
    },
  }), [move, lists, uniqueId]);

  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const numberOfLists = Object.keys(lists).length;

  // Track the last move operation to prevent redundant updates
  const lastMoveRef = useRef<{
    indexOfTarget: null | number;
    destinationId: null | string | number;
    targetContainerId: null | string | number;
    destinationContainerId: null | string | number;
    timestamp: number;
  }>({
    indexOfTarget: null,
    destinationId: null,
    targetContainerId: null,
    destinationContainerId: null,
    timestamp: 0,
  });

  // Helper function to process movement operations
  const processMoveOperation = useCallback((target, source) => {
    if (!target) return false;
    
    // Extract data
    const indexOfTarget = Number(target.data.itemIndex);
    const destinationId = source.data.itemId as string | number;
    
    // Find the element
    const element = document.querySelector(`[data-item-id="${destinationId}"]`);
    if (!element) return false;
    
    const providerId = element.parentElement?.getAttribute("data-provider-id");
    if (!providerId) return false;
    
    const destinationContainer = element.getAttribute("data-parent-container-id") as string || 
                                source.data.parentContainerId as string;
    
    const targetContainer = target.data.parentContainerId as string;
    
    // Update container state if dragging between containers
    if (
      targetContainer !== undefined &&
      targetContainer !== null &&
      destinationContainer !== undefined &&
      destinationContainer !== null &&
      targetContainer !== destinationContainer
    ) {
      setContainerDragState({
        draggingBetweenContainers: true,
        targetContainerId: targetContainer,
      });
    }
    
    const currentTime = Date.now();
    // Debounce moves to prevent double firing - 50ms threshold
    const timeSinceLastMove = currentTime - lastMoveRef.current.timestamp;
    const isSameMove = 
      lastMoveRef.current.indexOfTarget === indexOfTarget &&
      lastMoveRef.current.destinationId === destinationId &&
      lastMoveRef.current.targetContainerId === targetContainer &&
      lastMoveRef.current.destinationContainerId === destinationContainer;
    
    if (isSameMove && timeSinceLastMove < 50) {
      return false;
    }
    
    // Handle move to an item position
    if (
      !Number.isNaN(indexOfTarget) &&
      indexOfTarget >= 0 &&
      destinationId !== undefined &&
      destinationId !== null
    ) {
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
        timestamp: currentTime,
      };
      
      return true;
    } 
    // Handle move to a container (not an item)
    else if (
      destinationId !== undefined &&
      destinationId !== null &&
      target.element.id !== undefined &&
      target.element.id !== null
    ) {
      const emptyTargetId = target.element.id;
      
      // Check if the list exists and is empty
      const targetList = lists[emptyTargetId];
      const isEmptyList = targetList && Array.isArray(targetList) && targetList.length === 0;
      
      // Move to appropriate position based on container state
      if (isEmptyList) {
        move(destinationContainer, emptyTargetId, destinationId, 0);
      } else if (targetList) {
        move(destinationContainer, emptyTargetId, destinationId, targetList.length);
      }
      
      lastMoveRef.current = {
        indexOfTarget: isEmptyList ? 0 : (targetList?.length || 0),
        destinationId,
        targetContainerId: emptyTargetId,
        destinationContainerId: destinationContainer,
        timestamp: currentTime,
      };
      
      return true;
    }
    
    return false;
  }, [move, lists]);

  useEffect(() => {
    const cleanup = combine(
      monitorForElements({
        canMonitor({ source }) {
          // Only monitor when there are multiple draggable containers and source provider matches
          return isDraggableItemData(source.data) && numberOfLists > 1;
        },
        ...(dragType === "continuous" && { 
          onDropTargetChange({ location, source }) {
            const target = location.current.dropTargets[0];
            processMoveOperation(target, source);
          }
        }),
        onDrop({ location, source }) {
          if (dragType === "onDrop") {
            const target = location.current.dropTargets[0];
            processMoveOperation(target, source);
          }

          // Reset state after drop
          setContainerDragState({
            draggingBetweenContainers: false,
            targetContainerId: null,
          });
          
          lastMoveRef.current = {
            indexOfTarget: null,
            destinationId: null,
            targetContainerId: null,
            destinationContainerId: null,
            timestamp: Date.now(),
          };
        },
      }),
    );

    return () => cleanup();
  }, [processMoveOperation, lists, numberOfLists, dragType]);

 return (
    <DraggableProviderContext.Provider
      value={{ register, move, lists, setClosestEdge, containerDragState, uniqueId }}
    >
      {children}
    </DraggableProviderContext.Provider>
  );
});

export default DraggableProvider;