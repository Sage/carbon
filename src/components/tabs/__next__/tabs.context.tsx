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
  // DEPRECATED - to be removed when legacy tabs removed
  infos: {},
  setInfos: () => {},
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
  // DEPRECATED - to be removed when legacy tabs removed
  const [tabInfos, setTabInfos] = useState<ValidationRecord>({});

  // This callback is difficult to test in Jest environments and
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

  // This callback is difficult to test in Jest environments and
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

  // DEPRECATED - to be removed when legacy tabs removed
  // This callback is difficult to test in Jest environments and
  // is tested in Playwright
  /* istanbul ignore next */
  const setInfos = useCallback(
    (childId: string, tabId: string, info: string | boolean) => {
      const validationEntry = {
        [tabId]: {
          [childId]: info,
        },
      };

      setTabInfos((state) => {
        if (!state[tabId]) state[tabId] = {};
        return state[tabId][childId] !== info
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
        // DEPRECATED - to be removed when legacy tabs removed
        infos: tabInfos,
        setInfos,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
