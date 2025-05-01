import { createContext } from "react";

interface DraggableContainerContextType {
  columnId: string | number;
  localDraggedNode?: Element | null;
  dragType?: "continuous" | "onDrop";
}

const DraggableContainerContext =
  createContext<DraggableContainerContextType>({
    columnId: "",
    localDraggedNode: null,
    dragType: undefined,
  });

export default DraggableContainerContext;
