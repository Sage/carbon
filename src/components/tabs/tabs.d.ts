import * as React from "react";
import { MarginProps } from "styled-system";
import Tab from "./tab";

export interface TabsProps extends MarginProps {
  className?: string;
  /** Prevent rendering of hidden tabs, by default this is set to true and therefore all tabs will be rendered */
  renderHiddenTabs?: boolean;
  /** Allows manual control over the currently selected tab. */
  selectedTabId?: string;
  /** The child elements of Tabs need to be Tab components. */
  children: React.ReactNode[] | React.ReactNode;
  /** Sets the alignment of the tab titles. Possible values include. */
  align?: "left" | "right";
  /** A callback for when a tab is changed. You can use this to manually control
   * tab changing or to fire other events when a tab is changed.
   */
  onTabChange?: (tabId: string) => void;
  /** The position of the tab title. */
  position?: "top" | "left";
  /** Sets size of the tab titles. */
  size?: "default" | "large";
  /** Sets the divider of the tab titles header to extend the full width of the parent. */
  extendedLine?: boolean;
  /** Adds a combination of borders to the tab titles. */
  borders?: "off" | "on" | "no left side" | "no right side" | "no sides";
  /** Adds an alternate styling variant to the tab titles. */
  variant?: "default" | "alternate";
  /** sets width to the tab headers. Can be any valid CSS string.
   * The headerWidth prop works only for `position="left"`
   */
  headerWidth?: string;
  /** An object to support overriding validation statuses, when the Tabs have custom targets for example.
   * The `id` property should match the `tabId`s for the rendered Tabs.
   */
  validationStatusOverride?: {
    id?: {
      error?: boolean;
      warning?: boolean;
      info?: boolean;
    };
  };
}

declare function Tabs(props: TabsProps): JSX.Element;

export { Tabs, Tab };
