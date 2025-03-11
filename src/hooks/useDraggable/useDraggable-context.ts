import { createContext } from "react";
import { DragState } from "../../__internal__/draggable/draggable-utils";

interface UseDraggableContextType {
  setDragState?: React.Dispatch<React.SetStateAction<DragState>>;
}

const UseDraggableContext = createContext<UseDraggableContextType>(
  {},
);

export default UseDraggableContext;
