import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import throttle from "lodash/throttle";

import Event from "../../utils/helpers/events";
import {
  StyledAnchorNavigation,
  StyledNavigation,
  StyledContent,
} from "./anchor-navigation.style";
import AnchorNavigationItem from "./anchor-navigation-item.component";

const SECTION_VISIBILITY_OFFSET = 200;
const SCROLL_THROTTLE = 100;

const AnchorNavigation = ({ children, stickyNavigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sectionRefs = useRef(
    React.Children.map(
      stickyNavigation.props.children,
      (child) => child.props.target
    )
  );

  const anchorRefs = useRef(
    Array.from(
      {
        length: React.Children.count(stickyNavigation.props.children),
      },
      () => React.createRef()
    )
  );

  const contentRef = useRef();

  const navigationRef = useRef();

  const isUserScroll = useRef(true);

  const isUserScrollTimer = useRef();

  const setSelectedAnchorBasedOnScroll = useCallback(() => {
    const sectionsTopOffsets = sectionRefs.current.map(
      ({ current }) => current.getBoundingClientRect().top
    );
    const { top: navTopOffset } = navigationRef.current.getBoundingClientRect();

    const indexOfSmallestNegativeTopOffset = sectionsTopOffsets.reduce(
      (currentTopIndex, sectionTopOffset, index) => {
        if (sectionTopOffset - SECTION_VISIBILITY_OFFSET > navTopOffset)
          return currentTopIndex;
        return sectionTopOffset > sectionsTopOffsets[currentTopIndex]
          ? index
          : currentTopIndex;
      },
      0
    );

    setSelectedIndex(indexOfSmallestNegativeTopOffset);
  }, []);

  const scrollHandler = useCallback(
    throttle(() => {
      if (isUserScroll.current) {
        setSelectedAnchorBasedOnScroll();
      } else {
        window.clearTimeout(isUserScrollTimer.current);
        isUserScrollTimer.current = setTimeout(() => {
          isUserScroll.current = true;
        }, SCROLL_THROTTLE + 50);
      }
    }, SCROLL_THROTTLE),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => window.removeEventListener("scroll", scrollHandler, true);
  }, [scrollHandler]);

  const focusFirstFocusableChild = (section) => {
    // eslint-disable-next-line max-len
    const defaultFocusableSelectors =
      'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement = section.querySelector(
      defaultFocusableSelectors
    );
    if (firstFocusableElement) {
      firstFocusableElement.focus({ preventScroll: true });
    }
  };

  const scrollToSection = (section) => {
    isUserScroll.current = false;
    section.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth",
    });
  };

  const handleClick = (event, index) => {
    event.preventDefault();
    const sectionToScroll = sectionRefs.current[index].current;

    focusFirstFocusableChild(sectionToScroll);

    // workaround due to preventScroll focus method option on firefox not working consistently
    window.setTimeout(() => {
      scrollToSection(sectionToScroll);
      setSelectedIndex(index);
    }, 10);
  };

  const focusNavItem = (event, index) => {
    event.preventDefault();
    let newIndex = index;
    if (index === -1) {
      newIndex = anchorRefs.current.length - 1;
    } else if (index === anchorRefs.current.length) {
      newIndex = 0;
    }
    anchorRefs.current[newIndex].current.focus();
  };

  const handleKeyDown = (event, index) => {
    if (Event.isUpKey(event)) {
      focusNavItem(event, index - 1);
    } else if (Event.isDownKey(event)) {
      focusNavItem(event, index + 1);
    } else if (Event.isEnterKey(event) || Event.isSpaceKey(event)) {
      handleClick(event, index);
    }
  };

  return (
    <StyledAnchorNavigation ref={contentRef} data-component="anchor-navigation">
      <StyledNavigation
        ref={navigationRef}
        data-element="anchor-sticky-navigation"
      >
        {React.Children.map(stickyNavigation.props.children, (child, index) =>
          React.cloneElement(child, {
            isSelected: index === selectedIndex,
            tabIndex: index === selectedIndex ? 0 : -1,
            onClick: (ev) => handleClick(ev, index),
            onKeyDown: (ev) => handleKeyDown(ev, index),
            ref: anchorRefs.current[index],
          })
        )}
      </StyledNavigation>
      <StyledContent>{children}</StyledContent>
    </StyledAnchorNavigation>
  );
};

AnchorNavigation.propTypes = {
  children: PropTypes.node,
  /** The AnchorNavigationItems components to be rendered in the sticky navigation */
  stickyNavigation: (props, propName, componentName) => {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop.props.children, (child) => {
      if (AnchorNavigationItem.displayName !== child.type.displayName) {
        error = new Error(
          `\`${componentName}\` only accepts children of type \`${AnchorNavigationItem.displayName}\`.`
        );
      }
    });

    return error;
  },
};

export default AnchorNavigation;
