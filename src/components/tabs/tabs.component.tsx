import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { MarginProps } from "styled-system";
import Tab from "./tab";
import Event from "../../__internal__/utils/helpers/events";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import Logger from "../../__internal__/utils/logger";
import StyledTabs from "./tabs.style";
import TabsHeader from "./__internal__/tabs-header";
import TabTitle from "./__internal__/tab-title";
import DrawerSidebarContext from "../drawer/__internal__/drawer-sidebar.context";
import usePrevious from "../../hooks/__internal__/usePrevious";

export type TabsHandle = {
  /**
   * Programmatically focus on a specific tab.
   * @param tabId - The ID of the tab to focus. Must match the `tabId` prop of the target `Tab` component.
   */
  focusTab: (tabId: string) => void;
} | null;

export interface TabsProps extends MarginProps, TagProps {
  /** Prevent rendering of hidden tabs, by default this is set to true and therefore all tabs will be rendered */
  renderHiddenTabs?: boolean;
  /** Allows manual control over the currently selected tab. */
  selectedTabId?: string;
  /** The child elements of Tabs need to be Tab components. */
  children: React.ReactNode;
  /**
   * Sets the alignment of the tab titles. Possible values include.
   * @deprecated In a future release, support for right-aligned tab content will be removed.
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
   * @deprecated This prop will be deprecated in a future release
   * */
  extendedLine?: boolean;
  /**
   * Adds a combination of borders to the tab titles.
   * @deprecated This prop will be deprecated in a future release
   * */
  borders?: "off" | "on" | "no left side" | "no right side" | "no sides";
  /** Adds an alternate styling variant to the tab titles. */
  variant?: "default" | "alternate";
  /** sets width to the tab headers. Can be any valid CSS string.
   * The headerWidth prop works only for `position="left"`
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
   * @deprecated This prop will be deprecated in a future release
   */
  showValidationsSummary?: boolean;
}

let deprecatedRightAlignedTabContentWarningTriggered = false;
let deprecatedExtendedLineWarningTriggered = false;
let deprecatedBordersWarningTriggered = false;
let deprecatedValidationSummaryWarningTriggered = false;
let deprecateCurrentImplementationWarningTriggered = false;

const Tabs = forwardRef<TabsHandle, TabsProps>(
  (
    {
      align = "left",
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
    },
    ref,
  ) => {
    if (!deprecateCurrentImplementationWarningTriggered) {
      Logger.deprecate(
        "The current implementation of the `Tabs` component is deprecated and will be changing in a future release.",
      );
      deprecateCurrentImplementationWarningTriggered = true;
    }

    if (
      !!showValidationsSummary &&
      !deprecatedValidationSummaryWarningTriggered
    ) {
      Logger.deprecate(
        "The `showValidationsSummary` prop in the `Tabs` component is deprecated and will be removed in a future release.",
      );
      deprecatedValidationSummaryWarningTriggered = true;
    }

    if (
      align === "right" &&
      !deprecatedRightAlignedTabContentWarningTriggered
    ) {
      Logger.deprecate(
        "Support for the `right` value of `align` in the `Tabs` component is deprecated and will be removed in a future release.",
      );
      deprecatedRightAlignedTabContentWarningTriggered = true;
    }

    if (!extendedLine && !deprecatedExtendedLineWarningTriggered) {
      Logger.deprecate(
        "The `extendedLine` prop in the `Tabs` component is deprecated and will be removed in a future release.",
      );
      deprecatedExtendedLineWarningTriggered = true;
    }

    if (borders !== "off" && !deprecatedBordersWarningTriggered) {
      Logger.deprecate(
        "The `borders` prop in the `Tabs` component is deprecated and will be removed in a future release.",
      );
      deprecatedBordersWarningTriggered = true;
    }

    if (position !== "left" && headerWidth !== undefined) {
      Logger.error(
        "Invalid usage of prop headerWidth in Tabs. The headerWidth can be used only if position is set to left",
      );
    }

    /** The children nodes converted into an Array */
    const filteredChildren = useMemo(
      () => Children.toArray(children).filter((child) => child),
      [children],
    ) as ReactElement<ComponentProps<typeof Tab>>[];

    /** Array of the tabIds for the child nodes */
    const tabIds = useMemo(
      () => filteredChildren.map((child) => child.props.tabId),
      [filteredChildren],
    );

    /** Array of refs to the TabTitle nodes */
    const tabRefs = useMemo<React.RefObject<HTMLElement>[]>(
      () =>
        Array.from({ length: filteredChildren.length }).map(() => createRef()),
      [filteredChildren.length],
    );

    const previousSelectedTabId = useRef(selectedTabId);
    const [selectedTabIdState, setSelectedTabIdState] = useState<
      string | undefined
    >(selectedTabId || filteredChildren[0].props.tabId);

    const { isInSidebar } = useContext(DrawerSidebarContext);
    const [tabsErrors, setTabsErrors] = useState<
      Record<string, Record<string, undefined | string | boolean>>
    >({});
    const [tabsWarnings, setTabsWarnings] = useState<
      Record<string, Record<string, undefined | string | boolean>>
    >({});
    const [tabsInfos, setTabsInfos] = useState<
      Record<string, Record<string, undefined | string | boolean>>
    >({});

    const updateErrors = useCallback(
      (id: string, error: Record<string, undefined | string | boolean>) => {
        setTabsErrors((state) => ({ ...state, [id]: error }));
      },
      [],
    );

    const updateWarnings = useCallback(
      (id: string, warning: Record<string, undefined | string | boolean>) => {
        setTabsWarnings((state) => ({ ...state, [id]: warning }));
      },
      [],
    );

    const updateInfos = useCallback(
      (id: string, info: Record<string, undefined | string | boolean>) => {
        setTabsInfos((state) => ({ ...state, [id]: info }));
      },
      [],
    );

    /** Returns true/false for if the given tab id is selected. */
    const isTabSelected = useCallback(
      (tabId: string) => tabId === selectedTabIdState,
      [selectedTabIdState],
    );

    /** Updates the currently visible tab */
    const updateVisibleTab = useCallback(
      (tabid: string) => {
        if (!isTabSelected(tabid)) {
          setSelectedTabIdState(tabid);
        }
        if (onTabChange) {
          onTabChange(tabid);
        }
      },
      [onTabChange, isTabSelected],
    );

    const blurPreviousSelectedTab = useCallback(() => {
      const { current } = previousSelectedTabId;
      const previousTabIndex = current
        ? tabIds.indexOf(current)
        : /* istanbul ignore next */ -1;
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

    const createTabClickHandler =
      (tabId: string) => (ev: React.MouseEvent<HTMLElement>) => {
        // istanbul ignore if
        // (code doesn't seem to be ever reached - FE-6835 raised to investigate and hopefully remove this)
        if (Event.isEventType(ev, "keydown")) {
          return;
        }

        updateVisibleTab(tabId);
      };

    /** Focuses the tab for the reference specified */
    const focusTab = (ref: React.RefObject<HTMLElement>) => {
      ref.current?.focus();
      /* istanbul ignore next */
      const rect = ref.current?.getBoundingClientRect();
      /* istanbul ignore next */
      if (rect) {
        const isVisible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth);
        if (!isVisible) {
          ref.current?.scrollIntoView({ behavior: "auto", inline: "center" });
        }
      }
    };

    /** Will trigger the tab at the given index. */
    const goToTab = (
      event: React.KeyboardEvent<HTMLElement>,
      index: number,
    ) => {
      event.preventDefault();
      let newIndex = index;

      if (index < 0) {
        newIndex = tabIds.length - 1;
      } else if (index === tabIds.length) {
        newIndex = 0;
      }
      const nextRef = tabRefs[newIndex];
      focusTab(nextRef);
    };

    const createTabKeydownHandler =
      (index: number) => (event: React.KeyboardEvent<HTMLElement>) => {
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

    useImperativeHandle<TabsHandle, TabsHandle>(
      ref,
      () => ({
        focusTab(tabId) {
          const tabRef =
            tabRefs[
              filteredChildren.findIndex((child) => child.props.tabId === tabId)
            ];
          if (tabRef) {
            focusTab(tabRef);
          }
        },
      }),
      [filteredChildren, tabRefs],
    );

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
          titleProps,
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
        const infoOverride =
          hasOverride && validationStatusOverride[tabId].info;
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

        const getValidationMessage = (
          message: string | undefined,
          validations: Record<string, undefined | string | boolean> = {},
        ): string | undefined => {
          const summaryOfMessages = Object.values(validations).filter(
            (value) => value && typeof value === "string",
          ) as string[];

          if (!showValidationsSummary || !summaryOfMessages.length) {
            return message;
          }

          if (summaryOfMessages.length === 1) {
            return summaryOfMessages[0];
          }

          return summaryOfMessages.map((value) => `• ${value}`).join("\n");
        };

        return (
          <TabTitle
            {...titleProps}
            position={isInSidebar ? "left" : position}
            dataTabId={tabId}
            id={refId}
            key={tabId}
            onClick={createTabClickHandler(tabId)}
            onKeyDown={createTabKeydownHandler(index)}
            ref={tabRefs[index]}
            tabIndex={isTabSelected(tabId) ? 0 : -1}
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
      });

      return (
        <TabsHeader
          align={align}
          position={isInSidebar ? "left" : position}
          role="tablist"
          extendedLine={extendedLine}
          noRightBorder={["no right side", "no sides"].includes(borders)}
          isInSidebar={isInSidebar}
          size={size || "default"}
        >
          {tabTitles}
        </TabsHeader>
      );
    };

    const [selectedTabIdInternal, setSelectedTabIdInternal] = useState<
      string | undefined
    >(selectedTabId || tabData[0]?.props.id || tabData[0]?.props.tabId);
    const mappedSize = size === "default" ? "medium" : "large";
    const { isInSidebar } = React.useContext(DrawerSidebarContext);
    const orientation =
      isInSidebar || position === "left" ? "vertical" : "horizontal";

      if (!renderHiddenTabs) {
        const tab = filteredChildren.find((child) =>
          isTabSelected(child.props.tabId),
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
      }

      return filteredChildren.map((child) => {
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
    };

    const previousSelectedTabId = usePrevious(selectedTabId);

    useEffect(() => {
      if (
        selectedTabId !== previousSelectedTabId &&
        selectedTabId !== selectedTabIdInternal
      ) {
        setSelectedTabIdInternal(selectedTabId);
      }
    }, [selectedTabId, previousSelectedTabId, selectedTabIdInternal]);

    return (
      <NextTabs
        orientation={orientation}
        selectedTabId={selectedTabIdInternal}
        size={mappedSize}
        {...rest}
        {...tagComponent("tabs", rest)}
      >
        <NextTabList
          ref={ref}
          ariaLabel="Tabs"
          onTabChange={(id) => {
            setSelectedTabIdInternal(id);
            onTabChange?.(id);
          }}
          headerWidth={isInSidebar ? "100%" : undefined}
        >
          {tabData.map(({ props }) => {
            const idToUse = props.id || props.tabId;
            if (!idToUse) {
              Logger.warn(
                "Warning: Tab component is missing a unique identifier. Please provide an `id` prop to ensure proper functionality.",
              );
              return null;
            }

            return (
              <Tab
                headerWidth={isInSidebar ? "100%" : headerWidth}
                {...props}
                key={idToUse}
              />
            );
          })}
        </NextTabList>

        {!isInSidebar &&
          tabPanelsToRender.map(({ props }) => {
            const idToUse = props.id || props.tabId;
            if (!idToUse) {
              Logger.warn(
                "Warning: Each `Tab` component must have an `id` or `tabId` prop to associate it with a TabPanel.",
              );
              return null;
            }

            return (
              <NextTabPanel
                key={`${idToUse}-panel`}
                id={`${idToUse}-panel`}
                tabId={idToUse}
              >
                {props.children}
              </NextTabPanel>
            );
          })}
      </NextTabs>
    );
  },
);

export { Tabs, Tab };
