import React, { createContext, useContext } from "react";

const PluginContext = createContext<{
  getParentRef: () => HTMLElement | undefined;
  size?: "small" | "medium" | "large";
}>({
  getParentRef: () => undefined,
  size: "medium",
});

interface PluginProviderProps {
  children: React.ReactNode;
  parentRef: HTMLElement | null;
  size?: "small" | "medium" | "large";
}

export const PluginProvider = ({
  children,
  parentRef,
  size,
}: PluginProviderProps) => {
  const getParentRef = () => {
    return parentRef || undefined;
  };

  return (
    <PluginContext.Provider value={{ getParentRef, size }}>
      {children}
    </PluginContext.Provider>
  );
};

export const usePluginContext = () => useContext(PluginContext);
