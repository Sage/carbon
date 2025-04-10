import { createContext } from "react";
import { ContainerDragState } from "./draggable-provider";

interface DraggableProviderContextType {
  register?: (id: string | number, list: React.ReactNode[]) => void;
  move?: (
    fromListId: string | number,
    toListId: string | number,
    fromIndex: number,
    toIndex: number,
  ) => void;
  lists?: Record<string, React.ReactNode[]>;
  containerDragState?: ContainerDragState;
  uniqueId?: string | number;
}

const DraggableProviderContext = createContext<DraggableProviderContextType>(
  {},
);

export default DraggableProviderContext;
