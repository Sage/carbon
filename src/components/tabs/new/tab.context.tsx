import React, { createContext, useContext } from "react";
import { TabContextProps } from "./tabs.types";

export const TabContext = createContext<TabContextProps>({ tabId: "" });

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
};

interface TabProviderProps {
  children?: React.ReactNode;
  tabId: string;
}

export const TabProvider = ({ children, tabId }: TabProviderProps) => {
  return (
    <TabContext.Provider
      value={{
        tabId,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};
