import { createContext, RefCallback } from "react";

interface DraggableItemContextProps {
  /** Enables a component's built-in draggable presentation. */
  isDraggable: boolean;
  /** Registers the component's built-in handle as the native drag source. */
  registerDragHandle: RefCallback<HTMLElement>;
  /** Registers the outer surface used by the ghost, preview and drop indicator. */
  registerSurface: RefCallback<HTMLElement>;
  /** The index of the draggable item within its container. */
  index: number;
  /** The total number of draggable items within the container. */
  itemCount: number;
  /** Moves the draggable item to a new index within its container. */
  moveTo: (index: number) => void;
}

const DraggableItemContext = createContext<DraggableItemContextProps | null>(
  null,
);

export default DraggableItemContext;
