import React, { useState, useCallback, useRef, useEffect } from "react";
import invariant from "invariant";

import createGuid from "../../__internal__/utils/helpers/guid";
import usePrevious from "../../hooks/__internal__/usePrevious";
import Icon from "../icon";
import {
  StyledSidebarHeader,
  StyledDrawerWrapper,
  StyledDrawerContent,
  StyledSidebarToggleButton,
  StyledDrawerChildren,
  StyledDrawerSidebar,
  StyledSidebarTitle,
} from "./drawer.style";
import StickyFooter from "../../__internal__/sticky-footer";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import DrawerSidebarContext from "./__internal__/drawer-sidebar.context";

export interface DrawerProps extends Omit<TagProps, "data-component"> {
  /** Duration of a animation */
  animationDuration?: string;
  /** Specify an aria-label for the Drawer component */
  "aria-label"?: string;
  /** Specify an aria-label for the Drawer sidebar */
  sidebarAriaLabel?: string;
  /** Sets color of sidebar's background */
  backgroundColor?: string;
  children: React.ReactNode;
  /** Set the default state of expansion of the Drawer if component is meant to be used as uncontrolled */
  defaultExpanded?: boolean;
  /** Sets the expansion state of the Drawer if component is meant to be used as controlled */
  expanded?: boolean;
  /* The (% or px) width of the expanded sidebar  */
  expandedWidth?: string;
  /** Sets custom height to Drawer component */
  height?: string;
  /** Callback fired when expansion state changes, onChange(event: object, isExpanded: boolean) */
  onChange?: (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    isExpanded: boolean,
  ) => void;
  /* Sidebar object either html or react component */
  sidebar?: React.ReactNode;
  /** Enables expand/collapse button that controls drawer */
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
  "data-element": dataElement,
  "data-role": dataRole = "drawer",
  defaultExpanded = true,
  expanded,
  onChange,
  children,
  expandedWidth = "40%",
  sidebar,
  animationDuration = "400ms",
  backgroundColor,
  title,
  footer,
  showControls,
  height = "100%",
  stickyHeader,
  stickyFooter,
}: DrawerProps) => {
  const drawerSidebarContentRef = useRef<HTMLDivElement | null>(null);
  const scrollableContentRef = useRef<HTMLDivElement | null>(null);

  const isControlled = useRef(expanded !== undefined);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(
    isControlled.current ? expanded : defaultExpanded,
  );
  const timer = useRef<null | ReturnType<typeof setTimeout>>(null);

  const getAnimationDuration = useCallback(() => {
    if (animationDuration.indexOf("ms") !== -1) {
      const animationTime = animationDuration.substring(
        0,
        animationDuration.length - 2,
      );
      return parseInt(animationTime);
    }

    if (
      animationDuration.indexOf(".") !== -1 ||
      animationDuration.indexOf("s") !== -1
    ) {
      const animationTime = animationDuration.substring(
        0,
        animationDuration.length - 1,
      );
      return parseFloat(animationTime) * 1000;
    }

    return parseInt(animationDuration);
  }, [animationDuration]);

  const toggleAnimation = useCallback(() => {
    const timeout = getAnimationDuration();

    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (!isExpanded) {
      setIsClosing(false);
      setIsOpening(true);
      timer.current = setTimeout(() => {
        setIsOpening(false);
      }, timeout);
    } else {
      setIsOpening(false);
      setIsClosing(true);
      timer.current = setTimeout(() => {
        setIsClosing(false);
      }, timeout);
    }
  }, [getAnimationDuration, isExpanded]);

  const previousValue = usePrevious(expanded);

  useEffect(() => {
    const message =
      "Drawer should not switch from uncontrolled to controlled" +
      " (or vice versa). Decide between using a controlled or uncontrolled Drawer element" +
      " for the lifetime of the component";
    invariant(isControlled.current === (expanded !== undefined), message);

    if (isControlled.current && previousValue !== expanded) {
      setIsExpanded(expanded);

      if (!showControls && ![expanded, previousValue].includes(undefined)) {
        toggleAnimation();
      }
    }
  }, [expanded, toggleAnimation, previousValue, showControls]);

  useEffect(() => {
    return function cleanup() {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const toggleDrawer = useCallback(
    (ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
      setIsExpanded(!isExpanded);
      onChange?.(ev, !isExpanded);
      if (isExpanded && drawerSidebarContentRef.current) {
        drawerSidebarContentRef.current.scrollTop = 0;
      }

      toggleAnimation();
    },
    [toggleAnimation, isExpanded, onChange],
  );

  const guid = useRef(createGuid());
  const sidebarId = `DrawerSidebar_${guid.current}`;
  const titleId = `DrawerTitle_${guid.current}`;

  const getClassNames = useCallback(() => {
    const classes = [isExpanded ? "open" : "closed"];

    if (isOpening) {
      classes.push("opening");
    }

    if (isClosing) {
      classes.push("closing");
    }

    return classes.join(" ");
  }, [isExpanded, isOpening, isClosing]);

  const getControls = () => {
    if (showControls === undefined) return null;

    return (
      <StyledSidebarToggleButton
        aria-label="toggle sidebar"
        aria-expanded={isExpanded}
        aria-controls={sidebarId}
        data-element="drawer-toggle"
        onClick={toggleDrawer}
        isExpanded={isExpanded}
        animationDuration={animationDuration}
      >
        <Icon type="chevron_right" />
      </StyledSidebarToggleButton>
    );
  };

  return (
    <StyledDrawerWrapper
      aria-label={ariaLabel}
      data-component="drawer"
      data-element={dataElement}
      data-role={dataRole}
      height={height}
    >
      <StyledDrawerContent
        expandedWidth={expandedWidth}
        animationDuration={animationDuration}
        className={getClassNames()}
        ref={drawerSidebarContentRef}
        backgroundColor={backgroundColor}
        data-element="drawer-content"
        data-role="drawer-content"
        aria-label={sidebarAriaLabel}
        aria-labelledby={title ? titleId : undefined}
      >
        {stickyHeader && (
          <StyledSidebarHeader
            data-role="drawer-sidebar-header"
            isExpanded={isExpanded}
          >
            {title && (
              <StyledSidebarTitle id={titleId}>{title}</StyledSidebarTitle>
            )}
            {getControls()}
          </StyledSidebarHeader>
        )}
        {!stickyHeader && (
          <>
            {title && (
              <StyledSidebarTitle id={titleId}>{title}</StyledSidebarTitle>
            )}
            {getControls()}
          </>
        )}
        <StyledDrawerSidebar
          hasControls={!!showControls}
          id={sidebarId}
          isExpanded={isExpanded}
          overflowY={isExpanded ? "auto" : undefined}
          scrollVariant="light"
          ref={scrollableContentRef}
        >
          <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
            {sidebar}
          </DrawerSidebarContext.Provider>
          {footer && (
            <StickyFooter
              containerRef={scrollableContentRef}
              disableSticky={!stickyFooter}
            >
              {footer}
            </StickyFooter>
          )}
        </StyledDrawerSidebar>
      </StyledDrawerContent>
      <StyledDrawerChildren>{children}</StyledDrawerChildren>
    </StyledDrawerWrapper>
  );
};

export { DrawerSidebarContext };

export default Drawer;
