import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import tagComponent, {
  TagProps,
} from "../../../../__internal__/utils/helpers/tags";
import guid from "../../../../__internal__/utils/helpers/guid";
import useResizeObserver from "../../../../hooks/__internal__/useResizeObserver";
import useLocale from "../../../../hooks/__internal__/useLocale";
import usePrevious from "../../../../hooks/__internal__/usePrevious";
import Icon from "../../../icon";
import { useTabs } from "../__internal__/contexts/tabs.context";
import {
  Spacer,
  StyledScrollButton,
  StyledScrollButtonPlaceholder,
  StyledTabList,
  StyledTabListWrapper,
} from "./tab-list.style";

export type TabsHandle = {
  /**
   * Programmatically focus on a specific tab.
   * @param id - The ID of the tab to focus. Must match the `id` prop of the target `Tab` component.
   */
  focusTab: (id: string) => void;
};

export interface TabListProps extends TagProps {
  /** The label read out when the tab list gains focus */
  ariaLabel: string;
  /** The tabs to be shown in the tab list */
  children?: React.ReactNode;
  /** A callback for when the active tab is changed */
  onTabChange?: (tabId: string) => void;

  /**
   * @private @ignore @internal
   */
  headerWidth?: string;
}

export const TabList = forwardRef<TabsHandle, TabListProps>(
  (
    { ariaLabel, children, onTabChange, headerWidth, ...rest }: TabListProps,
    ref,
  ) => {
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
    const idLeftNav = useRef(guid());
    const idRightNav = useRef(guid());
    const idTabList = useRef(guid());
    const locale = useLocale();

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

    const prevActiveTab = usePrevious(activeTab);

    useEffect(() => {
      if (prevActiveTab && prevActiveTab !== activeTab) {
        onTabChange?.(activeTab);
      }
    }, [activeTab, onTabChange, prevActiveTab]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
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
          case "Tab":
            setFocusIndex(activeTab);
            return;
          /* istanbul ignore next */
          default:
            return;
        }

        setFocusIndex(tabIds[nextIndex]);
      },
      [
        activeTab,
        focusIndex,
        getTabIds,
        orientation,
        setActiveTab,
        setFocusIndex,
      ],
    );

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
          id={`tab-navigation-button-left-${idLeftNav.current}`}
          onClick={() => onClickHandler("left")}
          $size={size}
          tabIndex={-1}
          title={locale.tabs.scrollLeftText?.()}
          type="button"
        >
          <Icon type="chevron_left" />
        </StyledScrollButton>
      ) : (
        <StyledScrollButtonPlaceholder $size={size} />
      );
    };

    // Coverage disabled owing to the above comment.
    /* istanbul ignore next */
    const renderRightScroll = () => {
      if (orientation === "vertical" || !scrollRequired) return null;
      return rightVisible ? (
        <StyledScrollButton
          data-role="tab-navigation-button-right"
          id={`tab-navigation-button-right-${idRightNav.current}`}
          onClick={() => onClickHandler("right")}
          $size={size}
          tabIndex={-1}
          title={locale.tabs.scrollRightText?.()}
          type="button"
        >
          <Icon type="chevron_right" />
        </StyledScrollButton>
      ) : (
        <StyledScrollButtonPlaceholder $size={size} />
      );
    };

    return (
      <>
        <StyledTabListWrapper
          $headerWidth={headerWidth}
          data-role="tab-list-wrapper"
        >
          {renderLeftScroll()}
          <StyledTabList
            aria-label={ariaLabel}
            id={`tablist-${idTabList.current}`}
            onKeyDown={handleKeyDown}
            onScroll={updateUI}
            $orientation={orientation}
            $scrollRequired={scrollRequired}
            ref={tabListRef}
            role="tablist"
            tabIndex={-1}
            {...tagComponent("tab-list", rest)}
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

export default TabList;
