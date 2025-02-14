import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { isDraggableItemData, Edge } from "./__internal__/draggable-utils";
import DraggableProviderContext from './draggable-provider-context';
import useDebounce from '../../hooks/__internal__/useDebounce';
import { fr } from 'date-fns/locale';

import { throttle } from 'lodash';


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

  const findIndexById = (nodes: React.ReactNode[], targetId: string): number => {
    return nodes.findIndex(node => {
      if (React.isValidElement(node)) {
        if ('id' in node.props) {
          return node.props.id === targetId;
        }
        if (node.props.children && React.isValidElement(node.props.children)) {
          return node.props.children.props.id === targetId;
        }
      }
      return false;
    });
  };

  const moveCallBack = useCallback((
    fromListId: string | number, 
    toListId: string | number, 
    fromItemId: number | string, 
    toItemId: number | string
  ) => {

    console.log("move callback triggered", fromListId, toListId, fromItemId, toItemId);

    if(!(fromListId || toListId || fromItemId || toItemId)){
      return;
    }

    setLists((prevLists) => {
      
      const fromIndex = findIndexById(prevLists?.[fromListId], String(fromItemId));
      const toIndex = findIndexById(prevLists?.[toListId], String(toItemId));
            
      const copy = { ...prevLists };
      const [nodeToMove] = copy[fromListId].splice(fromIndex, 1);
            
      copy[toListId].splice(toIndex, 0, nodeToMove);
      return copy;
    });
  
    const element = document.getElementById(fromItemId as string);
    if (element) {
      element.style.opacity = "0";
      setTimeout(() => {
        element.style.opacity = "1";
      }, 100);
    }
  }, []);

  const move = useDebounce(moveCallBack, 200);

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

    // useEffect(() => {
    //   const cleanup = monitorForElements({
    //     canMonitor({ source }) {
    //       return isDraggableItemData(source.data);
    //     },
    //     // onDrag({ source, location }) {
    //     //   const containerId = location.current.dropTargets[0]?.element.getAttribute('data-parent-container-id') || source.data.parentContainerId;
    //     //   setContainerDragState({ draggingBetweenContainers: true, targetContainerId: containerId as string });
    //     // },
    //     onDrop() {
    //       setContainerDragState({ draggingBetweenContainers: false, targetContainerId: null });
    //     },
    //     onDropTargetChange({ location, source }) {
    //       const target = location.current.dropTargets[0];
    //       if (target) {
    //         const fromListId = source.data.parentContainerId as string;
    //         const toListIdEmpty = target.element.id;    
    //         if (toListIdEmpty) {
    //           const destinationContainer = document.querySelector(`#${toListIdEmpty}[data-element="use-draggable-container"]`);
    //           if (destinationContainer && destinationContainer.children.length === 0) {
    //               move(fromListId, toListIdEmpty, source.data.itemId as string, 0);
    //               setTestState({ value1: undefined, value2: undefined, value3: undefined, value4: undefined });
    //           }
    //         } 
    //       }
    //     },
    //   });
    //   return () => {
    //     cleanup();
    //   };
    // }, [move, setContainerDragState, setTestState]);


const lastProcessedStateRef = useRef<string | null>(null);
const [newContainer, setNewContainer] = useState<{ card1: string | null, card2: string | null, newContainer: string | null }>({
  card1: null,
  card2: null,
  newContainer: null,
});

const testRef = useRef(false);

    useEffect(() => {
      
      const { value1, value2, value3, value4 } = testState;    
        const fromListId = value3 as string;
        const toListId = value4 as string;

        if(fromListId !== toListId){
          move(fromListId, toListId, value1 as number, value2 as number);
          setNewContainer({card1: value1, card2: value2, newContainer: toListId});
        } else {
          move(fromListId, toListId, value1 as number, value2 as number);
          setNewContainer({card1: value1, card2: value2, newContainer: fromListId});
        }        
          
    }, [testState, move]);


  return (
    <DraggableProviderContext.Provider value={{ register, move, lists, setClosestEdge, containerDragState, setTestState, testState, newContainer }}>
      {children}
    </DraggableProviderContext.Provider>
  );
});

export default DraggableProvider;