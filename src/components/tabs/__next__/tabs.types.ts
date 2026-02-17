import React, { Dispatch, SetStateAction } from "react";
import { TagProps } from "../../../__internal__/utils/helpers/tags";

export type TabValidationRecord = Record<string, string | boolean>;
export type ValidationRecord = Record<string, TabValidationRecord>;

export interface TabContextProps {
  tabId?: string;
}

export type TabsHandle = {
  /**
   * Programmatically focus on a specific tab.
   * @param id - The ID of the tab to focus. Must match the `id` prop of the target `Tab` component.
   */
  focusTab: (id: string) => void;
};

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

export interface TabPanelProps extends TagProps {
  /** The content to be shown in the tab panel */
  children?: React.ReactNode;
  /** The ID of the tab panel */
  id: string;
  /** The ID of the controlling tab */
  tabId: string;
}

export interface TabListProps extends TagProps {
  /** The label read out when the tab list gains focus */
  ariaLabel: string;
  /** The tabs to be shown in the tab list */
  children?: React.ReactNode;
  /** A callback for when the active tab is changed */
  onTabChange?: (tabId: string) => void;

  /**
   * @private @ignore @internal
   */
  headerWidth?: string;
}

export interface TabProps extends TagProps {
  /** The tab panel that this tab controls */
  controls: string;
  /** The ID of the tab */
  id: string;
  /** The error state of the tab */
  error?: boolean | string;
  /** The label shown on the tab */
  label: React.ReactNode;
  /** The item shown to the left of the label */
  leftSlot?: React.ReactNode;
  /** The item shown to the right of the label */
  rightSlot?: React.ReactNode;
  /** The warning state of the tab */
  warning?: boolean | string;
  /**
   * The info state of the tab
   * @deprecated to be removed when legacy `Tabs` and `Tab` are removed
   * */
  info?: boolean | string;

  /**
   * @internal @private @ignore
   */
  hasCustomLayout?: boolean;

  /** @private @ignore @internal */
  headerWidth?: string;

  /** @private @ignore @internal */
  href?: string;
}

export interface TabsProps extends TagProps {
  /** The tab list to be rendered within this set of tabs  */
  children?: React.ReactNode;
  /** The label associated with this set of tabs, for assistive technologies */
  labelledBy?: string;
  /** The orientation of the tabs */
  orientation?: "horizontal" | "vertical";
  /** The pre-selected tab to show e.g when restoring from URL  */
  selectedTabId?: string;
  /** The size of the tabs to use */
  size?: "medium" | "large";
}
