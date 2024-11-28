import React, { useState } from "react";
import DraggableContext, { DragState, DraggableContextType } from "./draggable-context";

export const DraggableProvider = ({ children }: { children: React.ReactNode }) => {
  const [dragState, setDragState] = useState<DragState>({ type: "idle" });
  const [draggableItemIds, setDraggableItemIds] = useState<(string | number)[]>([]);
  const [movedItemId, setMovedItemId] = useState<string | number | undefined>(undefined);

  // Combine state and setters in a value object
  const value: DraggableContextType = {
    dragState,
    draggableItemIds,
    movedItemId,
    setDragState,
    setDraggableItemIds,
    setMovedItemId,
  };

  return <DraggableContext.Provider value={value}>{children}</DraggableContext.Provider>;
};