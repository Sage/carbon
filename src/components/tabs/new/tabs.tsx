import React, { useEffect } from "react";

import Typography from "../../typography";
import { TabsProvider, useTabs } from "./tabs.context";
import { TabListProps, TabPanelProps, TabProps, TabsProps } from "./tabs.types";
import { Spacer, StyledTab, StyledTabList, StyledTabs } from "./tabs.style";
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
  const { activeTab, focusIndex, orientation, setActiveTab, size } = useTabs();
  const selected = activeTab === index;

  if (
    (!!leftSlot || !!rightSlot) &&
    typeof label !== "string" &&
    !unsupportedSlotConfigurationWarningTriggered
  ) {
    Logger.warn(
      "[WARNING] Using `leftSlot` and/or `rightSlot` is not supported when `label` is not a string. Please use `leftSlot` and/or `rightSlot` alongside a string `label`, or use the `label` prop exclusively.",
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
      orientation={orientation}
      role="tab"
      size={size}
      type="button"
      tabIndex={activeTab === index || index === 0 ? 0 : -1}
    >
      {typeof label === "string" ? (
        <span className="tab-title-content-wrapper">
          {leftSlot}
          {label}
          {rightSlot}
        </span>
      ) : (
        <span className="tab-title-content-wrapper">{label}</span>
      )}
    </StyledTab>
  );
};

export const TabList = ({ ariaLabel, children }: TabListProps) => {
  const tabListRef = React.useRef<HTMLDivElement>(null);
  const { focusIndex, orientation, setFocusIndex, setActiveTab } = useTabs();

  const countTabChildren = () => {
    if (tabListRef.current) {
      return tabListRef.current.querySelectorAll('[role="tab"]').length;
    }
    return 0;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const numberOfTabs = countTabChildren();
    switch (event.key) {
      case "Home":
        setFocusIndex(0);
        break;
      case "End":
        setFocusIndex(numberOfTabs - 1);
        break;
      case "ArrowRight":
        setFocusIndex((prev) => (prev + 1) % numberOfTabs);
        break;
      case "ArrowLeft":
        setFocusIndex((prev) => (prev - 1 + numberOfTabs) % numberOfTabs);
        break;
      case "ArrowUp":
        if (orientation === "vertical")
          setFocusIndex((prev) => (prev - 1 + numberOfTabs) % numberOfTabs);
        break;
      case "ArrowDown":
        if (orientation === "vertical")
          setFocusIndex((prev) => (prev + 1) % numberOfTabs);
        break;
      case "Enter":
      case " ":
        setActiveTab(focusIndex);
        break;
    }
  };

  return (
    <>
      <Typography id={"tablist-aria-label"} screenReaderOnly>
        {ariaLabel}
      </Typography>
      <StyledTabList
        ariaLabel={ariaLabel}
        aria-labelledby={"tablist-aria-label"}
        id="tablist"
        onKeyDown={handleKeyDown}
        orientation={orientation}
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
  labelledBy = "",
  orientation = "horizontal",
  size = "medium",
}: TabsProps) => {
  return (
    <TabsProvider labelledBy={labelledBy} orientation={orientation} size={size}>
      <StyledTabs id="tabs-container">{children}</StyledTabs>
    </TabsProvider>
  );
};

export default Tabs;
