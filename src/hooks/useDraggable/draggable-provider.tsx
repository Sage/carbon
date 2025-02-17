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

  const move = useCallback((fromListId: string | number, toListId: string | number, fromIndex: number, toIndex: number) => {
    setLists((prevLists) => {
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

  useEffect(() => {
    const cleanup = monitorForElements({
      canMonitor({ source }) {
        return isDraggableItemData(source.data);
      },
      onDropTargetChange({ location, source }) {

        const target = location.current.dropTargets[0];
        const toListId = target.element.id;
        const lengthOfDestination = lists[toListId]?.length;


        if(lengthOfDestination === 0){
          setContainerDragState({ draggingBetweenContainers: true, targetContainerId: toListId });
        } else {

        const fromContainerId = String(source.data.parentContainerId);
        const toContainerId = String(location.current.dropTargets[0].data.parentContainerId);

        if (fromContainerId === toContainerId) {
   
          setContainerDragState({ draggingBetweenContainers: false, targetContainerId: null });
        } else {
          setContainerDragState({ draggingBetweenContainers: true, targetContainerId: toContainerId });
         }
        }
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;
        
          const fromListId = sourceData.parentContainerId as string;
          const toListId = target.element.id;
          const lengthOfDestination = lists[toListId]?.length;
          const itemId = sourceData.itemId;
          const fromIndex = lists?.[fromListId].findIndex((item) => React.isValidElement(item) && item.props.children.props.id === itemId);


          if(lengthOfDestination === 0){
            
            move(fromListId!, toListId, fromIndex, 0);
            setContainerDragState({ draggingBetweenContainers: false, targetContainerId: null });
            return;
          }
      
        if (
          !isDraggableItemData(sourceData) ||
          !isDraggableItemData(targetData)
        ) {
          return;
        }
        const indexOfSource = Number(sourceData.itemIndex);
        const indexOfTarget = Number(targetData.itemIndex);
        const targetContainerIndex = targetData.parentContainerId;
        const destinationTargetIndex = sourceData.parentContainerId;
        const containerLength = lists?.[targetContainerIndex].length;

        if (indexOfTarget < 0 || indexOfSource < 0) {
          return;
        }

        const finalIndexOfTarget = ()  => { 
          if(indexOfTarget + 1 === containerLength){
            return closestEdge === "bottom" ? indexOfTarget + 1 : indexOfTarget;
          } 

          if(closestEdge === "top"){
            return indexOfTarget - indexOfSource >=1 ? indexOfTarget -1 : indexOfTarget;
          }
            return closestEdge === "bottom" && indexOfSource - indexOfTarget === 1 ? indexOfSource : indexOfTarget;
          
        }

        if(numberOfLists > 1){
        move(destinationTargetIndex, targetContainerIndex, indexOfSource, finalIndexOfTarget());
        setContainerDragState({ draggingBetweenContainers: false, targetContainerId: null });
        }
      },
    });
  
    return () => {
      cleanup();
    };
  }, [lists, move, closestEdge, setContainerDragState]);

  return (
    <DraggableProviderContext.Provider value={{ register, move, lists, setClosestEdge, containerDragState }}>
      {children}
    </DraggableProviderContext.Provider>
  );
});

export default DraggableProvider;