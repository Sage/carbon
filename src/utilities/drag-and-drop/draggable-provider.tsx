import React, { useState, useContext, createContext } from "react";
import invariant from "invariant";
import useMonitor from "./__internal__/use-monitor";
import { type EventHandlerMap } from "./__internal__/events";

interface DraggableContextType {
  instanceId: symbol;
}

const DraggableContext = createContext<DraggableContextType | null>(null);

export const useDraggableContext = () => {
  const context = useContext(DraggableContext);
  invariant(
    context !== null,
    "Context does not exist. Have you wrapped your component within <DraggableProvider>?",
  );
  return context;
};

export interface DraggableProviderProps {
  children: React.ReactNode;
  onDragStart?: EventHandlerMap["onDragStart"];
  onDrop?: EventHandlerMap["onDrop"];
}

export const DraggableProvider = ({
  children,
  ...rest
}: DraggableProviderProps) => {
  // Create a unique id for the draggable context
  const [instanceId] = useState(() => Symbol("instance-id"));

  useMonitor({ instanceId, ...rest });

  return (
    <DraggableContext.Provider value={{ instanceId }}>
      {children}
    </DraggableContext.Provider>
  );
};

export default DraggableProvider;
