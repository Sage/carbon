import React, {
  useCallback,
  useContext,
  useEffect,
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
  showValidationsSummary,
  ...rest
}) => {
  /** The children nodes converted into an Array */
  const filteredChildren = useMemo(
    () => Children.toArray(children).filter((child) => child),
    [children]
  );

  /** Array of the tabIds for the child nodes */
  const tabIds = useMemo(
    () => filteredChildren.map((child) => child.props.tabId),
    [filteredChildren]
  );

  /** Array of refs to the TabTitle nodes */
  const tabRefs = useMemo(
    () =>
      Array.from({ length: filteredChildren.length }).map(() => createRef()),
    [filteredChildren.length]
  );

  const previousSelectedTabId = useRef(selectedTabId);
  const [selectedTabIdState, setSelectedTabIdState] = useState(
    selectedTabId || filteredChildren[0].props.tabId
  );
  const [tabStopId, setTabStopId] = useState();
  const { isInSidebar } = useContext(DrawerSidebarContext);
  const [tabsErrors, setTabsErrors] = useState({});
  const [tabsWarnings, setTabsWarnings] = useState({});
  const [tabsInfos, setTabsInfos] = useState({});

  const updateErrors = useCallback((id, error) => {
    setTabsErrors((state) => ({ ...state, [id]: error }));
  }, []);

  const updateWarnings = useCallback((id, warning) => {
    setTabsWarnings((state) => ({ ...state, [id]: warning }));
  }, []);

  const updateInfos = useCallback((id, info) => {
    setTabsInfos((state) => ({ ...state, [id]: info }));
  }, []);

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

  const blurPreviousSelectedTab = useCallback(() => {
    const previousTabIndex = tabIds.indexOf(previousSelectedTabId.current);
    /* istanbul ignore else */
    if (previousTabIndex !== -1) {
      const previousTabRef = tabRefs[previousTabIndex];
      previousTabRef.current?.blur();
    }
  }, [tabIds, tabRefs]);

  useEffect(() => {
    if (previousSelectedTabId.current !== selectedTabId) {
      if (selectedTabId !== selectedTabIdState) {
        setSelectedTabIdState(selectedTabId);
        blurPreviousSelectedTab();
      }
      previousSelectedTabId.current = selectedTabId;
    }
  }, [
    blurPreviousSelectedTab,
    previousSelectedTabId,
    selectedTabId,
    selectedTabIdState,
  ]);

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

    if (index < 0) {
      newIndex = tabIds.length - 1;
    } else if (index === tabIds.length) {
      newIndex = 0;
    }
    const nextTabId = tabIds[newIndex];
    const nextRef = tabRefs[newIndex];
    updateVisibleTab(nextTabId);
    focusTab(nextRef);
  };

  /** Handles the keyboard navigation of tabs */
  const handleKeyDown = (index) => {
    return (event) => {
      const isTabVertical = isInSidebar || position === "left";
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
      const errors = tabsErrors[tabId];
      const warnings = tabsWarnings[tabId];
      const infos = tabsInfos[tabId];

      const errorsCount =
        errors && Object.entries(errors).filter((tab) => tab[1]).length;
      const warningsCount =
        warnings && Object.entries(warnings).filter((tab) => tab[1]).length;
      const infosCount =
        infos && Object.entries(infos).filter((tab) => tab[1]).length;

      const hasOverride =
        validationStatusOverride && validationStatusOverride[tabId];
      const errorOverride =
        hasOverride && validationStatusOverride[tabId].error;
      const warningOverride =
        hasOverride && validationStatusOverride[tabId].warning;
      const infoOverride = hasOverride && validationStatusOverride[tabId].info;
      const tabHasError =
        errorOverride !== undefined ? errorOverride : !!errorsCount;
      const tabHasWarning =
        warningOverride !== undefined
          ? warningOverride
          : !!warningsCount && !tabHasError;
      const tabHasInfo =
        infoOverride !== undefined
          ? infoOverride
          : !!infosCount && !tabHasError && !tabHasWarning;

      const getValidationMessage = (message, validations = {}) => {
        const summaryOfMessages = Object.values(validations).filter(
          (value) => value && typeof value === "string"
        );

        if (!showValidationsSummary || !summaryOfMessages.length) {
          return message;
        }

        if (summaryOfMessages.length === 1) {
          return summaryOfMessages[0];
        }

        return summaryOfMessages.map((value) => `• ${value}`).join("\n");
      };

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
          errorMessage={getValidationMessage(errorMessage, errors)}
          warningMessage={getValidationMessage(warningMessage, warnings)}
          infoMessage={getValidationMessage(infoMessage, infos)}
          alternateStyling={variant === "alternate"}
          noLeftBorder={["no left side", "no sides"].includes(borders)}
          noRightBorder={["no right side", "no sides"].includes(borders)}
          customLayout={customLayout}
          isInSidebar={isInSidebar}
          align={align}
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
    const tab = filteredChildren.find((child) =>
      isTabSelected(child.props.tabId)
    );

    return (
      tab &&
      cloneElement(tab, {
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
    );
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
  /** When this prop is set any string validation failures in the children of each Tab
   * will be summaraised in the Tooltip next to the Tab title
   */
  showValidationsSummary: PropTypes.bool,
};

export { Tabs, Tab };
