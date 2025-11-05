import React, { useState, useCallback, useRef, useEffect } from "react";
import invariant from "invariant";

import createGuid from "../../__internal__/utils/helpers/guid";
import usePrevious from "../../hooks/__internal__/usePrevious";
import Icon from "../icon";
import {
  StyledDrawerWrapper,
  StyledDrawerContent,
  StyledSidebarToggleButton,
  StyledDrawerSidebar,
  StyledSidebarTitle,
  StyledSidebarFooter,
} from "./drawer.style";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import DrawerSidebarContext from "./__internal__/drawer-sidebar.context";
import Logger from "../../__internal__/utils/logger";

let deprecatedAnimationDurationWarn = false;
let deprecatedDefaultExpandedWarn = false;
let deprecatedShowControlsWarn = false;

export interface DrawerProps extends TagProps {
  /**
   * Duration of a animation
   * @deprecated This prop will soon be removed.
   */
  animationDuration?: string;
  /** Specify an aria-label for the Drawer component */
  "aria-label"?: string;
  /** Specify an aria-label for the Drawer sidebar */
  sidebarAriaLabel?: string;
  /** Sets color of sidebar's background */
  backgroundColor?: string;
  /** Main content to display */
  children: React.ReactNode;
  /**
   * Set the default state of expansion of the Drawer if component is meant to be used as uncontrolled
   * @deprecated This prop will soon be removed, please use the `expanded` prop instead.
   */
  defaultExpanded?: boolean;
  /** Sets the expansion state of the Drawer if component is meant to be used as controlled */
  expanded?: boolean;
  /** The width of the expanded sidebar */
  expandedWidth?: string;
  /** Sets the height of the component */
  height?: string;
  /** Callback fired when expansion state changes, onChange(event: object, isExpanded: boolean) */
  onChange?: (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    isExpanded: boolean,
  ) => void;
  /** Drawer sidebar content */
  sidebar?: React.ReactNode;
  /**
   * Enables expand/collapse button that controls drawer
   * @deprecated This prop will soon be removed, this component is now intended to be non-dismissible.
   */
  showControls?: boolean;
  /** Sets the heading of the drawer */
  title?: React.ReactNode;
  /** Content to display inside of a footer */
  footer?: React.ReactNode;
  /** Makes the header of the drawer sticky. Title prop must also be set. */
  stickyHeader?: boolean;
  /** Makes the footer of the drawer sticky. Footer prop must also be set. */
  stickyFooter?: boolean;
}

export const Drawer = ({
  "aria-label": ariaLabel,
  sidebarAriaLabel,
  defaultExpanded,
  expanded,
  onChange,
  children,
  expandedWidth = "30vw",
  sidebar,
  animationDuration = "400ms",
  backgroundColor,
  title,
  footer,
  showControls,
  height = "100%",
  stickyHeader,
  stickyFooter,
  ...rest
}: DrawerProps) => {
  if (animationDuration !== "400ms" && !deprecatedAnimationDurationWarn) {
    Logger.deprecate(
      "The `animationDuration` prop in `Drawer` is deprecated and will soon be removed.",
    );
    deprecatedAnimationDurationWarn = true;
  }

  if (showControls !== undefined && !deprecatedShowControlsWarn) {
    Logger.deprecate(
      "The `showControls` prop in `Drawer` is deprecated and will soon be removed.",
    );
    deprecatedShowControlsWarn = true;
  }

  if (defaultExpanded !== undefined && !deprecatedDefaultExpandedWarn) {
    Logger.deprecate(
      "The `defaultExpanded` prop in `Drawer` is deprecated and will soon be removed.",
    );
    deprecatedDefaultExpandedWarn = true;
  }

  const guid = useRef(createGuid());
  const sidebarId = `DrawerSidebar_${guid.current}`;
  const titleId = `DrawerTitle_${guid.current}`;
  const drawerSidebarContentRef = useRef<HTMLDivElement | null>(null);
  const scrollableContentRef = useRef<HTMLDivElement | null>(null);

  const isControlled = useRef(expanded !== undefined);
  const [isExpanded, setIsExpanded] = useState(
    isControlled.current ? expanded : (defaultExpanded ?? true),
  );
  const previousValue = usePrevious(expanded);

  useEffect(() => {
    const message =
      "Drawer should not switch from uncontrolled to controlled" +
      " (or vice versa). Decide between using a controlled or uncontrolled Drawer element" +
      " for the lifetime of the component";
    invariant(isControlled.current === (expanded !== undefined), message);

    if (isControlled.current && previousValue !== expanded) {
      setIsExpanded(expanded);
    }
  }, [expanded, previousValue, showControls]);

  // add tabindex to scrollable sidebar when content overflows, tested in playwright
  /* istanbul ignore next */
  useEffect(() => {
    const scrollableContent = scrollableContentRef.current;
    if (scrollableContent) {
      if (scrollableContent.scrollHeight > scrollableContent.clientHeight) {
        scrollableContent.setAttribute("tabindex", "0");
      } else {
        scrollableContent.removeAttribute("tabindex");
      }
    }
  }, [sidebar, isExpanded]);

  const toggleDrawer = useCallback(
    (ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
      setIsExpanded(!isExpanded);
      onChange?.(ev, !isExpanded);
      if (isExpanded && drawerSidebarContentRef.current) {
        drawerSidebarContentRef.current.scrollTop = 0;
      }
    },
    [isExpanded, onChange],
  );

  const getControls = () => {
    return (
      <StyledSidebarToggleButton
        aria-label="toggle sidebar"
        aria-expanded={isExpanded}
        aria-controls={sidebarId}
        data-element="drawer-toggle"
        onClick={toggleDrawer}
        isExpanded={isExpanded}
      >
        <Icon type="chevron_right" />
      </StyledSidebarToggleButton>
    );
  };

  return (
    <StyledDrawerWrapper
      aria-label={ariaLabel}
      height={height}
      {...tagComponent("drawer", rest)}
    >
      <StyledDrawerContent
        expandedWidth={expandedWidth}
        animationDuration={animationDuration}
        isExpanded={isExpanded}
        showControls={showControls}
        ref={drawerSidebarContentRef}
        backgroundColor={backgroundColor}
        data-element="drawer-content"
        data-role="drawer-content"
        aria-label={sidebarAriaLabel}
        aria-labelledby={title ? titleId : undefined}
      >
        {title && (
          <StyledSidebarTitle id={titleId} stickyHeader={stickyHeader}>
            {title}
          </StyledSidebarTitle>
        )}
        {showControls && getControls()}
        <StyledDrawerSidebar
          data-element="drawer-sidebar"
          id={sidebarId}
          ref={scrollableContentRef}
        >
          <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
            {sidebar}
          </DrawerSidebarContext.Provider>
        </StyledDrawerSidebar>
        {footer && (
          <StyledSidebarFooter stickyFooter={stickyFooter}>
            {footer}
          </StyledSidebarFooter>
        )}
      </StyledDrawerContent>
      {children}
    </StyledDrawerWrapper>
  );
};

export { DrawerSidebarContext };

export default Drawer;
