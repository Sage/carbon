import { createContext } from "react";

interface DraggableContainerContextType {
  columnId: string | number;
  dragType?: "continuous" | "onDrop";
}

const DraggableContainerContext = createContext<DraggableContainerContextType>({
  columnId: "",
  dragType: undefined,
});

export default DraggableContainerContext;
