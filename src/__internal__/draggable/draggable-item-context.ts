import { createContext } from "react";

interface DraggableItemContextType {
  index: number;
}

const DraggableItemContext = createContext<DraggableItemContextType | null>(
  null,
);

export default DraggableItemContext;
