import React, { useCallback, useEffect, useRef, useState } from "react";
import useResizeObserver from "../../../../hooks/__internal__/useResizeObserver";

import StyledIcon from "../../../icon/icon.style";

import {
  StyledTabsHeaderWrapper,
  StyledTabsHeaderList,
  StyledVerticalTabsWrapper,
  StyledWrapper,
  StyledNavigationButtonWrapper,
  StyledNavigationButton,
  StyledContainer,
  StyledBottomBorder,
} from "./tabs-header.style";

export interface TabHeaderProps {
  role?: string;
  position?: "top" | "left";
  extendedLine?: boolean;
  noRightBorder?: boolean;
  isInSidebar?: boolean;
  children: React.ReactNode;
  align?: "left" | "right";
  size?: "default" | "large";
}

const TabsHeader = ({
  align = "left",
  children,
  position = "top",
  role,
  extendedLine,
  noRightBorder = false,
  isInSidebar = false,
  size = "default",
}: TabHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { current } = ref;
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  const updateUI = useCallback(() => {
    if (current) {
      const maxScrollValue = current.scrollWidth - current.clientWidth - 20;
      setLeftVisible(current.scrollLeft >= 20);
      setRightVisible(current.scrollLeft <= maxScrollValue);
    }
  }, [current]);

  useResizeObserver(ref, () => {
    updateUI();
  });

  useEffect(() => {
    if (current) {
      updateUI();
    }
  }, [current, updateUI]);

  function handleKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    /* istanbul ignore if */
    if (!current) return;

    const { key } = ev;
    if (key === "ArrowLeft") {
      updateUI();
    } else if (key === "ArrowRight") {
      updateUI();
    }
  }

  if (position === "left") {
    return (
      <StyledTabsHeaderWrapper isInSidebar={isInSidebar} position="left">
        <StyledTabsHeaderList
          align={align}
          position="left"
          role={role}
          extendedLine={extendedLine}
          noRightBorder={noRightBorder}
          isInSidebar={isInSidebar}
          ref={ref}
        >
          <StyledVerticalTabsWrapper isInSidebar={isInSidebar}>
            {children}
          </StyledVerticalTabsWrapper>
        </StyledTabsHeaderList>
      </StyledTabsHeaderWrapper>
    );
  }

  return (
    <StyledWrapper
      id="tab-header-wrapper"
      data-role="tab-header-wrapper"
      align={align}
      position="top"
      extendedLine={extendedLine}
      noRightBorder={noRightBorder}
      onKeyDown={handleKeyDown}
    >
      <StyledNavigationButtonWrapper
        position="left"
        visible={leftVisible}
        id="tab-navigation-button-wrapper-left"
        data-role="tab-navigation-button-wrapper-left"
        size={size}
      >
        <StyledNavigationButton
          tabIndex={-1}
          title="Scroll Tabs Left"
          id="tab-navigation-button-left"
          data-role="tab-navigation-button-left"
          onClick={() => {
            /* istanbul ignore if */
            if (current) {
              current.scrollLeft -= 200;
              updateUI();
            }
          }}
        >
          <StyledIcon type="chevron_left" />
        </StyledNavigationButton>
      </StyledNavigationButtonWrapper>

      <StyledContainer
        ref={ref}
        id="tab-container"
        role={role}
        data-role="tab-container"
        size={size}
      >
        <StyledBottomBorder />
        {children}
      </StyledContainer>

      <StyledNavigationButtonWrapper
        position="right"
        visible={rightVisible}
        id="tab-navigation-button-wrapper-right"
        data-role="tab-navigation-button-wrapper-right"
        size={size}
      >
        <StyledNavigationButton
          tabIndex={-1}
          title="Scroll Tabs Right"
          id="tab-navigation-button-right"
          data-role="tab-navigation-button-right"
          onClick={() => {
            /* istanbul ignore if */
            if (current) {
              current.scrollLeft += 200;
              updateUI();
            }
          }}
        >
          <StyledIcon type="chevron_right" />
        </StyledNavigationButton>
      </StyledNavigationButtonWrapper>
    </StyledWrapper>
  );
};

export default TabsHeader;
