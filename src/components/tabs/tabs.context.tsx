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
  setErrors: () => {},
  setWarnings: () => {},
  size: "medium",
  errors: {},
  warnings: {},
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
  const [tabErrors, setTabErrors] = useState<ValidationRecord>({});
  const [tabWarnings, setTabWarnings] = useState<ValidationRecord>({});

  // This calloback is difficult to test in Jest environments and
  // is tested in Playwright
  /* istanbul ignore next */
  const setErrors = useCallback(
    (childId: string, tabId: string, error: string | boolean) => {
      const validationEntry = {
        [tabId]: {
          [childId]: error,
        },
      };

      setTabErrors((state) => {
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
  const setWarnings = useCallback(
    (childId: string, tabId: string, warning: string | boolean) => {
      const validationEntry = {
        [tabId]: {
          [childId]: warning,
        },
      };

      setTabWarnings((state) => {
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
        setErrors,
        setWarnings,
        size,
        errors: tabErrors,
        warnings: tabWarnings,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
