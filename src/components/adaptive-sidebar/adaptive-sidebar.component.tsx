import React, { useEffect, useRef } from "react";

import { PaddingProps, MarginProps } from "styled-system";

import { getColors, kebabToCamelCase } from "./__internal__/utils";

import Box from "../box";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
} from "../../style/utils";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import { SidebarProps } from "../sidebar";

import { StyledAdaptiveSidebar, StyledSidebar } from "./adaptive-sidebar.style";

export interface AdaptiveSidebarProps
  extends MarginProps,
    PaddingProps,
    Omit<TagProps, "data-component">,
    Pick<SidebarProps, "restoreFocusOnClose"> {
  /** The breakpoint (in pixels) at which the sidebar will convert to a dialog-based sidebar */
  adaptiveBreakpoint?: number;
  /** The time in milliseconds for the sidebar to animate */
  animationTimeout?: number;
  /** The background color of the sidebar */
  backgroundColor?: "white" | "black" | "app";
  /** The color to use for the left-hand border of the sidebar. Should be a design token e.g. `--colorsUtilityYang100` */
  borderColor?: string | "none";
  /** The content of the sidebar */
  children?: React.ReactNode;
  /** The height of the sidebar, relative to the wrapping component */
  height?: string;
  /** Whether the sidebar is hidden from view. In this state, the adaptive sidebar will continue to receive updates, etc. but will not be visible to users */
  hidden?: boolean;
  /** Whether the sidebar is open or closed */
  open: boolean;
  /** Whether to render the sidebar as a modal component instead of as an inline sidebar */
  renderAsModal?: boolean;
  /** The width of the sidebar */
  width?: string;
}

export const AdaptiveSidebar = ({
  adaptiveBreakpoint = 768,
  backgroundColor = "white",
  borderColor = "none",
  children,
  height = "100%",
  hidden = false,
  open,
  renderAsModal = false,
  width = "320px",
  restoreFocusOnClose = false,
  ...props
}: AdaptiveSidebarProps) => {
  const largeScreen = useIsAboveBreakpoint(adaptiveBreakpoint);
  const adaptiveSidebarRef = useRef<HTMLDivElement>(null);

  const colours = Object.entries(getColors(backgroundColor)).reduce(
    (acc, [key, value]) => {
      acc[kebabToCamelCase(key as string)] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  useEffect(() => {
    /* istanbul ignore next */
    if (adaptiveSidebarRef.current) {
      adaptiveSidebarRef.current.focus();
    }
  }, [open]);

  // Remove inert attribute from elements when sidebar is hidden
  /* istanbul ignore next */
  useEffect(() => {
    if (!hidden || !open) return;

    const inertElements = document.querySelectorAll("[inert]");

    inertElements.forEach((element) => {
      element.removeAttribute("inert");
    });
  }, [hidden, open]);

  if (renderAsModal || !largeScreen) {
    return (
      <StyledSidebar
        backgroundColor={backgroundColor}
        className="adaptive-sidebar-modal-view"
        data-role={"adaptive-sidebar-modal-view"}
        enableBackgroundUI={open && hidden}
        hidden={hidden}
        restoreFocusOnClose={restoreFocusOnClose}
        open={open}
        p={0}
        ref={adaptiveSidebarRef}
      >
        <Box
          data-role="adaptive-sidebar-content-wrapper"
          height="100%"
          {...colours}
        >
          {children}
        </Box>
      </StyledSidebar>
    );
  }

  return open ? (
    <StyledAdaptiveSidebar
      backgroundColor={backgroundColor}
      borderColor={borderColor === "none" ? undefined : borderColor}
      data-element="adaptive-sidebar"
      data-role="adaptive-sidebar"
      height={height}
      hidden={hidden}
      ref={adaptiveSidebarRef}
      role="region"
      tabIndex={-1}
      width={width}
      {...filterStyledSystemMarginProps(props)}
      {...filterStyledSystemPaddingProps(props)}
    >
      <Box data-role="adaptive-sidebar-content-wrapper">{children}</Box>
    </StyledAdaptiveSidebar>
  ) : null;
};

export default AdaptiveSidebar;
