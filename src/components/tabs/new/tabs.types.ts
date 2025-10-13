import React, { Dispatch, SetStateAction } from "react";

export type TabValidationRecord = Record<string, string | boolean>;
export type ValidationRecord = Record<string, TabValidationRecord>;

export interface TabContextProps {
  tabId: string;
}

export interface TabsContextProps {
  activeTab: number;
  currentTabId?: string;
  focusIndex: number;
  isInTab?: boolean;
  labelledBy?: string;
  orientation?: "horizontal" | "vertical";
  selectedTabId?: string;
  setActiveTab: Dispatch<SetStateAction<number>>;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  setCurrentTabId: Dispatch<SetStateAction<string>>;
  setTabErrors: (
    childId: string,
    tabId: string,
    error: string | boolean,
  ) => void;
  setTabWarnings: (
    childId: string,
    tabId: string,
    warning: string | boolean,
  ) => void;
  tabErrors: ValidationRecord;
  tabWarnings: ValidationRecord;
  size?: "medium" | "large";
}

export interface TabPanelProps {
  children?: React.ReactNode;
  id: string;
  index: number;
  labelledBy: string;
  tabId: string;
}

export interface TabListProps {
  ariaLabel: string;
  children?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  size?: "medium" | "large";
}

export interface TabProps {
  controls: string;
  id: string;
  index: number;
  label: React.ReactNode;
  leftSlot?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  rightSlot?: React.ReactNode;
  size?: "medium" | "large";
}

export interface TabsProps {
  children?: React.ReactNode;
  labelledBy?: string;
  orientation?: "horizontal" | "vertical";
  selectedTabId?: string;
  size?: "medium" | "large";
}
