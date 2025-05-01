import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  DropTargetRecord,
  ElementDragPayload,
} from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import guid from "../../__internal__/utils/helpers/guid";
import { isDraggableItemData } from "../../__internal__/draggable/draggable-utils";
import DraggableProviderContext from "./draggable-provider-context";

export type ContainerOrderType = Record<
  string | number,
  (string | number | null)[]
>;

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
  itemId: number | string;
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
>(({ children, providerId, dragType = "continuous", getOrder }, ref) => {
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
  const getContainerData = useCallback((passedUniqueId: string | number) => {
    const containers = Array.from(
      document.querySelectorAll(`[data-provider-id="${passedUniqueId}"]`),
    );

    const containerData: ContainerOrderType = {};

    containers.forEach((container) => {
      const containerId = container.id;
      const childElements = Array.from(
        container.querySelectorAll("[data-item-id]"),
      ).map((element) => element.getAttribute("data-item-id"));

      containerData[containerId] = childElements;
    });

    return containerData;
  }, []);

    // Track the last move operation to prevent redundant updates
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

  const move = useCallback(
    (
      fromListId: string | number,
      toListId: string | number,
      destinationId: number | string,
      toIndex: number,
    ) => {
      // Early return for invalid inputs
      if (
        fromListId === null ||
        fromListId === undefined ||
        toListId === null ||
        toListId === undefined ||
        destinationId === null ||
        destinationId === undefined ||
        toIndex === null ||
        toIndex === undefined
      ) {
        return;
      }

      // set a ref based on passed values


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

      // Logging previous move data for reference
console.log("Previous move:", {
  fromList: lastMoveRef.current.destinationContainerId,
  toList: lastMoveRef.current.targetContainerId,
  itemId: lastMoveRef.current.destinationId,
  toIndex: lastMoveRef.current.indexOfTarget
});

console.log("Current move:", {
  fromList: fromListId,
  toList: toListId,
  itemId: destinationId,
  toIndex,
});

// Different source container
const differentSourceContainer = lastMoveRef.current.destinationContainerId !== fromListId;
console.log("Different source container?", differentSourceContainer);

// Different target container
const differentTargetContainer = lastMoveRef.current.targetContainerId !== toListId;
console.log("Different target container?", differentTargetContainer);

// Different item being moved
const differentItem = lastMoveRef.current.destinationId !== destinationId;
console.log("Different item?", differentItem);

// Different target index
const differentIndex = lastMoveRef.current.indexOfTarget !== toIndex;
console.log("Different target index?", differentIndex);

// Same container move with either different item or different index
const sameContainersDifferentMove = (
  lastMoveRef.current.destinationContainerId === fromListId &&
  lastMoveRef.current.targetContainerId === toListId && 
  (differentItem || differentIndex)
);
console.log("Same containers but different item/index?", sameContainersDifferentMove);

// A move is valid if ANY of these conditions are true
if(differentSourceContainer || 
   differentTargetContainer || 
   sameContainersDifferentMove) {
  
  console.log("MOVE ALLOWED: Different enough from previous move");

  setLists((prevLists) => {
    const copy = { ...prevLists };

    // Check if lists exist before manipulating them
    if (!copy[fromListId] || !copy[toListId]) return prevLists;

    const [nodeToMove] = copy[fromListId].splice(fromIndex, 1);
    copy[toListId].splice(toIndex, 0, nodeToMove);
    return copy;
  });


  lastMoveRef.current = {
    indexOfTarget: toIndex,
    destinationId,
    targetContainerId: toListId,
    destinationContainerId: fromListId,
  }
} else {
  console.log("MOVE BLOCKED: Duplicate of previous move");
  // Block the move
}

      // Get the moved ID outside the state update
      const movedId = elements
        .find(
          (element) => element.getAttribute("data-item-id") === destinationId,
        )
        ?.getAttribute("data-item-id");

      // Only proceed if we actually have a moved ID
      if (movedId === undefined || movedId === null) return;

      // Use requestAnimationFrame to batch DOM reads
      requestAnimationFrame(() => {
        const containerData = getContainerData(uniqueId);

        if (
          Object.keys(containerData).length &&
          Object.values(containerData).some((arr) => arr.length) &&
          getOrder
        ) {
          getOrder(containerData, movedId);
        }
      });
    },
    [getContainerData, uniqueId, getOrder],
  );

  useImperativeHandle(
    ref,
    () => ({
      reOrder: ({ itemId, toIndex, toListId }: ReOrderProps) => {
        const containerEls = document.querySelectorAll(
          `[data-provider-id="${uniqueId}"]`,
        );

        let draggableItem = null;

        for (const container of containerEls) {
          const item = container.querySelector(`[data-item-id="${itemId}"]`);
          if (item) {
            draggableItem = item;
            break;
          }
        }

        if (draggableItem) {
          const parentContainerId = draggableItem.getAttribute(
            "data-parent-container-id",
          ) as string;
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
    }),
    [move, lists, uniqueId],
  );

  const numberOfLists = Object.keys(lists).length;

  // Helper function to process movement operations
  const processMoveOperation = useCallback(
    (target: DropTargetRecord, source: ElementDragPayload) => {
      if (!target) return false;

      // Extract data
      const indexOfTarget = Number(target.data.itemIndex);
      const destinationId = source.data.itemId as string | number;

      // Find the element
      const element = document.querySelector(
        `[data-item-id="${destinationId}"]`,
      );
      if (!element) return false;

      const locatedProviderId =
        element.parentElement?.getAttribute("data-provider-id");
      if (!locatedProviderId) return false;

      const destinationContainer =
        (element.getAttribute("data-parent-container-id") as string) ||
        (source.data.parentContainerId as string);

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
        const isEmptyList =
          targetList && Array.isArray(targetList) && targetList.length === 0;

        // Move to appropriate position based on container state
        if (isEmptyList) {
          move(destinationContainer, emptyTargetId, destinationId, 0);
        } else if (targetList) {
          move(
            destinationContainer,
            emptyTargetId,
            destinationId,
            targetList.length,
          );
        }

        return true;
      }

      return false;
    },
    [move, lists],
  );

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
          },
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

          lastMoveRef.current= {
            indexOfTarget: null,
            destinationId: null,
            targetContainerId: null,
            destinationContainerId: null,
          }
        },
      }),
    );

    return () => cleanup();
  }, [processMoveOperation, lists, numberOfLists, dragType]);

  return (
    <DraggableProviderContext.Provider
      value={{ register, move, lists, containerDragState, uniqueId }}
    >
      {children}
    </DraggableProviderContext.Provider>
  );
});

export default DraggableProvider;
