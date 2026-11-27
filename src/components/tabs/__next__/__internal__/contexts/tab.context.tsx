import React, { createContext } from "react";
import { StyledTabProvider } from "../../tabs.style";

export interface TabContextProps {
  tabId?: string;
}

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
      <StyledTabProvider $visible={visible} role="presentation">
        {children}
      </StyledTabProvider>
    </TabContext.Provider>
  );
};
