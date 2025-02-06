import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { isDraggableItemData, Edge } from "./__internal__/draggable-utils";
import DraggableProviderContext from './draggable-provider-context';

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

const DraggableProvider = forwardRef<DraggableProviderHandle, DraggableProviderType>(({ children }, ref) => {
  const [lists, setLists] = useState<Record<string, React.ReactNode[]>>({});
  const [containerDragState, setContainerDragState] = useState<ContainerDragState>({});

  const register = useCallback((id: string | number, list: React.ReactNode[]) => {
    setLists((existingLists) => ({
      ...existingLists,
      [id]: list,
    }));
  }, []);

  const move = useCallback((fromListId: string | number, toListId: string | number, fromItemId: number | string, toItemId: number | string) => {   
    
    console.log("MOVE TRIGGERED")
    setLists((prevLists) => {
      const fromIndex = prevLists?.[fromListId].findIndex((item) => React.isValidElement(item) && item.props.children.props.id === fromItemId);
      const toIndex = prevLists?.[toListId].findIndex((item) => React.isValidElement(item) && item.props.children.props.id === toItemId);
  
      const copy = { ...prevLists };
      const [nodeToMove] = copy[fromListId].splice(fromIndex, 1);
      copy[toListId].splice(toIndex, 0, nodeToMove);
      return copy;
    });
  }, []);

  useImperativeHandle(ref, () => ({
    reOrder: ({ itemId, toIndex, toListId }: ReOrderProps) => {
      const fromListId = document.querySelector(`[data-item-id="${itemId}"]`)?.getAttribute('data-parent-container-id');
      if (!fromListId) {
        return;
      }
      const fromIndex = lists[fromListId].findIndex((item) => React.isValidElement(item) && item.props.children.props.id === itemId);
      move(fromListId, toListId || fromListId, fromIndex, toIndex !== undefined && toIndex !== null ? toIndex : lists[fromListId].length);
    },
  }));

  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const numberOfLists = Object.keys(lists).length;

    const [testState, setTestState] = useState<{ value1?: string | number, value2?: string | number, value3?: string | number, value4?: string | number }>({
      value1: undefined,
      value2: undefined,
      value3: undefined,
      value4: undefined,
    });


    useEffect(() => {
      const { value1, value2, value3, value4 } = testState;

      console.log("STATE TRIGGERED")
    
      if (value1 !== undefined && value2 !== undefined && value1 !== value2) {
        const fromListId = value3 as string;
        const toListId = value4 !== undefined && value3 !== value4 ? value4 as string : fromListId;
        move(fromListId, toListId, value1 as number | string, value2 as number | string);
      }
    }, [testState, move]);


  return (
    <DraggableProviderContext.Provider value={{ register, move, lists, setClosestEdge, containerDragState, setTestState, testState }}>
      {children}
    </DraggableProviderContext.Provider>
  );
});

export default DraggableProvider;