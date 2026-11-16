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
      // only called while the tab list is mounted
      const tabList = tabListRef.current as HTMLDivElement;

      return Array.from(tabList.querySelectorAll("[role='tab']"))
        .map((tab) => tab.id)
        .filter((id) => id);
    }, []);

    useEffect(() => {
      if (!activeTab) {
        const tabIds = getTabIds();
        const firstTab = tabIds[0];
        setActiveTab(firstTab);
      }
    }, [activeTab, getTabIds, setActiveTab]);

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
            if (orientation === "vertical") {
              nextIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
            }
            break;
          case "ArrowDown":
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
      // only called while the tab list is mounted
      const tabList = tabListRef.current as HTMLDivElement;
      const maxScrollValue = tabList.scrollWidth - tabList.clientWidth - 20;
      setScrollRequired(maxScrollValue > 0);
      setLeftVisible(tabList.scrollLeft >= 20);
      setRightVisible(tabList.scrollLeft <= maxScrollValue);
    }, []);

    useResizeObserver(tabListRef, () => {
      updateUI();
    });

    useEffect(() => {
      updateUI();
    }, [updateUI]);

    const onClickHandler = (direction: "left" | "right") => {
      const tabList = tabListRef.current as HTMLDivElement;
      if (direction === "left") tabList.scrollLeft -= 200;
      else tabList.scrollLeft += 200;

      updateUI();
    };

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
          <Icon aria-hidden={true} type="chevron_left" />
        </StyledScrollButton>
      ) : (
        <StyledScrollButtonPlaceholder $size={size} />
      );
    };

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
          <Icon aria-hidden={true} type="chevron_right" />
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
            ref={tabListRef}
            role="tablist"
            aria-orientation={
              orientation === "vertical" ? "vertical" : "horizontal"
            }
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
