/* eslint-disable react/no-unused-prop-types */
import React from "react";
import PropTypes from "prop-types";

import { StyledNavigationItem } from "./anchor-navigation.style";

const AnchorNavigationItem = React.forwardRef(
  ({ children, onKeyDown, onClick, href, tabIndex, isSelected }, ref) => (
    <StyledNavigationItem isSelected={isSelected}>
      <a
        onKeyDown={onKeyDown}
        onClick={onClick}
        tabIndex={tabIndex}
        ref={ref}
        href={href}
        data-element="anchor-navigation-item"
      >
        {children}
      </a>
    </StyledNavigationItem>
  )
);

AnchorNavigationItem.propTypes = {
  children: PropTypes.node,
  /** OnKeyDown handler */
  onKeyDown: PropTypes.func,
  /** onClick handler */
  onClick: PropTypes.func,
  /** href to be passed to the anchor element, can be linked with id passed to the scrollable section */
  href: PropTypes.string,
  /** tabIndex passed to the anchor element */
  tabIndex: PropTypes.number,
  /** Indicates if component is selected */
  isSelected: PropTypes.bool,
  /** Reference to the section html element meant to be shown   */
  target: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

AnchorNavigationItem.displayName = "AnchorNavigationItem";
export default AnchorNavigationItem;
