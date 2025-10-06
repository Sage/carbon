import React, { Dispatch, SetStateAction } from "react";

export interface TabsContextProps {
  activeTab: number;
  focusIndex: number;
  labelledBy?: string;
  orientation?: "horizontal" | "vertical";
  selectedTabId?: string;
  setActiveTab: Dispatch<SetStateAction<number>>;
  setFocusIndex: Dispatch<SetStateAction<number>>;
  size?: "medium" | "large";
}

export interface TabPanelProps {
  children?: React.ReactNode;
  id: string;
  index: number;
  labelledBy: string;
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
