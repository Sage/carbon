import React, { createContext, useState, useContext } from "react";
import { TabsContextProps } from "./tabs.types";

const initialContext: TabsContextProps = {
  activeTab: 0,
  focusIndex: 0,
  labelledBy: "",
  orientation: "horizontal",
  selectedTabId: "",
  setActiveTab: () => {},
  setFocusIndex: () => {},
  size: "medium",
};

const TabsContext = createContext<TabsContextProps | null>(initialContext);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
};

interface TabsProviderProps {
  children?: React.ReactNode;
  labelledBy?: string;
  orientation?: "horizontal" | "vertical";
  selectedTabId?: string;
  size?: "medium" | "large";
}

export const TabsProvider = ({
  children,
  labelledBy,
  orientation,
  selectedTabId = "",
  size,
}: TabsProviderProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [focusIndex, setFocusIndex] = useState<number>(0);

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        focusIndex,
        labelledBy,
        orientation,
        selectedTabId,
        setActiveTab,
        setFocusIndex,
        size,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
