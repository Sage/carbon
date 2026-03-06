import React, { createContext, useContext } from "react";

const PluginContext = createContext<{
  getParentRef: () => HTMLElement | undefined;
}>({
  getParentRef: () => undefined,
});

interface PluginProviderProps {
  children: React.ReactNode;
  parentRef: HTMLElement | null;
}

export const PluginProvider = ({
  children,
  parentRef,
}: PluginProviderProps) => {
  const getParentRef = () => {
    return parentRef || undefined;
  };

  return (
    <PluginContext.Provider value={{ getParentRef }}>
      {children}
    </PluginContext.Provider>
  );
};

export const usePluginContext = () => useContext(PluginContext);
