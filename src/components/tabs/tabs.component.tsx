import React, { forwardRef, useMemo } from "react";
import { MarginProps, PaddingProps } from "styled-system";
import { TagProps } from "../../__internal__/utils/helpers/tags/tags";
import {
  Tabs as NextTabs,
  TabList as NextTabList,
  Tab as NextTab,
  TabPanel as NextTabPanel,
} from "./__next__/tabs.component";

export type TabsHandle = {
  /** Programmatically focus on a specific tab.
   * @param tabId - The ID of the tab to focus. Must match the `tabId` prop of the target `Tab` component.
   */
  focusTab: (tabId: string) => void;
} | null;

export interface TabProps extends PaddingProps, TagProps {
  /**
   * The title of the Tab.
   * @deprecated Support will be removed in a future release, it is recommended to use `label` prop instead.
   */
  title?: string;
  /**
   * A unique ID to identify this specific tab.
   * @deprecated Support will be removed in a future release, it is recommended to use `id` instead.
   * */
  tabId: string;
  /** The child elements of Tab component. */
  children?: React.ReactNode;
  /** @ignore @private Boolean indicating selected state of Tab. */
  isTabSelected?: boolean;
  /**
   * The position of the Tab.
   * @deprecated Support will be removed in a future release.
   * */
  position?: "top" | "left";
  /**
   * @deprecated
   * Message displayed when Tab has error
   * The legacy validation pattern is being removed in a future release.
   * */
  errorMessage?: string;
  /**
   * @deprecated
   * Message displayed when Tab has warning
   * The legacy validation pattern is being removed in a future release.
   * */
  warningMessage?: string;
  /**
   * @deprecated
   * Message displayed when Tab has info
   * The legacy validation pattern is being removed in a future release.
   * */
  infoMessage?: string;
  /**
   * Additional content to display with title
   * @deprecated Support for siblings will be removed in a future release.
   * It is recommended to use `label` prop to compose what you want.
   * */
  siblings?: React.ReactNode;
  /**
   * Position title before or after siblings
   * @deprecated Support for titlePosition will be removed in a future release.
   * It is recommended to use `label` prop to compose what you want.
   * */
  titlePosition?: "before" | "after";
  /**
   * Allows Tab to be a link
   * @deprecated Using tabs as links is inaccessible; this prop will be deprecated in a future release.
   * */
  href?: string;
  /**
   * Overrides default layout with a one defined in this prop
   * @deprecated Support for customLayout will be removed in a future release, it is recommended to use `label` prop instead.
   * */
  customLayout?: React.ReactNode;
  /** Additional props to be passed to the Tab's corresponding title. */
  titleProps?: {
    /** Identifier used for testing purposes */
    "data-role"?: string;
  };
  /** @private @ignore */
  role?: string;
  /** @private @ignore */
  ariaLabelledby?: string;
  /** @private @ignore */
  updateErrors?: (
    id: string,
    errors: Record<string, undefined | string | boolean>,
  ) => void;
  /** @private @ignore */
  updateWarnings?: (
    id: string,
    warnings: Record<string, undefined | string | boolean>,
  ) => void;
  /** @private @ignore */
  updateInfos?: (
    id: string,
    infos: Record<string, undefined | string | boolean>,
  ) => void;
  /** @private @ignore @internal */
  validationStatusOverride?: {
    error?: boolean;
    warning?: boolean;
    info?: boolean;
  };
  /** @private @ignore @internal */
  headerWidth?: string;
}

export interface TabsProps extends MarginProps, TagProps {
  /** Prevent rendering of hidden tabs, by default this is set to true and therefore all tabs will be rendered */
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
   * @deprecated Support has been removed for extended lines in tab headers.
   * */
  extendedLine?: boolean;
  /**
   * Adds a combination of borders to the tab titles.
   * @deprecated Support has been removed for configurable borders on tab titles.
   * */
  borders?: "off" | "on" | "no left side" | "no right side" | "no sides";
  /**
   * Adds an alternate styling variant to the tab titles.
   * @deprecated Support has been removed for alternate styling variants on tab titles.
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

export const Tab = ({
  tabId,
  title,
  customLayout,
  siblings,
  titlePosition,
  validationStatusOverride,
  ...rest
}: TabProps) => {
  let label: React.ReactNode = title;

  if (customLayout) {
    label = customLayout;
  } else if (siblings) {
    const titleNode = <span>{title}</span>;
    label =
      titlePosition === "after" ? (
        <>
          {siblings}
          {titleNode}
        </>
      ) : (
        <>
          {titleNode}
          {siblings}
        </>
      );
  }

  const { error, warning, info } = validationStatusOverride || {};

  return (
    <NextTab
      id={tabId}
      controls={`${tabId}-panel`}
      label={label}
      error={error}
      warning={warning}
      info={info}
      hasCustomLayout={!!customLayout}
      {...rest}
    />
  );
};
Tab.displayName = "Tab";

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
      ...rest
    },
    ref,
  ) => {
    const mappedSize = size === "default" ? "medium" : "large";
    const orientation = position === "left" ? "vertical" : "horizontal";

    const tabData = useMemo(() => {
      const items: Array<{ props: TabProps }> = [];

      React.Children.forEach(children, (child) => {
        if (React.isValidElement<TabProps>(child)) {
          items.push({ props: child.props });
        }
      });

      return items;
    }, [children]);

    return (
      <NextTabs
        orientation={orientation}
        selectedTabId={selectedTabId}
        size={mappedSize}
        {...rest}
      >
        <NextTabList ref={ref} ariaLabel="Tabs" onTabChange={onTabChange}>
          {tabData.map(({ props }) => {
            return (
              <Tab headerWidth={headerWidth} {...props} key={props.tabId} />
            );
          })}
        </NextTabList>

        {tabData.map(({ props }) => (
          <NextTabPanel
            key={`${props.tabId}-panel`}
            id={`${props.tabId}-panel`}
            tabId={props.tabId}
          >
            {props.children}
          </NextTabPanel>
        ))}
      </NextTabs>
    );
  },
);

Tabs.displayName = "Tabs";

export default Tabs;
