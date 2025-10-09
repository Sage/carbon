import React, { createContext, useState, useContext, useCallback } from "react";
import { TabsContextProps } from "./tabs.types";

const initialContext: TabsContextProps = {
  activeTab: 0,
  currentTabId: "",
  focusIndex: 0,
  isInTab: false,
  labelledBy: "",
  orientation: "horizontal",
  selectedTabId: "",
  setActiveTab: () => {},
  setFocusIndex: () => {},
  setCurrentTabId: () => {},
  setTabErrors: () => {},
  setTabWarnings: () => {},
  size: "medium",
  tabErrors: {},
  tabWarnings: {},
};

export const TabsContext = createContext<TabsContextProps>(initialContext);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
};

interface TabsProviderProps {
  children?: React.ReactNode;
  isInTab?: boolean;
  labelledBy?: string;
  orientation?: "horizontal" | "vertical";
  selectedTabId?: string;
  size?: "medium" | "large";
}

export const TabsProvider = ({
  children,
  isInTab = true,
  labelledBy,
  orientation,
  selectedTabId = "",
  size,
}: TabsProviderProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [currentTabId, setCurrentTabId] = useState<string>("");
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string | boolean>>({});
  const [warnings, setWarnings] = useState<Record<string, string | boolean>>(
    {},
  );

  const setTabErrors = useCallback(
    (childId: string, error: string | boolean) => {
      setErrors((state) =>
        state[childId] !== error ? { ...state, [childId]: error } : state,
      );
    },
    [],
  );

  const setTabWarnings = useCallback(
    (childId: string, warning: string | boolean) => {
      setWarnings((state) =>
        state[childId] !== warning ? { ...state, [childId]: warning } : state,
      );
    },
    [],
  );

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        currentTabId,
        focusIndex,
        isInTab,
        labelledBy,
        orientation,
        selectedTabId,
        setActiveTab,
        setCurrentTabId,
        setFocusIndex,
        setTabErrors,
        setTabWarnings,
        size,
        tabErrors: errors,
        tabWarnings: warnings,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
