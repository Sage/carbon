import React, { createContext } from "react";
import { TabContextProps } from "./tabs.types";

export const TabContext = createContext<TabContextProps>({
  tabId: "",
});

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
