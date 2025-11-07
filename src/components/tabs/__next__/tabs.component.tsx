import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import Typography from "../../typography";
import { TabsProvider, useTabs } from "./tabs.context";
import {
  TabsHandle,
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsProps,
} from "./tabs.types";
import {
  Spacer,
  StyledScrollButton,
  StyledScrollButtonPlaceholder,
  StyledTab,
  StyledTabList,
  StyledTabListWrapper,
  StyledTabPanel,
  StyledTabs,
} from "./tabs.style";
import Logger from "../../../__internal__/utils/logger";
import useResizeObserver from "../../../hooks/__internal__/useResizeObserver";
import Icon from "../../icon";
import { TabProvider } from "./tab.context";

export const TabPanel = ({ children, id, tabId }: TabPanelProps) => {
  const { activeTab } = useTabs();

  return (
    <TabProvider tabId={tabId} visible={tabId === activeTab}>
      <StyledTabPanel id={id} role="tabpanel" aria-labelledby={tabId}>
        {children}
      </StyledTabPanel>
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
  info = false,
}: TabProps) => {
  const [internalError, setInternalError] = useState<boolean | string>(error);
  const [internalWarning, setInternalWarning] = useState<boolean | string>(
    warning,
  );
  const [internalInfo, setInternalInfo] = useState<boolean | string>(info);

  const {
    activeTab,
    focusIndex,
    orientation,
    setActiveTab,
    setCurrentTabId,
    setFocusIndex,
    size,
    errors,
    warnings,
    infos,
  } = useTabs();
  const selected = activeTab === id;

  useEffect(() => {
    if (selected) setCurrentTabId(id);
  }, [id, selected, setCurrentTabId]);

  if (
    (leftSlot || rightSlot) &&
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
    let tabErrorEntries = errors[id];
    let tabWarningEntries = warnings[id];
    let tabInfoEntries = infos[id];

    if (error && !tabErrorEntries) {
      tabErrorEntries = { static: error };
    }

    if (warning && !tabWarningEntries) {
      tabWarningEntries = { static: warning };
    }

    if (info && !tabInfoEntries) {
      tabInfoEntries = { static: info };
    }

    if (!tabErrorEntries) {
      setInternalError(false);
      return;
    }
    const currentTabErrors = Object.keys(tabErrorEntries)
      .map((k) => tabErrorEntries[k])
      .filter((v) => v !== false);

    const tabHasErrors = error || currentTabErrors.length > 0;
    setInternalError(tabHasErrors);

    if (!tabWarningEntries) {
      setInternalWarning(false);
      return;
    }

    const currentTabWarnings = Object.keys(tabWarningEntries)
      .map((k) => tabWarningEntries[k])
      .filter((v) => v !== false);

    const tabHasWarnings = warning || currentTabWarnings.length > 0;
    setInternalWarning(tabHasWarnings);

    if (!tabInfoEntries) {
      setInternalInfo(false);
      return;
    }
    const currentTabInfos = Object.keys(tabInfoEntries)
      .map((k) => tabInfoEntries[k])
      .filter((v) => v !== false);

    const tabHasInfo = info || currentTabInfos.length > 0;
    setInternalInfo(tabHasInfo);
  }, [error, id, errors, warnings, warning, infos, info]);

  const validationIcon = () => {
    if (internalError || internalWarning || internalInfo) {
      if (internalError) {
        return <Icon data-role="icon-error" type="error" color="#db004e" />;
      }

      /* istanbul ignore else */
      if (internalWarning) {
        return <Icon data-role="icon-warning" type="warning" color="#d64309" />;
      }

      /* istanbul ignore else */
      if (internalInfo) {
        return <Icon data-role="icon-info" type="info" color="#0060a7ff" />;
      }
    }

    return null;
  };

  return (
    <TabProvider tabId={id} visible>
      <StyledTab
        activeTab={activeTab === id}
        aria-controls={controls}
        aria-selected={selected ? "true" : "false"}
        error={internalError}
        info={internalInfo}
        id={id}
        onClick={() => {
          setActiveTab(id);
          setFocusIndex(id);
        }}
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

export const TabList = forwardRef<TabsHandle, TabListProps>(
  ({ ariaLabel, children }, ref) => {
    const tabListRef = useRef<HTMLDivElement>(null);
    const {
      activeTab,
      focusIndex,
      orientation,
      selectedTabId,
      setFocusIndex,
      setActiveTab,
      size,
    } = useTabs();

    useImperativeHandle(ref, () => ({
      focusTab: (id: string) => {
        const tab = tabListRef.current?.querySelector(`#${id}`) as
          | HTMLButtonElement
          | undefined;
        tab?.focus();
        setFocusIndex(id);
        setActiveTab(id);
      },
    }));

    const getTabIds = useCallback(() => {
      const tabList =
        tabListRef.current?.querySelectorAll("[role='tab']") ||
        /* istanbul ignore next */ [];

      return Array.from(tabList)
        .map((tab) => tab.id)
        .filter((id) => id);
    }, []);

    useEffect(() => {
      /* istanbul ignore if */
      if (selectedTabId) {
        setActiveTab(selectedTabId);
        return;
      }

      if (!activeTab) {
        const tabIds = getTabIds();
        const firstTab = tabIds[0];
        setActiveTab(firstTab);
      }
    }, [activeTab, getTabIds, selectedTabId, setActiveTab]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const tabIds = getTabIds();

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

    const [scrollRequired, setScrollRequired] = useState<boolean>(false);
    const [leftVisible, setLeftVisible] = useState<boolean>(false);
    const [rightVisible, setRightVisible] = useState<boolean>(false);

    const updateUI = useCallback(() => {
      /* istanbul ignore else */
      if (tabListRef.current) {
        const maxScrollValue =
          tabListRef.current.scrollWidth - tabListRef.current.clientWidth - 20;
        setScrollRequired(maxScrollValue > 0);
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

    // Difficult to test in Jest owing to the fact that scrolling and offsets
    // would need to be mocked, which is unreliable and potential flake.
    // Implementation will be tested in PW.
    /* istanbul ignore next */
    const onClickHandler = (direction: "left" | "right") => {
      if (tabListRef.current) {
        if (direction === "left") tabListRef.current.scrollLeft -= 200;
        else tabListRef.current.scrollLeft += 200;

        updateUI();
      }
    };

    // Coverage disabled owing to the above comment.
    /* istanbul ignore next */
    const renderLeftScroll = () => {
      if (orientation === "vertical" || !scrollRequired) return null;
      return leftVisible ? (
        <StyledScrollButton
          data-role="tab-navigation-button-left"
          id="tab-navigation-button-left"
          onClick={() => onClickHandler("left")}
          size={size}
          tabIndex={-1}
          title="Scroll Tabs Left"
          type="button"
        >
          <Icon type="chevron_left" />
        </StyledScrollButton>
      ) : (
        <StyledScrollButtonPlaceholder size={size} />
      );
    };

    // Coverage disabled owing to the above comment.
    /* istanbul ignore next */
    const renderRightScroll = () => {
      if (orientation === "vertical" || !scrollRequired) return null;
      return rightVisible ? (
        <StyledScrollButton
          data-role="tab-navigation-button-right"
          id="tab-navigation-button-right"
          onClick={() => onClickHandler("right")}
          size={size}
          tabIndex={-1}
          title="Scroll Tabs Right"
          type="button"
        >
          <Icon type="chevron_right" />
        </StyledScrollButton>
      ) : (
        <StyledScrollButtonPlaceholder size={size} />
      );
    };

    return (
      <>
        <Typography id={"tablist-aria-label"} screenReaderOnly>
          {ariaLabel}
        </Typography>
        <StyledTabListWrapper>
          {renderLeftScroll()}
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
          {renderRightScroll()}
        </StyledTabListWrapper>
      </>
    );
  },
);

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
