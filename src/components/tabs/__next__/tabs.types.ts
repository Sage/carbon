import React, { Dispatch, SetStateAction } from "react";

export type TabValidationRecord = Record<string, string | boolean>;
export type ValidationRecord = Record<string, TabValidationRecord>;

export interface TabContextProps {
  tabId?: string;
}

export interface TabsContextProps {
  activeTab: string;
  currentTabId?: string;
  focusIndex: string;
  isInTab?: boolean;
  labelledBy?: string;
  orientation: "horizontal" | "vertical";
  selectedTabId?: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setFocusIndex: Dispatch<SetStateAction<string>>;
  setCurrentTabId: Dispatch<SetStateAction<string>>;
  setErrors: (childId: string, tabId: string, error: string | boolean) => void;
  setWarnings: (
    childId: string,
    tabId: string,
    warning: string | boolean,
  ) => void;
  errors: ValidationRecord;
  warnings: ValidationRecord;
  size: "medium" | "large";
  // DEPRECATED - to be removed when legacy tabs removed
  infos: ValidationRecord;
  setInfos: (childId: string, tabId: string, info: string | boolean) => void;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  id: string;
  tabId: string;
}

export interface TabListProps {
  ariaLabel: string;
  children?: React.ReactNode;
}

export interface TabProps {
  controls: string;
  id: string;
  error?: boolean | string;
  label: React.ReactNode;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  warning?: boolean | string;
  // DEPRECATED - to be removed when legacy tabs removed
  info?: boolean | string;
}

export interface TabsProps {
  children?: React.ReactNode;
  labelledBy?: string;
  orientation?: "horizontal" | "vertical";
  selectedTabId?: string;
  size?: "medium" | "large";
}
