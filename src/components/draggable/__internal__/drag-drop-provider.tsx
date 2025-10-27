/* istanbul ignore file: Test with Playwright for better reliability */

import React, { createContext, useEffect } from "react";
import { Draggable, DropTarget, isDraggable, isDropTarget } from "./data";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export interface DragDropProviderProps {
  children: React.ReactNode;
  /**
   * Callback fired when an item is dropped.
   *
   * Provides data about the dragged item and the drop target (if any) as arguments.
   */
  onDrop?: (args: { dragged: Draggable; target: DropTarget | null }) => void;
}

type DragDropContextType = {
  /** Identifier of the context instance. */
  contextId: symbol;
};

const Context = createContext<DragDropContextType | null>(null);

export function useDragDropContext() {
  return React.useContext(Context);
}

export const DragDropProvider = ({
  children,
  onDrop,
}: DragDropProviderProps) => {
  // Symbol guarantees a unique id for each DragDropProvider instance
  const [contextId] = React.useState(() => Symbol("draggable-context"));

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
    });
  }, [contextId, onDrop]);

  return <Context.Provider value={{ contextId }}>{children}</Context.Provider>;
};
