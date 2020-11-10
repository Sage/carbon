import React from "react";
import PropTypes from "prop-types";

import {
  StyledDuellingPicklistOverlay,
  StyledDuellingPicklist,
  StyledLabelContainer,
  StyledLabel,
  StyledControlsContainer,
  StyledControl,
} from "./duelling-picklist.style";

const DuellingPicklist = ({
  children,
  disabled,
  leftControls,
  rightControls,
  leftLabel,
  rightLabel,
}) => {
  const shouldDisplayLabels = leftLabel || rightLabel;
  const shouldDisplayControls = leftControls || rightControls;

  return (
    <StyledDuellingPicklistOverlay
      disabled={disabled}
      data-component="duelling-picklist"
    >
      {shouldDisplayLabels && (
        <StyledLabelContainer>
          <StyledLabel data-element="picklist-left-label">
            {leftLabel}
          </StyledLabel>
          <StyledLabel data-element="picklist-right-label">
            {rightLabel}
          </StyledLabel>
        </StyledLabelContainer>
      )}
      {shouldDisplayControls && (
        <StyledControlsContainer>
          <StyledControl data-element="picklist-left-control">
            {leftControls}
          </StyledControl>
          <StyledControl data-element="picklist-right-label">
            {rightControls}
          </StyledControl>
        </StyledControlsContainer>
      )}
      <StyledDuellingPicklist>{children}</StyledDuellingPicklist>
    </StyledDuellingPicklistOverlay>
  );
};

DuellingPicklist.propTypes = {
  children: PropTypes.node,
  /** Indicate if component is disabled */
  disabled: PropTypes.bool,
  /** Place for components like Search or Filter placed above the left list */
  leftControls: PropTypes.node,
  /** Place for components like Search or Filter placed above the right list */
  rightControls: PropTypes.node,
  /** Left list label */
  leftLabel: PropTypes.string,
  /** Right list label */
  rightLabel: PropTypes.string,
};

export default DuellingPicklist;
