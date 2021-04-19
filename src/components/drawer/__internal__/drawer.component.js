import React, { useState, useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import invariant from "invariant";
import createGuid from "../../../utils/helpers/guid/guid";
import Icon from "../../icon";

import {
  StyledDrawerWrapper,
  StyledDrawerContent,
  StyledButton,
  StyledDrawerChildren,
  StyledDrawerSidebar,
  StyledSidebarTitle,
} from "./drawer.style";

const SidebarContext = React.createContext();

const Drawer = ({
  defaultExpanded,
  expanded,
  onChange,
  children,
  expandedWidth,
  sidebar,
  animationDuration,
  backgroundColor,
  title,
  showControls,
  height,
  ...props
}) => {
  const drawerSidebarContentRef = useRef();
  const isControlled = useRef(expanded !== undefined);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || false);
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

  const getTitle = () => {
    if (title === undefined) return null;

    return <StyledSidebarTitle>{title}</StyledSidebarTitle>;
  };

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
      >
        <Icon type="chevron_right" />
      </StyledButton>
    );
  };

  return (
    <StyledDrawerWrapper data-component="drawer" height={height} {...props}>
      <StyledDrawerContent
        expandedWidth={expandedWidth}
        animationDuration={animationDuration}
        className={getClassNames()}
        aria-expanded={isExpanded ? "true" : "false"}
        ref={drawerSidebarContentRef}
        backgroundColor={backgroundColor}
      >
        {getTitle()}
        {getControls()}
        <StyledDrawerSidebar
          hasControls={!!showControls}
          id={sidebarId}
          isExpanded={isExpanded}
          role="navigation"
        >
          <SidebarContext.Provider value={{ isInSidebar: true }}>
            {sidebar}
          </SidebarContext.Provider>
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
  /** Sets title heading of sidebar's content */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Enables expand/collapse button that controls drawer */
  showControls: PropTypes.bool,
};

Drawer.defaultProps = {
  expandedWidth: "40%",
  animationDuration: "400ms",
  defaultExpanded: true,
  height: "100%",
};

export { SidebarContext };

export default Drawer;
