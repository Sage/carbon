import React, { useMemo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { PaddingProps, MarginProps } from "styled-system";

import Box from "../box";
import useMediaQuery from "../../hooks/useMediaQuery";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
} from "../../style/utils";

import { StyledAdaptiveSidebar, StyledSidebar } from "./adaptive-sidebar.style";
import { TagProps } from "../../__internal__/utils/helpers/tags";

export interface AdaptiveSidebarProps
  extends MarginProps,
    PaddingProps,
    Omit<TagProps, "data-component"> {
  /** The breakpoint (in pixels) at which the sidebar will convert to a dialog-based sidebar */
  adaptiveBreakpoint?: number;
  /** The time in milliseconds for the sidebar to animate */
  animationTimeout?: number;
  /** The background color of the sidebar */
  backgroundColor?: "white" | "black" | "app";
  /** The content of the sidebar */
  children?: React.ReactNode;
  /** The height of the sidebar, relative to the wrapping component */
  height?: string;
  /** Whether the sidebar is open or closed */
  open: boolean;
  /** Whether to render the sidebar as a modal component instead of as an inline sidebar */
  renderAsModal?: boolean;
  /** The width of the sidebar */
  width?: string;
}

export const AdaptiveSidebar = ({
  adaptiveBreakpoint = 768,
  animationTimeout = 300,
  backgroundColor = "white",
  children,
  height = "100%",
  open,
  renderAsModal = false,
  width = "320px",
  ...props
}: AdaptiveSidebarProps) => {
  const largeScreen = useIsAboveBreakpoint(adaptiveBreakpoint);
  const adaptiveSidebarRef = useRef<HTMLDivElement>(null);

  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  const timeout = reduceMotion ? 0 : animationTimeout;

  const colours = useMemo(() => {
    switch (backgroundColor) {
      case "app":
        return {
          backgroundColor: "var(--colorsUtilityMajor025)",
          color: "var(--colorsUtilityYin090)",
        };
      case "black":
        return {
          backgroundColor: "var(--colorsUtilityYin100)",
          color: "var(--colorsUtilityYang100)",
        };
      case "white":
      default:
        return {
          backgroundColor: "var(--colorsUtilityYang100)",
          color: "var(--colorsUtilityYin090)",
        };
    }
  }, [backgroundColor]);

  if (renderAsModal || !largeScreen) {
    return (
      <StyledSidebar open={open} p={0} backgroundColor={backgroundColor}>
        <Box
          height="100%"
          data-role="adaptive-sidebar-content-wrapper"
          {...colours}
        >
          {children}
        </Box>
      </StyledSidebar>
    );
  }

  return (
    <CSSTransition
      nodeRef={adaptiveSidebarRef}
      in={open}
      timeout={timeout}
      unmountOnExit
    >
      <StyledAdaptiveSidebar
        backgroundColor={backgroundColor}
        data-element="adaptive-sidebar"
        data-role="adaptive-sidebar"
        height={height}
        reduceMotion={reduceMotion}
        ref={adaptiveSidebarRef}
        transitionTime={timeout}
        width={width}
        {...filterStyledSystemMarginProps(props)}
        {...filterStyledSystemPaddingProps(props)}
      >
        <Box data-role="adaptive-sidebar-content-wrapper">{children}</Box>
      </StyledAdaptiveSidebar>
    </CSSTransition>
  );
};

export default AdaptiveSidebar;
