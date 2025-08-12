import React, { useEffect, useState, useContext, createContext } from "react";
import invariant from "invariant";
import createMonitor from "./__internal__/monitor";

const DraggableContext = createContext<symbol | null>(null);

export const useDraggableContext = () => {
  const context = useContext(DraggableContext);
  invariant(
    context !== null,
    "Context does not exist. Have you wrapped your component within <DraggableProvider>?",
  );
  return context;
};

interface DraggableProviderProps {
  children: React.ReactNode;
  onDragStart?: () => void;
  onDrop?: ({
    source,
    target,
  }: {
    source: { list: string; index: number };
    target: { list: string; index: number };
  }) => void;
}

const DraggableProvider = ({ children, ...rest }: DraggableProviderProps) => {
  // Create a unique id for the draggable context
  const [instanceId] = useState(() => Symbol("instance-id"));

  useEffect(() => createMonitor({ instanceId, ...rest }), [instanceId, rest]);

  return (
    <DraggableContext.Provider value={instanceId}>
      {children}
    </DraggableContext.Provider>
  );
};

export default DraggableProvider;
