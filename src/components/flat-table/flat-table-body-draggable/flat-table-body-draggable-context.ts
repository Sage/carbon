import { createContext } from "react";

interface FlatTableBodyDraggableContextType {
  isInFlatTableBodyDraggable: boolean;
}

const FlatTableBodyDraggableContext =
  createContext<FlatTableBodyDraggableContextType>({
    isInFlatTableBodyDraggable: false,
  });

export default FlatTableBodyDraggableContext;
