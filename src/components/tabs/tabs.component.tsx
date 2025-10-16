import React, { useCallback, useEffect, useState } from "react";

import Typography from "../typography";
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
import Logger from "../../__internal__/utils/logger";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import Icon from "../icon";
import { TabProvider } from "./tab.context";

export const TabPanel = ({ children, id, tabId }: TabPanelProps) => {
  const { activeTab } = useTabs();

  if (tabId !== activeTab) return null;

  return (
    <TabProvider tabId={tabId}>
      <div id={id} role="tabpanel" aria-labelledby={tabId}>
        {children}
      </div>
    </TabProvider>
  );
};

let unsupportedSlotConfigurationWarningTriggered = false;

export const Tab = ({
  controls,
  error = false,
  id,
  label,
  leftSlot,
  rightSlot,
  warning = false,
}: TabProps) => {
  const [internalError, setInternalError] = useState<boolean | string>(error);
  const [internalWarning, setInternalWarning] = useState<boolean | string>(
    warning,
  );

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
  const selected = activeTab === id;

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
    if (focusIndex === id) {
      const tabElement = document.getElementById(id);
      tabElement?.focus();
    }
  }, [focusIndex, id, setCurrentTabId]);

  /** Can't be unit-tested; controlled by form tests */
  /* istanbul ignore next */
  useEffect(() => {
    const tabErrorEntries = tabErrors[id];
    const tabWarningEntries = tabWarnings[id];

    if (!tabErrorEntries) {
      setInternalError(false);
      return;
    } else {
      const currentTabErrors = Object.keys(tabErrorEntries)
        .map((k) => tabErrorEntries[k])
        .filter((v) => v !== false);

      const tabHasErrors = error || currentTabErrors.length > 0;
      setInternalError(tabHasErrors);
    }

    if (!tabWarningEntries) {
      setInternalWarning(false);
      return;
    } else {
      const currentTabWarnings = Object.keys(tabWarningEntries)
        .map((k) => tabWarningEntries[k])
        .filter((v) => v !== false);

      const tabHasWarnings = warning || currentTabWarnings.length > 0;
      setInternalWarning(tabHasWarnings);
    }
  }, [error, id, tabErrors, tabWarnings, warning]);

  const validationIcon = () => {
    if (internalError || internalWarning) {
      if (internalError) {
        return <Icon type="error" color="#db004e" />;
      }

      /* istanbul ignore else */
      if (internalWarning) {
        return <Icon type="warning" color="#d64309" />;
      }
    }

    return null;
  };

  return (
    <TabProvider tabId={id}>
      <StyledTab
        activeTab={activeTab === id}
        aria-controls={controls}
        aria-selected={selected ? "true" : "false"}
        error={internalError}
        id={id}
        onClick={() => setActiveTab(id)}
        orientation={orientation}
        role="tab"
        size={size}
        type="button"
        tabIndex={activeTab === id ? 0 : -1}
        warning={internalWarning}
      >
        {typeof label === "string" ? (
          <span className="tab-title-content-wrapper">
            {leftSlot}
            {label}
            {rightSlot}
            {validationIcon()}
          </span>
        ) : (
          <span className="tab-title-content-wrapper">
            {label}
            {validationIcon()}
          </span>
        )}
      </StyledTab>
    </TabProvider>
  );
};

export const TabList = ({ ariaLabel, children }: TabListProps) => {
  const tabListRef = React.useRef<HTMLDivElement>(null);
  const {
    activeTab,
    focusIndex,
    orientation,
    selectedTabId,
    setFocusIndex,
    setActiveTab,
    size,
  } = useTabs();

  useEffect(() => {
    /* istanbul ignore if */
    if (selectedTabId) {
      setActiveTab(selectedTabId);
      return;
    }

    if (!activeTab || activeTab === "") {
      const tabIds: string[] = React.Children.toArray(children)
        .map((child: React.ReactNode) => {
          /* istanbul ignore else */
          if (React.isValidElement(child)) {
            return child.props.id;
          }
          /* istanbul ignore next */

          return null;
        })
        .filter((id): id is string => typeof id === "string");
      const firstTab = tabIds[0];
      setActiveTab(firstTab);
    }
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const tabIds: string[] = React.Children.toArray(children)
      .map((child: React.ReactNode) => {
        /* istanbul ignore else */
        if (React.isValidElement(child)) {
          return child.props.id;
        }
        /* istanbul ignore next */
        return null;
      })
      .filter((id): id is string => typeof id === "string");

    const currentIndex = tabIds.indexOf(focusIndex || activeTab);
    const lastIndex = tabIds.length - 1;

    /* istanbul ignore if */
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (event.key) {
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = lastIndex;
        break;
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % tabIds.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
        break;
      case "ArrowUp":
        /* istanbul ignore else */
        if (orientation === "vertical") {
          nextIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
        }
        break;
      case "ArrowDown":
        /* istanbul ignore else */
        if (orientation === "vertical") {
          nextIndex = (currentIndex + 1) % tabIds.length;
        }
        break;
      case "Enter":
      case " ":
        setActiveTab(activeTab);
        return;
      default:
        return;
    }

    setFocusIndex(tabIds[nextIndex]);
  };

  const [leftVisible, setLeftVisible] = useState<boolean>(false);
  const [rightVisible, setRightVisible] = useState<boolean>(false);

  const updateUI = useCallback(() => {
    /* istanbul ignore else */
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
    /* istanbul ignore else */
    if (tabListRef.current) {
      updateUI();
    }
  }, [updateUI]);

  // Difficult to test in Jest
  /* istanbul ignore next */
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
          /* istanbul ignore next */
          <StyledScrollButton
            data-role="tab-navigation-button-left"
            id="tab-navigation-button-left"
            onClick={
              /* istanbul ignore next */
              () => onClickHandler("left")
            }
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
          /* istanbul ignore next */
          <StyledScrollButton
            data-role="tab-navigation-button-right"
            id="tab-navigation-button-right"
            onClick={
              /* istanbul ignore next */
              () => onClickHandler("right")
            }
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
