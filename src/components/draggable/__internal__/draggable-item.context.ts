import { createContext, RefCallback } from "react";

interface DraggableItemContextProps {
  /** Enables a component's built-in draggable presentation. */
  isDraggable: boolean;
  /** Registers the component's built-in handle as the native drag source. */
  registerDragHandle: RefCallback<HTMLElement>;
  /** Registers the outer surface used by the ghost, preview and drop indicator. */
  registerSurface: RefCallback<HTMLElement>;
  index: number;
  itemCount: number;
  moveTo: (index: number) => void;
}

const DraggableItemContext = createContext<DraggableItemContextProps | null>(
  null,
);

export default DraggableItemContext;
