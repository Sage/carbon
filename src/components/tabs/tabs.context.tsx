import React, { createContext, useState, useContext, useCallback } from "react";
import { TabsContextProps, ValidationRecord } from "./tabs.types";

/* istanbul ignore next */
const initialContext: TabsContextProps = {
  activeTab: "",
  currentTabId: "",
  focusIndex: "",
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
  return context;
};

interface TabsProviderProps {
  children?: React.ReactNode;
  isInTab?: boolean;
  labelledBy?: string;
  orientation: "horizontal" | "vertical";
  selectedTabId?: string;
  size: "medium" | "large";
}

export const TabsProvider = ({
  children,
  isInTab = true,
  labelledBy,
  orientation,
  selectedTabId = "",
  size,
}: TabsProviderProps) => {
  const [activeTab, setActiveTab] = useState<string>(selectedTabId);
  const [currentTabId, setCurrentTabId] = useState<string>(selectedTabId);
  const [focusIndex, setFocusIndex] = useState<string>("");
  const [errors, setErrors] = useState<ValidationRecord>({});
  const [warnings, setWarnings] = useState<ValidationRecord>({});

  // This calloback is difficult to test in Jest environments and
  // is tested in Playwright
  /* istanbul ignore next */
  const setTabErrors = useCallback(
    (childId: string, tabId: string, error: string | boolean) => {
      const validationEntry = {
        [tabId]: {
          [childId]: error,
        },
      };

      setErrors((state) => {
        if (!state[tabId]) state[tabId] = {};

        return state[tabId][childId] !== error
          ? { ...state, ...validationEntry }
          : state;
      });
    },
    [],
  );

  // This calloback is difficult to test in Jest environments and
  // is tested in Playwright
  /* istanbul ignore next */
  const setTabWarnings = useCallback(
    (childId: string, tabId: string, warning: string | boolean) => {
      const validationEntry = {
        [tabId]: {
          [childId]: warning,
        },
      };

      setWarnings((state) => {
        if (!state[tabId]) state[tabId] = {};
        return state[tabId][childId] !== warning
          ? { ...state, ...validationEntry }
          : state;
      });
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
