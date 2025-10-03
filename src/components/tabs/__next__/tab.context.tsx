import React, { createContext } from "react";
import { TabContextProps } from "./tabs.types";
import { StyledTabProvider } from "./tabs.style";

export const TabContext = createContext<TabContextProps>({
  tabId: "",
});

interface TabProviderProps {
  children?: React.ReactNode;
  tabId: string;
  visible: boolean;
}

export const TabProvider = ({ children, tabId, visible }: TabProviderProps) => {
  return (
    <TabContext.Provider
      value={{
        tabId,
      }}
    >
      <StyledTabProvider visible={visible}>{children}</StyledTabProvider>
    </TabContext.Provider>
  );
};
