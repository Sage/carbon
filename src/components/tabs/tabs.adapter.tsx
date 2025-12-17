import React, { forwardRef, useMemo } from "react";
import { TabsProps as LegacyTabsProps, TabsHandle } from "./tabs.component";
import {
  Tabs as NextTabs,
  TabList as NextTabList,
  Tab as NextTab,
  TabPanel as NextTabPanel,
} from "./__next__/tabs.component";
import { TabProps as LegacyTabProps } from "./tab/tab.component";
import { TabProps as NextTabProps } from "./__next__/tabs.types";

export const Tab = ({
  tabId,
  title,
  errorMessage,
  warningMessage,
  infoMessage,
  customLayout,
  siblings,
  titlePosition,
  validationStatusOverride,
  ...rest
}: LegacyTabProps &
  Partial<NextTabProps> & {
    validationStatusOverride?: LegacyTabsProps["validationStatusOverride"];
  }) => {
  const overrides = validationStatusOverride?.[tabId];
  const error = overrides?.error || !!errorMessage;
  const warning = overrides?.warning || !!warningMessage;
  const info = overrides?.info || !!infoMessage;

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

  return (
    <NextTab
      id={tabId}
      controls={`${tabId}-panel`}
      label={label}
      error={error}
      warning={warning}
      info={info}
      {...rest}
    />
  );
};

export const Tabs = forwardRef<TabsHandle, LegacyTabsProps>(
  (
    {
      children,
      selectedTabId,
      onTabChange,
      position = "top",
      size = "default",
      validationStatusOverride,
      ...rest
    },
    ref,
  ) => {
    const mappedSize = size === "large" ? "large" : "medium";
    const orientation = position === "left" ? "vertical" : "horizontal";

    const tabData = useMemo(() => {
      const items: Array<{ props: LegacyTabProps }> = [];

      React.Children.forEach(children, (child) => {
        if (React.isValidElement<LegacyTabProps>(child)) {
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
            return <Tab {...props} key={props.tabId} />;
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
