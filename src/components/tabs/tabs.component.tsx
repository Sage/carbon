import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { MarginProps } from "styled-system";
import { TagProps } from "../../__internal__/utils/helpers/tags/tags";
import {
  Tabs as NextTabs,
  TabList as NextTabList,
  TabPanel as NextTabPanel,
} from "./__next__/tabs.component";
import Tab, { TabProps } from "./tab";
import Logger from "../../__internal__/utils/logger";
import DrawerSidebarContext from "../drawer/__internal__/drawer-sidebar.context";
import usePrevious from "../../hooks/__internal__/usePrevious";

export type TabsHandle = {
  /** Programmatically focus on a specific tab.
   * @param tabId - The ID of the tab to focus. Must match the `tabId` prop of the target `Tab` component.
   */
  focusTab: (tabId: string) => void;
} | null;

export interface TabsProps extends MarginProps, TagProps {
  /**
   * Prevent rendering of hidden tabs, by default this is set to true and therefore all tabs will be rendered
   * @deprecated Support for this prop will be removed in a future release. All tabs will be rendered by default.
   * */
  renderHiddenTabs?: boolean;
  /** Allows manual control over the currently selected tab. */
  selectedTabId?: string;
  /** The child elements of Tabs need to be Tab components. */
  children: React.ReactNode;
  /**
   * Sets the alignment of the tab titles. Possible values include.
   * @deprecated Support for right-aligned tab content has been removed.
   */
  align?: "left" | "right";
  /** A callback for when a tab is changed. You can use this to manually control
   * tab changing or to fire other events when a tab is changed.
   */
  onTabChange?: (tabId: string) => void;
  /**
   * The position of the tab title.
   * */
  position?: "top" | "left";
  /** Sets size of the tab titles. */
  size?: "default" | "large";
  /**
   * Sets the divider of the tab titles header to extend the full width of the parent.
   * @deprecated Support for extended lines in tab headers has been removed.
   * */
  extendedLine?: boolean;
  /**
   * Adds a combination of borders to the tab titles.
   * @deprecated Support for configurable borders on tab titles has been removed.
   * */
  borders?: "off" | "on" | "no left side" | "no right side" | "no sides";
  /**
   * Adds an alternate styling variant to the tab titles.
   * @deprecated Support for alternate styling variants on tab titles has been removed.
   */
  variant?: "default" | "alternate";
  /** sets width to the tab headers. Can be any valid CSS string.
   * The headerWidth prop works only for `position="left"`
   * @deprecated Support will be removed in a future release.
   */
  headerWidth?: string;
  /** An object to support overriding validation statuses, when the Tabs have custom targets for example.
   * The `id` property should match the `tabId`s for the rendered Tabs.
   */
  validationStatusOverride?: {
    [id: string]: {
      error?: boolean;
      warning?: boolean;
      info?: boolean;
    };
  };
  /**
   * When this prop is set any string validation failures in the children of each Tab
   * will be summarised in the Tooltip next to the Tab title
   * @deprecated Support for validation summaries has been removed.
   */
  showValidationsSummary?: boolean;
}

let tabsLegacyWarned = false;

export const Tabs = forwardRef<TabsHandle, TabsProps>(
  (
    {
      children,
      selectedTabId,
      onTabChange,
      position = "top",
      size = "default",
      validationStatusOverride,
      align,
      headerWidth,
      renderHiddenTabs = true,
      ...rest
    },
    ref,
  ) => {
    if (!tabsLegacyWarned) {
      Logger.warn(
        "Warning: This version of the `Tabs` component is intended to help migration to the `next` version and will be removed in a future release.",
      );
      tabsLegacyWarned = true;
    }

    const tabData = useMemo(() => {
      const items: Array<{ props: TabProps }> = [];

      React.Children.forEach(children, (child) => {
        /* istanbul ignore else */
        if (React.isValidElement<TabProps>(child)) {
          items.push({ props: child.props });
        }
      });

      return items;
    }, [children]);

    const [selectedTabIdInternal, setSelectedTabIdInternal] = useState<
      string | undefined
    >(selectedTabId || tabData[0]?.props.id || tabData[0]?.props.tabId);
    const mappedSize = size === "default" ? "medium" : "large";
    const { isInSidebar } = React.useContext(DrawerSidebarContext);
    const orientation =
      isInSidebar || position === "left" ? "vertical" : "horizontal";

    const tabPanelsToRender = renderHiddenTabs
      ? tabData
      : tabData.filter(({ props }) => {
          return props.isTabSelected || props.tabId === selectedTabIdInternal;
        });

    const previousSelectedTabId = usePrevious(selectedTabId);

    useEffect(() => {
      if (
        selectedTabId !== previousSelectedTabId &&
        selectedTabId !== selectedTabIdInternal
      ) {
        setSelectedTabIdInternal(selectedTabId);
      }
    }, [selectedTabId, previousSelectedTabId, selectedTabIdInternal]);

    return (
      <NextTabs
        orientation={orientation}
        selectedTabId={selectedTabIdInternal}
        size={mappedSize}
        {...rest}
      >
        <NextTabList
          ref={ref}
          ariaLabel="Tabs"
          onTabChange={(id) => {
            setSelectedTabIdInternal(id);
            onTabChange?.(id);
          }}
          headerWidth={isInSidebar ? "100%" : undefined}
        >
          {tabData.map(({ props }) => {
            const idToUse = props.id || props.tabId;
            if (!idToUse) {
              Logger.warn(
                "Warning: Tab component is missing a unique identifier. Please provide an `id` prop to ensure proper functionality.",
              );
              return null;
            }

            return (
              <Tab
                headerWidth={isInSidebar ? "100%" : headerWidth}
                {...props}
                key={idToUse}
              />
            );
          })}
        </NextTabList>

        {!isInSidebar &&
          tabPanelsToRender.map(({ props }) => {
            const idToUse = props.id || props.tabId;
            if (!idToUse) {
              Logger.warn(
                "Warning: Each `Tab` component must have an `id` or `tabId` prop to associate it with a TabPanel.",
              );
              return null;
            }

            return (
              <NextTabPanel
                key={`${idToUse}-panel`}
                id={`${idToUse}-panel`}
                tabId={idToUse}
              >
                {props.children}
              </NextTabPanel>
            );
          })}
      </NextTabs>
    );
  },
);

Tabs.displayName = "Tabs";

export default Tabs;
