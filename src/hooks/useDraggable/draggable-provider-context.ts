import { createContext } from 'react';
import { Edge } from './__internal__/draggable-utils';


interface DraggableProviderContextType {
  register?: (id: string | number, list: React.ReactNode[]) => void;
  move?: (fromListId: string | number, toListId: string | number, fromIndex: number, toIndex: number) => void;
  lists?: Record<string, React.ReactNode[]>;
  setClosestEdge?: React.Dispatch<React.SetStateAction<Edge | null>>;
}

const DraggableProviderContext = createContext<DraggableProviderContextType>({});

export default DraggableProviderContext;