import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  createRef,
  cloneElement,
  Children,
} from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import Tab from "./tab";
import Event from "../../__internal__/utils/helpers/events";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledTabs from "./tabs.style";
import TabsHeader from "./__internal__/tabs-header";
import TabTitle from "./__internal__/tab-title";
import { DrawerSidebarContext } from "../drawer";
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
  extendedLine = true,
  size,
  borders = "off",
  variant = "default",
  validationStatusOverride,
  headerWidth,
  ...rest
}) => {
  /** The children nodes converted into an Array */
  const filteredChildren = useMemo(
    () => Children.toArray(children).filter((child) => child),
    [children]
  );

  /** Array of the tabIds for the child nodes */
  const tabIds = () => {
    return filteredChildren.map((child) => child.props.tabId);
  };

  /** Array of refs to the TabTitle nodes */
  const tabRefs = useMemo(
    () =>
      Array.from({ length: filteredChildren.length }).map(() => createRef()),
    [filteredChildren.length]
  );

  const previousSelectedTabId = useRef(selectedTabId);
  const [selectedTabIdState, setSelectedTabIdState] = useState();
  const [tabStopId, setTabStopId] = useState();
  const { isInSidebar } = useContext(DrawerSidebarContext);
  const [tabsErrors, setTabsErrors] = useState({});
  const [tabsWarnings, setTabsWarnings] = useState({});
  const [tabsInfos, setTabsInfos] = useState({});

  useLayoutEffect(() => {
    const selectedTab =
      selectedTabId || Children.toArray(children)[0].props.tabId;

    if (!tabIds().includes(selectedTabId)) {
      setTabStopId(React.Children.toArray(children)[0].props.tabId);
    } else {
      setTabStopId(selectedTab);
    }

    setSelectedTabIdState(selectedTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  /** Returns true/false for if the given tab id is selected. */
  const isTabSelected = useCallback((tabId) => tabId === selectedTabIdState, [
    selectedTabIdState,
  ]);

  const hasTabStop = useCallback((tabId) => tabId === tabStopId, [tabStopId]);

  /** Updates the currently visible tab */
  const updateVisibleTab = useCallback(
    (tabid) => {
      if (!isTabSelected(tabid)) {
        setSelectedTabIdState(tabid);
      }
      if (!hasTabStop(tabid)) {
        setTabStopId(tabid);
      }
      if (onTabChange) {
        onTabChange(tabid);
      }
    },
    [onTabChange, isTabSelected, hasTabStop]
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
  const focusTab = (ref) => ref.current.focus();

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
    const nextRef = tabRefs[newIndex];
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

  /** Build the headers for the tab component */
  const renderTabHeaders = () => {
    const tabTitles = filteredChildren.map((child, index) => {
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
          position={isInSidebar ? "left" : position}
          className={child.props.className || ""}
          dataTabId={tabId}
          id={refId}
          key={tabId}
          onClick={handleTabClick}
          onKeyDown={handleKeyDown(index)}
          ref={tabRefs[index]}
          tabIndex={isTabSelected(tabId) || hasTabStop(tabId) ? "0" : "-1"}
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
          onFocus={() => {
            if (!hasTabStop(tabId)) {
              setTabStopId(tabId);
            }
            if (!isTabSelected(tabId)) {
              updateVisibleTab(tabId);
            }
          }}
        />
      );

      return tabTitle;
    });

    return (
      <TabsHeader
        align={align}
        position={isInSidebar ? "left" : position}
        role="tablist"
        extendedLine={extendedLine}
        alternateStyling={variant === "alternate" || isInSidebar}
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

    filteredChildren.forEach((child) => {
      if (isTabSelected(child.props.tabId)) {
        tab = child;
      }
    });

    return tab
      ? cloneElement(tab, {
          ...tab.props,
          role: "tabpanel",
          position,
          isTabSelected: isTabSelected(tab.props.tabId),
          key: `${tab.props.tabId}-tab`,
          ariaLabelledby: `${tab.props.tabId}-tab`,
          updateErrors,
          updateWarnings,
          updateInfos,
        })
      : null;
  };

  /** Builds all tabs where non selected tabs have class of hidden */
  const renderTabs = () => {
    if (isInSidebar) return null;

    if (!renderHiddenTabs) {
      return visibleTab();
    }

    const tabs = filteredChildren.map((child) => {
      return cloneElement(child, {
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
        setSelectedTabIdState(selectedTabId);
      }
      previousSelectedTabId.current = selectedTabId;
    }
  }, [previousSelectedTabId, selectedTabId, selectedTabIdState]);

  return (
    <StyledTabs
      className={className}
      position={isInSidebar ? "left" : position}
      updateErrors={updateErrors}
      updateWarnings={updateWarnings}
      {...tagComponent("tabs", rest)}
      isInSidebar={isInSidebar}
      headerWidth={headerWidth}
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  /** Sets the alignment of the tab titles. Possible values include. */
  align: PropTypes.oneOf(["left", "right"]),
  /** A callback for when a tab is changed. You can use this to manually control
   * tab changing or to fire other events when a tab is changed. */
  onTabChange: PropTypes.func,
  /** The position of the tab title. */
  position: PropTypes.oneOf(["top", "left"]),
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
  /** sets width to the tab headers. Can be any valid CSS string.
   * The headerWidth prop works only for `position="left"`
   */
  headerWidth: (props, propName, componentName) => {
    if (props.position !== "left" && props[propName] !== undefined) {
      return new Error(
        `Invalid usage of prop ${propName} in ${componentName}. The ${propName} can be used only if position is set to left`
      );
    }

    return null;
  },
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
