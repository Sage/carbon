import * as React from "react";
import { PaddingSpacingProps } from "../../../utils/helpers/options-helper";

export interface TabContextProps {
  setError: (childId: string, hasError: boolean) => void;
  setWarning: (childId: string, hasWarning: boolean) => void;
  setInfo: (childId: string, hasInfo: boolean) => void;
}

export interface TabProps extends PaddingSpacingProps {
  title?: string;
  tabId: string;
  className?: string;
  children?: React.ReactNode;
  isTabSelected?: boolean;
  position: "top" | "left";
  role?: string;
  ariaLabelledby?: string;
  updateErrors?: () => void;
  updateWarnings?: () => void;
  errorMessage?: string;
  warningMessage?: string;
  infoMessage?: string;
  siblings?: React.ReactNode[];
  titlePosition?: "before" | "after";
  href?: string;
}

declare const TabContext: React.Context<TabContextProps>;
declare function Tab(props: TabProps): JSX.Element;

export { TabContext };
export default Tab;
