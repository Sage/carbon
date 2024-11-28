import React from "react";

type Edge = "top" | "right" | "bottom" | "left";

export type DragState =
  | { type: "idle" }
  | { type: "preview"; container: HTMLElement }
  | { type: "is-dragging" }
  | { type: "is-dragging-over"; closestEdge: Edge | null };

export type DraggableContextType = {
  dragState?: DragState;
  setDragState?: React.Dispatch<React.SetStateAction<DragState>>;
  draggableItemIds?: (string | number)[]; 
  setDraggableItemIds?: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  movedItemId?: string | number;
  setMovedItemId?: React.Dispatch<React.SetStateAction<string | number | undefined>>;
};

const DraggableContext = React.createContext<DraggableContextType>({});

export default DraggableContext;
