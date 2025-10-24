import React, { createContext, useContext, useEffect, useState } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { Draggable, DropTarget, isDraggable, isDropTarget } from "./data";

export interface DragDropProviderProps {
  children: React.ReactNode;
  /**
   * Callback fired when an item is dropped.
   *
   * Provides data about the dragged item and the drop target (if any) as arguments.
   */
  onDrop?: (args: { dragged: Draggable; target: DropTarget | null }) => void;
  /**
   * Callback fired when a dragged item leaves a drop target, or moves over a new one.
   *
   * Provides data about the dragged item and the drop target (if any) as arguments.
   */
  onDropTargetChange?: (args: {
    dragged: Draggable;
    target: DropTarget | null;
  }) => void;
}

type DragDropContextType = {
  /** Identifier of the context instance. */
  contextId: symbol;
};

const Context = createContext<DragDropContextType | null>(null);

function useDragDropContext() {
  return useContext(Context);
}

const DragDropProvider = ({
  children,
  onDrop,
  onDropTargetChange,
}: DragDropProviderProps) => {
  // Symbol guarantees a unique id for each DragDropProvider instance
  const [contextId] = useState(() => Symbol("drag-drop-provider-id"));

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) =>
        isDraggable(source.data) && source.data.contextId === contextId,
      onDrop: ({ source, location }) => {
        /* istanbul ignore if */
        if (!isDraggable(source.data)) {
          return;
        }

        if (!location.current.dropTargets.length) {
          // Dropped outside of any drop target
          onDrop?.({ dragged: source.data, target: null });
          return;
        }

        const innerMost = location.current.dropTargets[0];

        /* istanbul ignore if */
        if (!isDropTarget(innerMost.data)) {
          return;
        }

        // Dropped on a valid drop target
        onDrop?.({ dragged: source.data, target: innerMost.data });
      },
      onDropTargetChange: ({ source, location }) => {
        /* istanbul ignore if */
        if (!isDraggable(source.data)) {
          return;
        }

        if (!location.current.dropTargets.length) {
          // No longer over any drop target
          onDropTargetChange?.({ dragged: source.data, target: null });
          return;
        }

        const innerMost = location.current.dropTargets[0];

        /* istanbul ignore if */
        if (!isDropTarget(innerMost.data)) {
          return;
        }

        // Moved over a new drop target
        onDropTargetChange?.({ dragged: source.data, target: innerMost.data });
      },
    });
  }, [contextId, onDrop, onDropTargetChange]);

  return <Context.Provider value={{ contextId }}>{children}</Context.Provider>;
};

export { DragDropProvider, useDragDropContext };
