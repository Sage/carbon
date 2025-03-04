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
import { isDraggableItemData, Edge } from "./__internal__/draggable-utils";
import DraggableProviderContext from "./draggable-provider-context";

interface DraggableProviderType {
  children: React.ReactNode;
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
>(({ children }, ref) => {
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
      destinationId: number| string,
      toIndex: number,
    ) => {
      setLists((prevLists) => {

               const elements = Array.from(
                  document.querySelectorAll(
                    `[data-parent-container-id="${fromListId}"]`,
                  ),
                );
            
                const fromIndex = elements.findIndex(
                  (item) => item.getAttribute("data-item-id") === destinationId,
                );

        const copy = { ...prevLists };
        const [nodeToMove] = copy[fromListId].splice(fromIndex, 1);
        copy[toListId].splice(toIndex, 0, nodeToMove);
        return copy;
      });
    },
    [],
  );

  useImperativeHandle(ref, () => ({
    reOrder: ({ itemId, toIndex, toListId }: ReOrderProps) => {
      const fromListId = document
        .querySelector(`[data-item-id="${itemId}"]`)
        ?.getAttribute("data-parent-container-id");
      if (!fromListId) {
        return;
      }
      const fromIndex = lists[fromListId].findIndex(
        (item) =>
          React.isValidElement(item) && item.props.children.props.id === itemId,
      );
      move(
        fromListId,
        toListId || fromListId,
        fromIndex,
        toIndex !== undefined && toIndex !== null
          ? toIndex
          : lists[fromListId].length,
      );
    },
  }));

  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const numberOfLists = Object.keys(lists).length;

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


    // need to find a way to smoothly handle the moving between containers

    useEffect(() => {
      const cleanup = combine(
        monitorForElements({
          canMonitor({ source }) {
            return (
              isDraggableItemData(source.data))
          },
          onDropTargetChange({ location, source }) {
            const target = location.current.dropTargets[0];
            if (target) {
              const indexOfTarget = Number(target.data.itemIndex);
              const destinationId = source.data.itemId as string | number;
              const destinationContainer = source.data.parentContainerId as string;
              const targetContainer = target.data.parentContainerId as string;

              if (
                !Number.isNaN(indexOfTarget) &&
                indexOfTarget >= 0 &&
                destinationId !== undefined &&
                destinationId !== null
              ) {
                if (
                  lastMoveRef.current.indexOfTarget !== indexOfTarget ||
                  lastMoveRef.current.destinationId !== destinationId 
                  || lastMoveRef.current.destinationContainerId !== destinationContainer
                  || lastMoveRef.current.targetContainerId !== targetContainer
                ) {

                  if(lastMoveRef.current.destinationContainerId !== lastMoveRef.current.targetContainerId) {
                    const element = document.querySelector(`[data-item-id="${destinationId}"]`);
                    const updatedId = element?.getAttribute("data-parent-container-id");
                    move(updatedId as string, targetContainer, destinationId, indexOfTarget);
                  } else {
                    move(destinationContainer, targetContainer, destinationId, indexOfTarget);
                  }
                  lastMoveRef.current = { indexOfTarget, destinationId, targetContainerId: targetContainer, destinationContainerId: destinationContainer };
                }
              }
            }
          },
          onDrop: () =>
            (lastMoveRef.current = {
              indexOfTarget: null,
              destinationId: null,
              targetContainerId: null,
              destinationContainerId: null,
            }),
        }),
      );

      return () => cleanup();
    }, [move]);

  return (
    <DraggableProviderContext.Provider
      value={{ register, move, lists, setClosestEdge, containerDragState }}
    >
          {children}
    </DraggableProviderContext.Provider>
  );
});

export default DraggableProvider;
