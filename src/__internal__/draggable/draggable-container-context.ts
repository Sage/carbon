import { createContext } from "react";

interface DraggableContainerContextType {
  columnId: string | number;
  localDraggedNode?: Element | null;
}

const DraggableContainerContext =
  createContext<DraggableContainerContextType | null>(null);

export default DraggableContainerContext;
