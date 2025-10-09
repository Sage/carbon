import React, { useCallback, useEffect, useState } from "react";

import Typography from "../../typography";
import { TabsProvider, useTabs } from "./tabs.context";
import { TabListProps, TabPanelProps, TabProps, TabsProps } from "./tabs.types";
import {
  Spacer,
  StyledScrollButton,
  StyledTab,
  StyledTabList,
  StyledTabListWrapper,
  StyledTabs,
} from "./tabs.style";
import Logger from "../../../__internal__/utils/logger";
import useResizeObserver from "../../../hooks/__internal__/useResizeObserver";
import Icon from "../../icon";

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
  const [error, setError] = useState<boolean | string>(false);
  const [warning, setWarning] = useState<boolean | string>(false);

  const {
    activeTab,
    focusIndex,
    orientation,
    setActiveTab,
    setCurrentTabId,
    size,
    tabErrors,
    tabWarnings,
  } = useTabs();
  const selected = activeTab === index;

  useEffect(() => {
    if (selected) setCurrentTabId(id);
  }, [id, selected, setCurrentTabId]);

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
  }, [focusIndex, id, index, setCurrentTabId]);

  useEffect(() => {
    const currentTabErrors = Object.keys(tabErrors).filter((k) =>
      k.includes(id),
    );
    const tabHasErrors = currentTabErrors.length > 0;

    const currentTabWarnings = Object.keys(tabWarnings).filter((k) =>
      k.includes(id),
    );
    const tabHasWarnings = currentTabWarnings.length > 0;

    if (tabHasErrors) {
      setError(currentTabErrors.length === 1 ? currentTabErrors[0] : true);
    } else {
      setError(false);
    }

    if (tabHasWarnings) {
      setWarning(
        currentTabWarnings.length === 1 ? currentTabWarnings[0] : true,
      );
    } else {
      setWarning(false);
    }
  }, [id, tabErrors, tabWarnings]);

  return (
    <StyledTab
      activeTab={activeTab === index}
      aria-controls={controls}
      aria-selected={selected ? "true" : "false"}
      error={error}
      id={id}
      onClick={() => setActiveTab(index)}
      orientation={orientation}
      role="tab"
      size={size}
      type="button"
      tabIndex={activeTab === index || index === 0 ? 0 : -1}
      warning={warning}
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
  const {
    focusIndex,
    orientation,
    selectedTabId,
    setFocusIndex,
    setActiveTab,
    size = "medium",
  } = useTabs();

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

  useEffect(() => {
    if (!selectedTabId) return;

    const targetTab = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) && child.props?.id === selectedTabId,
    );

    if (targetTab && React.isValidElement(targetTab)) {
      const { index } = targetTab.props;
      setActiveTab(index);
      setFocusIndex(index);
    }
  });

  const [leftVisible, setLeftVisible] = useState<boolean>(false);
  const [rightVisible, setRightVisible] = useState<boolean>(false);

  const updateUI = useCallback(() => {
    if (tabListRef.current) {
      const maxScrollValue =
        tabListRef.current.scrollWidth - tabListRef.current.clientWidth - 20;
      setLeftVisible(tabListRef.current.scrollLeft >= 20);
      setRightVisible(tabListRef.current.scrollLeft <= maxScrollValue);
    }
  }, []);

  useResizeObserver(tabListRef, () => {
    updateUI();
  });

  useEffect(() => {
    if (tabListRef.current) {
      updateUI();
    }
  }, [updateUI]);

  const onClickHandler = (direction: "left" | "right") => {
    if (tabListRef.current) {
      if (direction === "left") tabListRef.current.scrollLeft -= 200;
      else tabListRef.current.scrollLeft += 200;

      updateUI();
    }
  };

  return (
    <>
      <Typography id={"tablist-aria-label"} screenReaderOnly>
        {ariaLabel}
      </Typography>
      <StyledTabListWrapper>
        {orientation === "horizontal" && leftVisible ? (
          <StyledScrollButton
            data-role="tab-navigation-button-left"
            id="tab-navigation-button-left"
            onClick={() => onClickHandler("left")}
            position="left"
            size={size}
            tabIndex={-1}
            title="Scroll Tabs Left"
            type="button"
          >
            <Icon type="chevron_left" />
          </StyledScrollButton>
        ) : null}
        <StyledTabList
          ariaLabel={ariaLabel}
          aria-labelledby={"tablist-aria-label"}
          id="tablist"
          onKeyDown={handleKeyDown}
          orientation={orientation}
          ref={tabListRef}
          role="tablist"
          size={size}
          tabIndex={-1}
        >
          {children}
          <Spacer />
        </StyledTabList>
        {orientation === "horizontal" && rightVisible ? (
          <StyledScrollButton
            data-role="tab-navigation-button-right"
            id="tab-navigation-button-right"
            onClick={() => onClickHandler("right")}
            position="right"
            size={size}
            tabIndex={-1}
            title="Scroll Tabs Right"
            type="button"
          >
            <Icon type="chevron_right" />
          </StyledScrollButton>
        ) : null}
      </StyledTabListWrapper>
    </>
  );
};

export const Tabs = ({
  children,
  labelledBy = "",
  orientation = "horizontal",
  selectedTabId,
  size = "medium",
}: TabsProps) => {
  return (
    <TabsProvider
      labelledBy={labelledBy}
      orientation={orientation}
      selectedTabId={selectedTabId}
      size={size}
    >
      <StyledTabs id="tabs-container" orientation={orientation}>
        {children}
      </StyledTabs>
    </TabsProvider>
  );
};

export default Tabs;
