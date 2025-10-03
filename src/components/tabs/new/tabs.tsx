import React, { useEffect } from "react";

import Typography from "../../typography";
import { TabsProvider, useTabs } from "./tabs.context";
import { TabListProps, TabPanelProps, TabProps, TabsProps } from "./tabs.types";
import { Spacer, StyledTab, StyledTabList } from "./tabs.style";
import Logger from "../../../__internal__/utils/logger";

export const TabPanel = ({
  children,
  labelledBy,
  id,
  index,
}: TabPanelProps) => {
  const { activeTab } = useTabs();

  if (index !== activeTab) return null;

  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy}>
      {children}
    </div>
  );
};

let unsupportedSlotConfigurationWarningTriggered = false;

export const Tab = ({
  controls,
  id,
  index,
  label,
  leftSlot,
  rightSlot,
}: TabProps) => {
  const { activeTab, focusIndex, setActiveTab, size } = useTabs();
  const selected = activeTab === index;

  if (
    (!!leftSlot || !!rightSlot) &&
    typeof label !== "string" &&
    !unsupportedSlotConfigurationWarningTriggered
  ) {
    Logger.warn(
      "[WARNING] Using `leftSlot` and/or `rightSlot` alongside `titleSlot` is not supported. Please use `leftSlot` and/or `rightSlot` alongside the `label` prop, or use the `titleSlot` prop on it's own.",
    );
    unsupportedSlotConfigurationWarningTriggered = true;
  }

  useEffect(() => {
    if (focusIndex === index) {
      const tabElement = document.getElementById(id);
      tabElement?.focus();
    }
  }, [focusIndex, id, index]);

  return (
    <StyledTab
      activeTab={activeTab === index}
      aria-controls={controls}
      aria-selected={selected ? "true" : "false"}
      id={id}
      onClick={() => setActiveTab(index)}
      role="tab"
      size={size}
      type="button"
      tabIndex={index === 0 ? 0 : -1}
    >
      {typeof label === "string" ? (
        <span className="tab-title-content-wrapper">
          {leftSlot}
          {label}
          {rightSlot}
        </span>
      ) : (
        label
      )}
    </StyledTab>
  );
};

export const TabList = ({ children, ariaLabel }: TabListProps) => {
  const tabListRef = React.useRef<HTMLDivElement>(null);
  const { focusIndex, setFocusIndex, setActiveTab } = useTabs();

  const countTabChildren = () => {
    if (tabListRef.current) {
      return tabListRef.current.querySelectorAll('[role="tab"]').length;
    }
    return 0;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const numberOfTabs = countTabChildren();
    switch (event.key) {
      case "ArrowRight":
        setFocusIndex((prev) => (prev + 1) % numberOfTabs);
        break;
      case "ArrowLeft":
        setFocusIndex((prev) => (prev - 1 + numberOfTabs) % numberOfTabs);
        break;
      case "Enter":
      case " ":
        setActiveTab(focusIndex);
        break;
    }
  };

  return (
    <>
      <Typography id={ariaLabel} screenReaderOnly>
        {ariaLabel}
      </Typography>
      <StyledTabList
        ariaLabel={ariaLabel}
        aria-labelledby={ariaLabel}
        onKeyDown={handleKeyDown}
        ref={tabListRef}
        role="tablist"
        tabIndex={-1}
      >
        {children}
        <Spacer />
      </StyledTabList>
    </>
  );
};

export const Tabs = ({
  children,
  colorMode = "light",
  labelledBy = "",
  orientation = "horizontal",
  size = "medium",
}: TabsProps) => {
  return (
    <TabsProvider
      colorMode={colorMode}
      labelledBy={labelledBy}
      orientation={orientation}
      size={size}
    >
      {children}
    </TabsProvider>
  );
};

export default Tabs;
