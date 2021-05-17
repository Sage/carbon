import React, { useState, useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import invariant from "invariant";

import createGuid from "../../utils/helpers/guid/guid";
import Icon from "../icon";
import {
  StyledSidebarHeader,
  StyledDrawerWrapper,
  StyledDrawerContent,
  StyledButton,
  StyledDrawerChildren,
  StyledDrawerSidebar,
  StyledSidebarTitle,
} from "./drawer.style";
import StickyFooter from "../../__internal__/sticky-footer";

const SidebarContext = React.createContext();

const Drawer = ({
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
  ...rest
}) => {
  const drawerSidebarContentRef = useRef();
  const scrollableContentRef = useRef();

  const isControlled = useRef(expanded !== undefined);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const timer = useRef();

  useEffect(() => {
    const message =
      "Drawer should not switch from uncontrolled to controlled" +
      " (or vice versa). Decide between using a controlled or uncontrolled Drawer element" +
      " for the lifetime of the component";
    invariant(isControlled.current === (expanded !== undefined), message);

    if (expanded !== undefined) {
      setIsExpanded(expanded);
    }
  }, [expanded]);

  useEffect(() => {
    return function cleanup() {
      clearTimeout(timer.current);
    };
  }, []);

  const getAnimationDuration = useCallback(() => {
    if (animationDuration.indexOf("ms") !== -1) {
      const animationTime = animationDuration.substring(
        0,
        animationDuration.length - 2
      );
      return animationTime;
    }

    if (
      animationDuration.indexOf(".") !== -1 ||
      animationDuration.indexOf("s") !== -1
    ) {
      const animationTime = animationDuration.substring(
        0,
        animationDuration.length - 1
      );
      return parseFloat(animationTime) * 1000;
    }

    return animationDuration;
  }, [animationDuration]);

  const toggleAnimation = useCallback(() => {
    const timeout = getAnimationDuration();
    clearTimeout(timer.current);
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

  const toggleDrawer = useCallback(
    (ev) => {
      setIsExpanded(!isExpanded);
      if (onChange) onChange(ev, !isExpanded);
      if (isExpanded) {
        drawerSidebarContentRef.current.scrollTop = 0;
      }

      toggleAnimation();
    },
    [toggleAnimation, isExpanded, onChange]
  );

  const guid = useRef(createGuid());
  const sidebarId = `DrawerSidebar_${guid.current}`;

  const getClassNames = useCallback(() => {
    return classNames(
      isExpanded ? "open" : "closed",
      isOpening ? "opening" : "",
      isClosing ? "closing" : ""
    );
  }, [isExpanded, isOpening, isClosing]);

  const getControls = () => {
    if (showControls === undefined) return null;

    return (
      <StyledButton
        aria-label="toggle sidebar"
        aria-expanded={isExpanded}
        aria-controls={sidebarId}
        data-element="drawer-toggle"
        onClick={toggleDrawer}
        isExpanded={isExpanded}
        animationDuration={animationDuration}
        stickyHeader={stickyHeader}
      >
        <Icon type="chevron_right" />
      </StyledButton>
    );
  };

  return (
    <StyledDrawerWrapper data-component="drawer" height={height} {...rest}>
      <StyledDrawerContent
        expandedWidth={expandedWidth}
        animationDuration={animationDuration}
        className={getClassNames()}
        aria-expanded={isExpanded ? "true" : "false"}
        ref={drawerSidebarContentRef}
        backgroundColor={backgroundColor}
      >
        {stickyHeader && (
          <StyledSidebarHeader isExpanded={isExpanded}>
            {title && <StyledSidebarTitle>{title}</StyledSidebarTitle>}
            {getControls()}
          </StyledSidebarHeader>
        )}
        {!stickyHeader && (
          <>
            {title && <StyledSidebarTitle>{title}</StyledSidebarTitle>}
            {getControls()}
          </>
        )}
        <StyledDrawerSidebar
          hasControls={!!showControls}
          id={sidebarId}
          isExpanded={isExpanded}
          role="navigation"
          overflowY="auto"
          scrollVariant="light"
          ref={scrollableContentRef}
        >
          <SidebarContext.Provider value={{ isInSidebar: true }}>
            {sidebar}
          </SidebarContext.Provider>
          {footer && (
            <StickyFooter
              containerRef={scrollableContentRef}
              disableSticky={!stickyFooter}
              isExpanded={isExpanded}
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

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  /** Set the default state of expansion of the Drawer if component is meant to be used as uncontrolled */
  defaultExpanded: PropTypes.bool,
  /** Sets the expansion state of the Drawer if component is meant to be used as controlled */
  expanded: PropTypes.bool,
  /** Callback fired when expansion state changes, onChange(event: object, isExpanded: boolean) */
  onChange: PropTypes.func,
  /* Sidebar object either html or react component */
  sidebar: PropTypes.node,
  /* The (% or px) width of the expanded sidebar  */
  expandedWidth: PropTypes.string,
  /** Duration of a animation */
  animationDuration: PropTypes.string,
  /** Sets color of sidebar's background */
  backgroundColor: PropTypes.string,
  /** Sets custom height to Drawer component */
  height: PropTypes.string,
  /** Sets the heading of the drawer */
  title: PropTypes.node,
  /** Enables expand/collapse button that controls drawer */
  showControls: PropTypes.bool,
  /** Content to display inside of a footer */
  footer: PropTypes.node,
  /** Makes the header of the drawer sticky. Title prop must also be set. */
  stickyHeader: PropTypes.bool,
  /** Makes the footer of the drawer sticky. Footer prop must also be set. */
  stickyFooter: PropTypes.bool,
};

export { SidebarContext };

export default Drawer;
