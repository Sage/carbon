import React, { useRef, useState } from "react";
import {
  StyledTabsHeaderWrapper,
  StyledTabsHeaderList,
  StyledTabsBottomBorder,
  StyledTabsWrapper,
  StyledTabsBottomBorderWrapper,
  StyledVerticalTabsWrapper,
} from "./tabs-header.style";
import useThrottle from "../../../../hooks/__internal__/useThrottle";

/*  In the original prototype the tabs have shadows that fade out as you scroll horizontally.
 *  This value is the closest replication to the way that the shadow disappears.
 *  It is ultimately tied to the position of the scroll that will then fade the shadow in and out. */
const fullOpacityThreshold = 128;

const getOpacityRatio = (value: number) => value / fullOpacityThreshold;

const getScrollRight = ({
  scrollWidth,
  clientWidth,
  scrollLeft,
}: HTMLDivElement) => scrollWidth - clientWidth - scrollLeft;

export interface TabHeaderProps {
  role?: string;
  position?: "top" | "left";
  extendedLine?: boolean;
  noRightBorder?: boolean;
  isInSidebar?: boolean;
  children: React.ReactNode;
  align?: "left" | "right";
}

const TabsHeader = ({
  align = "left",
  children,
  position = "top",
  role,
  extendedLine,
  noRightBorder = false,
  isInSidebar = false,
}: TabHeaderProps) => {
  const [leftScrollOpacity, setLeftScrollOpacity] = useState(0);
  const [rightScrollOpacity, setRightScrollOpacity] = useState(1);

  const ref = useRef<HTMLDivElement>(null);

  let isScrollable = false;

  const { current } = ref;

  if (position === "top" && current) {
    isScrollable = current.scrollWidth > current.clientWidth;
  }

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement },
  ) => {
    const { scrollLeft } = e.target;
    const scrollRight = getScrollRight(e.target);

    setLeftScrollOpacity(Math.min(getOpacityRatio(scrollLeft), 1));
    setRightScrollOpacity(Math.min(getOpacityRatio(scrollRight), 1));
  };

  const throttledHandleScroll = useThrottle(handleScroll, 50);

  return (
    <StyledTabsHeaderWrapper isInSidebar={isInSidebar} position={position}>
      <StyledTabsHeaderList
        align={align}
        position={position}
        role={role}
        extendedLine={extendedLine}
        noRightBorder={noRightBorder}
        isInSidebar={isInSidebar}
        onScroll={throttledHandleScroll}
        leftScrollOpacity={leftScrollOpacity}
        rightScrollOpacity={rightScrollOpacity}
        isScrollable={isScrollable}
        ref={ref}
      >
        {position === "top" ? (
          <StyledTabsWrapper>
            <StyledTabsBottomBorderWrapper>
              <StyledTabsBottomBorder />
            </StyledTabsBottomBorderWrapper>
            {children}
          </StyledTabsWrapper>
        ) : (
          <StyledVerticalTabsWrapper isInSidebar={isInSidebar}>
            {children}
          </StyledVerticalTabsWrapper>
        )}
      </StyledTabsHeaderList>
    </StyledTabsHeaderWrapper>
  );
};

export default TabsHeader;
