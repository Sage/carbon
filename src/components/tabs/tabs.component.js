import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import Tab from "./tab";
import Event from "../../utils/helpers/events/events";
import tagComponent from "../../utils/helpers/tags/tags";
import Browser from "../../utils/helpers/browser/browser";
import StyledTabs from "./tabs.style";
import TabsHeader from "./__internal__/tabs-header";
import TabTitle from "./__internal__/tab-title";
import { SidebarContext } from "../drawer";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Tabs = ({
  align = "left",
  className,
  children,
  onTabChange,
  selectedTabId,
  renderHiddenTabs = true,
  position = "top",
  setLocation = true,
  extendedLine = true,
  size,
  borders = "off",
  variant = "default",
  validationStatusOverride,
  ...rest
}) => {
  const firstRender = useRef(true);
  const tabRefs = useRef([]);
  const previousSelectedTabId = useRef(selectedTabId);
  const [selectedTabIdState, setSelectedTabIdState] = useState();
  const sidebarContext = useContext(SidebarContext);
  const [tabsErrors, setTabsErrors] = useState({});
  const [tabsWarnings, setTabsWarnings] = useState({});
  const [tabsInfos, setTabsInfos] = useState({});
  const _window = Browser.getWindow();
  const isInSidebar = !!(sidebarContext && sidebarContext.isInSidebar);

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      let selectedTab;
      if (selectedTabId) {
        selectedTab = selectedTabId;
      } else {
        const hash = _window.location.hash.substring(1);

        if (Array.isArray(children)) {
          const filteredChildren = children.filter((child) => child);
          let useHash = false;

          if (hash) {
            for (const index in filteredChildren) {
              const child = filteredChildren[index];

              if (child.props.tabId === hash) {
                useHash = true;
                break;
              }
            }
          }

          selectedTab = useHash ? hash : filteredChildren[0].props.tabId;
        } else {
          selectedTab = children.props.tabId;
        }
      }
      setSelectedTabIdState(selectedTab);
    }
  }, [_window.location.hash, children, firstRender, selectedTabId]);

  const updateErrors = useCallback(
    (id, hasError) => {
      if (tabsErrors[id] !== hasError) {
        setTabsErrors({ ...tabsErrors, [id]: hasError });
      }
    },
    [tabsErrors]
  );

  const updateWarnings = useCallback(
    (id, hasWarning) => {
      if (tabsWarnings[id] !== hasWarning) {
        setTabsWarnings({ ...tabsWarnings, [id]: hasWarning });
      }
    },
    [tabsWarnings]
  );

  const updateInfos = useCallback(
    (id, hasInfo) => {
      if (tabsInfos[id] !== hasInfo) {
        setTabsInfos({ ...tabsInfos, [id]: hasInfo });
      }
    },
    [tabsInfos]
  );

  /** Updates the currently visible tab */
  const updateVisibleTab = useCallback(
    (tabid) => {
      if (setLocation && !sidebarContext) {
        const url = `${_window.location.origin}${_window.location.pathname}#${tabid}`;
        _window.history.replaceState(null, "change-tab", url);
      }

      setSelectedTabIdState(tabid);

      if (onTabChange) {
        onTabChange(tabid);
      }
    },
    [
      _window.history,
      _window.location.origin,
      _window.location.pathname,
      sidebarContext,
      onTabChange,
      setLocation,
    ]
  );

  /** Determines if the tab titles are in a vertical format. */
  const isVertical = (currentPosition) => currentPosition === "left";

  /** Handles the changing of tabs with the mouse */
  const handleTabClick = (ev) => {
    if (Event.isEventType(ev, "keydown")) {
      return;
    }

    const { tabid } = ev.target.dataset;
    updateVisibleTab(tabid);
  };

  /** Focuses the tab for the reference specified */
  const focusTab = (ref) => ref.focus();

  /** The children nodes converted into an Array */
  const filteredChildren = () =>
    React.Children.toArray(children).filter((child) => child);

  /** Array of the tabIds for the child nodes */
  const tabIds = () => {
    return filteredChildren().map((child) => child.props.tabId);
  };

  /** Will trigger the tab at the given index. */
  const goToTab = (event, index) => {
    event.preventDefault();
    let newIndex = index;

    const ids = tabIds();

    if (index < 0) {
      newIndex = ids.length - 1;
    } else if (index === ids.length) {
      newIndex = 0;
    }
    const nextTabId = ids[newIndex];
    const nextRef = tabRefs.current[newIndex];
    updateVisibleTab(nextTabId);
    focusTab(nextRef);
  };

  /** Handles the keyboard navigation of tabs */
  const handleKeyDown = (index) => {
    return (event) => {
      const isTabVertical = isVertical(position);
      const isUp = isTabVertical && Event.isUpKey(event);
      const isDown = isTabVertical && Event.isDownKey(event);
      const isLeft = !isTabVertical && Event.isLeftKey(event);
      const isRight = !isTabVertical && Event.isRightKey(event);
      if (isUp || isLeft) {
        goToTab(event, index - 1);
      } else if (isDown || isRight) {
        goToTab(event, index + 1);
      }
    };
  };

  /** Returns true/false for if the given tab id is selected. */
  const isTabSelected = (tabId) => tabId === selectedTabIdState;

  const addRef = (ref) => {
    if (ref && !tabRefs.current.includes(ref)) {
      tabRefs.current.push(ref);
    }
  };

  /** Build the headers for the tab component */
  const renderTabHeaders = () => {
    const tabTitles = filteredChildren().map((child, index) => {
      const {
        tabId,
        title,
        siblings,
        titlePosition,
        errorMessage,
        warningMessage,
        infoMessage,
        href,
        customLayout,
      } = child.props;
      const refId = `${tabId}-tab`;

      const errors = tabsErrors[tabId]
        ? Object.entries(tabsErrors[tabId]).filter((tab) => tab[1] === true)
            .length
        : 0;
      const warnings = tabsWarnings[tabId]
        ? Object.entries(tabsWarnings[tabId]).filter((tab) => tab[1] === true)
            .length
        : 0;
      const infos = tabsInfos[tabId]
        ? Object.entries(tabsInfos[tabId]).filter((tab) => tab[1] === true)
            .length
        : 0;

      const hasOverride =
        validationStatusOverride && validationStatusOverride[tabId];
      const errorOverride =
        hasOverride && validationStatusOverride[tabId].error;
      const warningOverride =
        hasOverride && validationStatusOverride[tabId].warning;
      const infoOverride = hasOverride && validationStatusOverride[tabId].info;
      const tabHasError =
        errorOverride !== undefined ? errorOverride : errors > 0;
      const tabHasWarning =
        warningOverride !== undefined
          ? warningOverride
          : warnings > 0 && !tabHasError;
      const tabHasInfo =
        infoOverride !== undefined
          ? infoOverride
          : infos > 0 && !tabHasError && !tabHasWarning;

      const tabTitle = (
        <TabTitle
          position={sidebarContext ? "left" : position}
          className={child.props.className || ""}
          dataTabId={tabId}
          id={refId}
          key={tabId}
          onClick={handleTabClick}
          onKeyDown={handleKeyDown(index)}
          ref={(node) => addRef(node)}
          tabIndex={isTabSelected(tabId) ? "0" : "-1"}
          title={title}
          href={href}
          isTabSelected={isTabSelected(tabId)}
          error={tabHasError}
          warning={tabHasWarning}
          info={tabHasInfo}
          size={size || "default"}
          borders={borders !== "off"}
          siblings={siblings}
          titlePosition={titlePosition}
          errorMessage={errorMessage}
          warningMessage={warningMessage}
          infoMessage={infoMessage}
          alternateStyling={variant === "alternate"}
          noLeftBorder={["no left side", "no sides"].includes(borders)}
          noRightBorder={["no right side", "no sides"].includes(borders)}
          customLayout={customLayout}
          isInSidebar={isInSidebar}
        />
      );

      return tabTitle;
    });

    return (
      <TabsHeader
        align={align}
        position={sidebarContext ? "left" : position}
        role="tablist"
        extendedLine={extendedLine}
        alternateStyling={variant === "alternate" || !!sidebarContext}
        noRightBorder={["no right side", "no sides"].includes(borders)}
        isInSidebar={isInSidebar}
      >
        {tabTitles}
      </TabsHeader>
    );
  };

  /** Builds the single currently selected tab */
  const visibleTab = () => {
    let tab;

    filteredChildren().forEach((child) => {
      if (isTabSelected(child.props.tabId)) {
        tab = child;
      }
    });

    return tab
      ? React.cloneElement(tab, {
          isTabSelected: isTabSelected(tab.props.tabId),
        })
      : null;
  };

  /** Builds all tabs where non selected tabs have class of hidden */
  const renderTabs = () => {
    if (sidebarContext) return null;

    if (!renderHiddenTabs) {
      return visibleTab();
    }

    const tabs = filteredChildren().map((child) => {
      return React.cloneElement(child, {
        ...child.props,
        role: "tabpanel",
        position,
        isTabSelected: isTabSelected(child.props.tabId),
        key: `${child.props.tabId}-tab`,
        ariaLabelledby: `${child.props.tabId}-tab`,
        updateErrors,
        updateWarnings,
        updateInfos,
      });
    });

    return tabs;
  };

  useEffect(() => {
    if (previousSelectedTabId.current !== selectedTabId) {
      if (selectedTabId !== selectedTabIdState) {
        updateVisibleTab(selectedTabId);
      }
      previousSelectedTabId.current = selectedTabId;
    }
  }, [
    previousSelectedTabId,
    selectedTabId,
    selectedTabIdState,
    updateVisibleTab,
  ]);

  return (
    <StyledTabs
      className={className}
      position={sidebarContext ? "left" : position}
      updateErrors={updateErrors}
      updateWarnings={updateWarnings}
      {...tagComponent("tabs", rest)}
      isInSidebar={isInSidebar}
      mt={position === "left" || isInSidebar ? "0px" : "15px"}
      {...rest}
    >
      {renderTabHeaders()}
      {renderTabs()}
    </StyledTabs>
  );
};

Tabs.propTypes = {
  ...marginPropTypes,
  /** @ignore @private */
  className: PropTypes.string,
  /** Prevent rendering of hidden tabs, by default this is set to true and therefore all tabs will be rendered */
  renderHiddenTabs: PropTypes.bool,
  /** Allows manual control over the currently selected tab. */
  selectedTabId: PropTypes.string,
  /** The child elements of Tabs need to be Tab components. */
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  /** Sets the alignment of the tab titles. Possible values include. */
  align: PropTypes.oneOf(["left", "right"]),
  /** A callback for when a tab is changed. You can use this to manually control
   * tab changing or to fire other events when a tab is changed. */
  onTabChange: PropTypes.func,
  /** The position of the tab title. */
  position: PropTypes.oneOf(["top", "left"]),
  /** Sets the selected tabId in the URL. */
  setLocation: PropTypes.bool,
  /** Sets size of the tab titles. */
  size: PropTypes.oneOf(["default", "large"]),
  /** Sets the divider of the tab titles header to extend the full width of the parent. */
  extendedLine: PropTypes.bool,
  /** Adds a combination of borders to the tab titles. */
  borders: PropTypes.oneOf([
    "off",
    "on",
    "no left side",
    "no right side",
    "no sides",
  ]),
  /** Adds an alternate styling variant to the tab titles. */
  variant: PropTypes.oneOf(["default", "alternate"]),
  /** An object to support overriding validation statuses, when the Tabs have custom targets for example.
   * The `id` property should match the `tabId`s for the rendered Tabs. */
  validationStatusOverride: PropTypes.shape({
    id: PropTypes.shape({
      error: PropTypes.bool,
      warning: PropTypes.bool,
      info: PropTypes.bool,
    }),
  }),
};

export { Tabs, Tab };
